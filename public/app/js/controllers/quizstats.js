angular.module('mockquiz.controllers').controller('quizstats', ['$scope', '$state', 'requestHandler', '$window', function($scope, $state, requestHandler, $window) {
    var vm = this;

    vm.quizObj = {};
    vm.allUsers = [];
    vm.quizid = $state.params.id;
    vm.isFirstAttempt = true;
    vm.istab1Selected = true;
    vm.istab2Selected = false;
    vm.istab3Selected = false;
    vm.istab4Selected = false;
    vm.getQuizInfo = function() {
        var userid = (isNaN(parseInt($window.sessionStorage.userid))) ? null : parseInt($window.sessionStorage.userid);
        console.log("-------", userid);
        requestHandler.get('quiz/stats/', { id: $state.params.id, userid: userid }).query(function(response) {
            console.log("hh", response)
            if (response.status === 200) {
                vm.quizObj = response.data.quiz;
                vm.allUsers = response.data.users;
                vm.usersList = [];
                vm.userScoreList = [];
                var maxScore = 0;
                var attemptedon;
                for (var i = vm.allUsers.length - 1; i >= 0; i--) {
                    if (vm.allUsers[i].qualifiedquizForUser.length > 0) {
                        if (vm.allUsers[i].id === parseInt($window.sessionStorage.userid)) {
                            vm.userScoreList = vm.allUsers[i].qualifiedquizForUser[0].attemptForQualifyQuizs;
                        }
                        maxScore = 0;

                        for (var j = vm.allUsers[i].qualifiedquizForUser[0].attemptForQualifyQuizs.length - 1; j >= 0; j--) {
                            if (maxScore < vm.allUsers[i].qualifiedquizForUser[0].attemptForQualifyQuizs[j].totalscore) {
                                maxScore = vm.allUsers[i].qualifiedquizForUser[0].attemptForQualifyQuizs[j].totalscore;
                                attemptedon = vm.allUsers[i].qualifiedquizForUser[0].attemptForQualifyQuizs[j].attemptedon;
                            }
                        }
                        vm.usersList.push(angular.extend({}, { firstname: vm.allUsers[i].firstname, lastname: vm.allUsers[i].lastname }, { totalscore: maxScore, attemptedon: attemptedon }));
                    }
                    (vm.userScoreList.length == 0) ? vm.isFirstAttempt = true: vm.isFirstAttempt = false;
                }
            }
        });
    }

    vm.getQuizInfo();

    vm.toggleTab = function(id) {

        vm.istab1Selected = false;
        vm.istab2Selected = false;
        vm.istab3Selected = false;
        vm.istab4Selected = false;
        (id === 'tab1') ? vm.istab1Selected = true: '';
        (id === 'tab2') ? vm.istab2Selected = true: '';
        (id === 'tab3') ? vm.istab3Selected = true: '';
        (id === 'tab4') ? vm.istab4Selected = true: '';
    }

}])