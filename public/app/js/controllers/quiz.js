angular.module('mockquiz.controllers').controller('quiz', ['$scope', '$state', 'requestHandler', '$window', '$timeout', 'quizscore', 'toaster', function($scope, $state, requestHandler, $window, $timeout, quizscore, toaster) {

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
    $scope.$on('timer-stopped', function(event, data) {
        //console.log('Timer Stopped - data = ', data);
        vm.checkQuizStat(true);
    });
    vm.getQuiz = function() {

        //$state.params.type = 'solution';
        var userid = (isNaN(parseInt($window.sessionStorage.userid))) ? null : parseInt($window.sessionStorage.userid);
        console.log("hhhh", $state);
        if ($state.params.type === 'solution') {
            vm.isQuizStartMode = false;
            requestHandler.get('quiz/result/', { id: $state.params.id, userid: parseInt($window.sessionStorage.userid) }).query(function(response) {
                //console.log("hh", response)
                if (response.status === 200) {
                    //vm.current_index = $state.params.qid;
                    vm.quizAnsMap = {};
                    if (response.data.result[0].attemptForQualifyQuizs.length > 0) {
                        var resultData = response.data.result[0].attemptForQualifyQuizs[response.data.result[0].attemptForQualifyQuizs.length - 1];
                        for (var i in resultData.answersForAttemptedQuizs) {
                            vm.quizAnsMap[resultData.answersForAttemptedQuizs[i].quizmapid] = resultData.answersForAttemptedQuizs[i].option;
                        }
                    }
                    vm.quizObj = response.data.quiz;
                    //vm.totalscore = vm.quizObj.questionsForQuiz.length;
                    angular.forEach(vm.quizObj.quizsMap, function(value, index) {
                        var isAnswered = false;
                        //value.isExplanationEnabled = false;
                        angular.forEach(value.qusetionMap.answersForQuestions, function(val, index) {
                            if (vm.quizAnsMap[value.id] !== undefined && vm.quizAnsMap[value.id] == val.id) {
                                val["isSelected"] = true;
                            } else {
                                val["isSelected"] = false;
                            }

                        })
                    })
                    vm.current_index = $state.params.qid;


                }
            });
        } else {
            requestHandler.get('quiz/', { id: $state.params.id, userid: userid }).query(function(response) {
                console.log("hh", response)
                if (response.status === 200) {
                    vm.QualifiedQuizId = response.data.qualifiedquiz.id;
                    vm.quizObj = response.data.quiz[0];
                    vm.timeLeft = parseInt(vm.quizObj.totaltime) * 60;
                    //vm.timeLeft = 10;
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
        if (vm.current_index < vm.quizObj.quizsMap.length - 1) {
            vm.current_index++;
        } else if (vm.isQuizStartMode) {
            $("#lastQuesModal").modal('show');
        }
    };

    vm.currentQuestion = function(index) {
        vm.current_index = index;
    }

    vm.checkButton = function(opt, index, qindex) {
        //console.log(index, opt, qindex);
        if (vm.isQuizStartMode) {
            vm.selectedIndexs.push(qindex);
            vm.quizObj.quizsMap[vm.current_index].qusetionMap.answersForQuestions.forEach(function(obj, ind) {
                obj.isSelected = false;
                if (index === ind) {
                    obj.isSelected = true;
                }
            });
        }
        //vm.questionArray[vm.current_index].options[index].isSelected = true;
    }

    vm.reviewQuestion = function() {

        vm.quizObj.quizsMap[vm.current_index]["isReview"] = true;
        vm.nextQuestion();
    }

    vm.checkQuizStat = function(timeComplete) {
        vm.sendObj = {};

        vm.mytotalreviewed = 0;
        vm.totalanswerdquestion = 0;
        vm.totalunanswerdquestion = 0;
        vm.totalscore = 0;
        //vm.sendObj['quizForQualifyingId'] = vm.quizObj.id;
        vm.sendObj['qualifyQuizId'] = vm.QualifiedQuizId;
        vm.sendObj['answersForAttemptedQuizs'] = [];
        vm.sendObj['isretake'] = false;
        //vm.sendObj['totalscore'] = quizscore.calculateQuizTotalScore(vm.quizObj.quizsMap);
        vm.totalscore = vm.quizObj.totalscore;
        angular.forEach(vm.quizObj.quizsMap, function(value, index) {
            var isAnswered = false;
            if (value.isReview) {
                vm.mytotalreviewed++;
            }
            angular.forEach(value.qusetionMap.answersForQuestions, function(val, index) {
                if (val.isSelected) {
                    isAnswered = true;
                    vm.sendObj['answersForAttemptedQuizs'].push({ quizid: vm.quizObj.id, quizmapid: value.id, option: val.id });
                } else {}
            })
            if (!isAnswered) {
                vm.mytotalscore++;
                vm.totalunanswerdquestion++;
            } else {
                vm.totalanswerdquestion++;
            }
        })
        if (timeComplete !== undefined) {
            vm.submitQuiz();
        } else {
            $("#quizStatModal").modal('show');
        }
    }

    vm.submitQuiz = function() {

        $("#quizStatModal").modal('hide');

        //console.log("????", vm.sendObj);
        vm.sendObj['iscomplete'] = true;
        vm.sendObj['attemptedon'] = new Date();
        console.log("herr", $window.sessionStorage.userid);
        if ($window.sessionStorage.userid !== null && $window.sessionStorage.userid !== undefined) {
            $("#quizSubmit").modal('show');
            requestHandler.post('submitquiz/').save(vm.sendObj).$promise.then(function(res) {
                console.log(res);
                if (res.status === 200) {
                    console.log('herr');

                    $("#quizSubmit").modal('hide');
                    $timeout(function() {
                        $state.go('quizresult', { id: $state.params.id });
                    }, 1000);
                }
            })
        } else {
            $window.sessionStorage.isauthenticateduser = false;
            $window.sessionStorage.quizid = $state.params.id;
            $window.sessionStorage.qobj = JSON.stringify(vm.sendObj);
            $timeout(function() {
                $state.go("signin");
            }, 1000);


        }
    }

    vm.popCreditModal = function() {
        $("#creditModal").modal('show');
    }

    vm.getExplanation = function() {

        $("#creditModal").modal('hide');
        (vm.isExplanationEnabled) ? vm.isExplanationEnabled = false: vm.isExplanationEnabled = true;
    }

    vm.popSubmitAfterLast = function() {
        $("#lastQuesModal").modal('hide');
        vm.checkQuizStat();
    }

}])