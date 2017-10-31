angular.module('mockquiz.controllers').controller('login', ['$scope', '$state', 'requestHandler', '$window', '$timeout', '$rootScope', function($scope, $state, requestHandler, $window, $timeout, $rootScope) {
    var vm = this;
    vm.user = {};
    vm.errorMessage = '';
    vm.signupdata = {};
    vm.login = function(type) {
        //console.log("----", vm.user);
        var url = "";
        if (type === 'local') {
            url = 'login/';
        } else if (type === 'facebook') {
            url = 'facebooklogin/';
        }
        requestHandler.post(url).save(vm.user).$promise.then(function(response) {
            console.log(response);
            if (response.status === 200) {
                $window.sessionStorage.userid = response.data.id;
                console.log("i am here", $window.sessionStorage.isauthenticateduser);
                $window.sessionStorage.role = response.data.roleForUser.title;
                $rootScope.role = response.data.roleForUser.title;
                if ($window.sessionStorage.isauthenticateduser === 'false') {

                    $window.sessionStorage.isauthenticateduser = true;
                    var sendData = JSON.parse($window.sessionStorage.qobj);
                    sendData["userid"] = response.data.id;
                    sendData['quizid'] = $window.sessionStorage.quizid;
                    requestHandler.post('submitquiz/').save(sendData).$promise.then(function(res) {
                        console.log(res);
                        if (res.status === 200) {
                            console.log('herr');
                            $timeout(function() {
                                $state.go('quizresult', { id: $window.sessionStorage.quizid });
                            }, 1000);
                        }
                    })
                    // $state.go('quizresult', { id: $window.sessionStorage.quizid });
                } else {

                    $window.sessionStorage.isauthenticateduser = true;
                    $state.go('dashboard');
                }

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