angular.module('mockquiz.controllers', []).controller('quizlist', ['$scope', 'requestHandler', function($scope, requestHandler) {

    var vm = this;

    vm.getQuiz = function() {
        console.log("ff")
        requestHandler.get('quizs/').query(function(response) {
            console.log("hh", response)
            if (response.status === 200) {
                vm.quizlistArray = response.data;
            }
        });
    }
    vm.getQuiz();
}])