angular.module('mockquiz.controllers').controller('quizresult', ['$scope', '$state', 'requestHandler', '$window', function($scope, $state, requestHandler, $window) {
    var vm = this;
    vm.mytotalscore = 0.00;
    vm.totalanswerdquestion = 0;
    vm.totalunanswerdquestion = 0;
    vm.totalscore = 0;
    vm.intialLoadFunction = function() {
        //console.log("$state", $state);
        requestHandler.get('quiz/result/', { id: $state.params.id, userid: $window.sessionStorage.userid }).query(function(response) {
            console.log("hh", response)
            if (response.status === 200) {
                vm.quizAnsMap = {};
                if (response.data.result[0].attemptForQualifyQuizs.length > 0) {
                    var resultData = response.data.result[0].attemptForQualifyQuizs[response.data.result[0].attemptForQualifyQuizs.length - 1];
                    for (var i in resultData.answersForAttemptedQuizs) {
                        vm.quizAnsMap[resultData.answersForAttemptedQuizs[i].questionid] = resultData.answersForAttemptedQuizs[i].option;
                    }
                }
                vm.quizObj = response.data.quiz;
                vm.totalscore = vm.quizObj.totalscore;
                console.log("----------", vm.quizAnsMap);
                angular.forEach(vm.quizObj.questionsForQuiz, function(value, index) {
                    var isAnswered = false;
                    angular.forEach(value.answersForQuestions, function(val, index) {
                        if (vm.quizAnsMap[value.id] !== undefined && vm.quizAnsMap[value.id] == val.id) {
                            isAnswered = true;
                        }

                        if (vm.quizAnsMap[value.id] !== undefined && vm.quizAnsMap[value.id] == val.id && val.iscorrectanswer) {
                            vm.mytotalscore = vm.mytotalscore + 1.00;
                            value["isIncorrect"] = false;
                        } else if (vm.quizAnsMap[value.id] !== undefined && vm.quizAnsMap[value.id] == val.id && !val.iscorrectanswer) {
                            vm.mytotalscore = vm.mytotalscore - 0.25;
                            value["isIncorrect"] = true;
                        }

                    })
                    if (!isAnswered) {
                        value["isAnswered"] = false;
                        vm.totalunanswerdquestion++;
                    } else {
                        vm.totalanswerdquestion++;
                        value["isAnswered"] = true;
                    }
                })

            }
        });
    }
    vm.intialLoadFunction();

    vm.checkAnswer = function(id) {
        $state.go("quiz", { id: $state.params.id, type: "solution", qid: id });
    }

}]);