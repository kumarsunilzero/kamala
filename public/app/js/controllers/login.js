angular.module('mockquiz.controllers').controller('login', ['$scope', '$state', 'requestHandler', '$window', function($scope, $state, requestHandler, $window) {
    var vm = this;
    vm.user = {};
    vm.errorMessage = '';
    vm.signupdata = {};
    vm.login = function(type) {
        console.log("----", vm.user);
        var url = "";
        if (type === 'local') {
            url = 'login/';
        } else if (type === 'facebook') {
            url = 'facebooklogin/';
        }
        requestHandler.post(url).save(vm.user).$promise.then(function(response) {
            //console.log(response);
            if (response.status === 200) {
                $window.sessionStorage.userid = response.data.id;
                $state.go('dashboard');
            } else if (response.status === 404) {
                vm.errorMessage = response.message;
            }
        });
    }

    vm.signup = function() {
        //console.log("--", vm.signupdata);
        if (Object.keys(vm.signupdata).length === 6) {
            if (validatePassword(vm.signupdata.password, vm.signupdata.confpassword)) {
                var sendObj = {
                    firstname: vm.signupdata.firstname,
                    lastname: vm.signupdata.lastname,
                    email: vm.signupdata.email,
                    password: vm.signupdata.password,
                    isagreeterms: vm.signupdata.isagreeterms
                }
                requestHandler.post('user/signup/').save(sendObj).$promise.then(function(res) {
                    //console.log(res);
                    if (res.status === 200) {
                        //console.log('herr');
                        vm.errorMessage = "Your Registration is Successful.";
                        $state.go('signin');
                        //vm.errorMessage = "Password does not match.Please enter Same password.";
                    } else if (res.status === 201) {
                        vm.errorMessage = res.message;
                    }
                })
            } else {
                vm.errorMessage = "Password does not match.Please enter Same password.";
            }
        } else {
            vm.errorMessage = "Please fill all fields Correctly.";
        }

    }

    function validatePassword(text1, text2) {
        if (text1 !== text2) {
            return false;
        } else {
            return true;
        }
    }
}])