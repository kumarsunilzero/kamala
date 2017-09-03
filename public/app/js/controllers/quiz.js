angular.module('mockquiz.controllers').controller('quiz', ['$scope', '$state', 'requestHandler', '$window', '$timeout', 'quizscore', function($scope, $state, requestHandler, $window, $timeout, quizscore) {

    var vm = this;
    console.log($scope, vm)
    vm.quizObj = {};
    vm.current_index = 0;
    vm.quizobj = {};
    vm.mytotalscore = 0;
    vm.totalanswerdquestion = 0;
    vm.totalunanswerdquestion = 0;
    vm.totalscore = 0;
    vm.isQuizStartMode = true;
    vm.selectedIndexs = [];
    vm.isExplanationEnabled = false;
    // vm.time = {
    //   timeLeft: 0
    //};
    vm.getQuiz = function() {

        //$state.params.type = 'solution';
        //console.log("hhhh", $state);
        if ($state.params.type === 'solution') {
            vm.isQuizStartMode = false;
            requestHandler.get('quiz/result/', { id: $state.params.id, userid: parseInt($window.sessionStorage.userid) }).query(function(response) {
                console.log("hh", response)
                if (response.status === 200) {
                    //vm.current_index = $state.params.qid;
                    vm.quizAnsMap = {};
                    if (response.data.result.attemptForQualifyQuizs.length > 0) {
                        for (var i in response.data.result.attemptForQualifyQuizs[0].answersForAttemptedQuizs) {
                            vm.quizAnsMap[response.data.result.attemptForQualifyQuizs[0].answersForAttemptedQuizs[i].questionid] = response.data.result.attemptForQualifyQuizs[0].answersForAttemptedQuizs[i].option;
                        }
                    }
                    vm.quizObj = response.data.quiz;
                    vm.totalscore = vm.quizObj.questionsForQuiz.length;
                    angular.forEach(vm.quizObj.questionsForQuiz, function(value, index) {
                        var isAnswered = false;
                        //value.isExplanationEnabled = false;
                        angular.forEach(value.answersForQuestions, function(val, index) {
                            if (vm.quizAnsMap[value.id] !== undefined && vm.quizAnsMap[value.id] == val.id) {
                                val["isSelected"] = true;
                            } else {
                                val["isSelected"] = false;
                            }

                        })
                    })


                }
            });
        } else {
            requestHandler.get('quiz/', { id: $state.params.id, userid: $window.sessionStorage.userid }).query(function(response) {
                console.log("hh", response)
                if (response.status === 200) {
                    vm.QualifiedQuizId = response.data.qualifiedquiz.id;
                    vm.quizObj = response.data.quiz[0];
                    vm.timeLeft = parseInt(vm.quizObj.totaltime) * 60;
                }
                $scope.$broadcast('timer-start')
            });
        }
    }
    vm.getQuiz();
    vm.prevQuestion = function() {
        //console.log(vm.current_index)
        if (vm.current_index > 0) {
            vm.current_index--;
        }
    };

    vm.nextQuestion = function() {
        if (vm.current_index < vm.quizObj.questionsForQuiz.length - 1) {
            vm.current_index++;
        }
    };

    vm.currentQuestion = function(index) {
        vm.current_index = index;
    }

    vm.checkButton = function(opt, index, qindex) {
        //console.log(index, opt, qindex);
        vm.selectedIndexs.push(qindex);
        vm.quizObj.questionsForQuiz[vm.current_index].answersForQuestions.forEach(function(obj, ind) {
            obj.isSelected = false;
            if (index === ind) {
                obj.isSelected = true;
            }
        });
        //vm.questionArray[vm.current_index].options[index].isSelected = true;
    }

    vm.reviewQuestion = function() {
        vm.quizObj.questionsForQuiz[vm.current_index]["isReview"] = true;
    }

    vm.checkQuizStat = function() {
        vm.sendObj = {};

        vm.mytotalreviewed = 0;
        vm.totalanswerdquestion = 0;
        vm.totalunanswerdquestion = 0;
        vm.totalscore = 0;
        //vm.sendObj['quizForQualifyingId'] = vm.quizObj.id;
        vm.sendObj['qualifyQuizId'] = vm.QualifiedQuizId;
        vm.sendObj['answersForAttemptedQuizs'] = [];
        vm.sendObj['isretake'] = false;
        vm.sendObj['totalscore'] = quizscore.calculateQuizTotalScore(vm.quizObj.questionsForQuiz);
        vm.totalscore = vm.quizObj.questionsForQuiz.length;
        angular.forEach(vm.quizObj.questionsForQuiz, function(value, index) {
            var isAnswered = false;
            if (value.isReview) {
                vm.mytotalreviewed++;
            }
            angular.forEach(value.answersForQuestions, function(val, index) {
                if (val.isSelected) {
                    isAnswered = true;
                    vm.sendObj['answersForAttemptedQuizs'].push({ quizid: vm.quizObj.id, questionid: value.id, option: val.id });
                } else {}
            })
            if (!isAnswered) {
                vm.mytotalscore++;
                vm.totalunanswerdquestion++;
            } else {
                vm.totalanswerdquestion++;
            }
        })

        $("#quizStatModal").modal('show');
    }

    vm.submitQuiz = function() {
        //console.log("????", vm.sendObj);
        vm.sendObj['iscomplete'] = true;
        vm.sendObj['attemptedon'] = new Date();
        requestHandler.post('submitquiz/').save(vm.sendObj).$promise.then(function(res) {
            console.log(res);
            if (res.status === 200) {
                console.log('herr');
                $("#quizStatModal").modal('hide');
                $timeout(function() {
                    $state.go('quizresult', { id: $state.params.id });
                }, 1000);
            }
        })
    }

    vm.popCreditModal = function() {
        $("#creditModal").modal('show');
    }

    vm.getExplanation = function() {

        $("#creditModal").modal('hide');
        (vm.isExplanationEnabled) ? vm.isExplanationEnabled = false: vm.isExplanationEnabled = true;
    }

}])