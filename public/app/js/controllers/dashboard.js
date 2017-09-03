angular.module('mockquiz.controllers').controller('dashboard', ['$scope', 'requestHandler', '$rootScope', '$window', function($scope, requestHandler, $rootScope, $window) {
    var vm = this;

    vm.loadInitFunction = function() {

        requestHandler.get("dashboard/stats/", { userid: parseInt($window.sessionStorage.userid) }).query(function(res) {
            console.log("--->>>>>>>>", res);
            if (res.status === 200) {
                vm.lasttenAttemotedTest = res.data.user.qualifiedquizForUser;
                vm.lastAttemptedScore = res.data.user.qualifiedquizForUser[0].attemptForQualifyQuizs[0].totalscore;
                vm.lastThreeScore = [];
                for (var i = 0; i < res.data.bestscore.qualifiedquizForUser.length; i++) {
                    vm.lastThreeScore.push(res.data.bestscore.qualifiedquizForUser[i].attemptForQualifyQuizs[0].totalscore);
                }
            }
        });

    }
    vm.loadInitFunction();
}])