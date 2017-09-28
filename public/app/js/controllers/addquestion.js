angular.module('mockquiz.controllers').controller('question', ['$scope', 'requestHandler', '$rootScope', 'utils', 'toaster', '$state', function($scope, requestHandler, $rootScope, utils, toaster, $state) {

    var vm = this;
    vm.allAssociatedLevel = ['Easy', 'Hard', 'Medium'];
    vm.allAssociatedcategory = ['Objective'];
    vm.questionObj = {
        answersForQuestions: []
    };

    vm.options = {
        language: 'en',
        allowedContent: false,
        entities: false,
        extraPlugins: 'mathjax',
        mathJaxClass: 'm-equation',
        mathJaxLib: 'http://cdn.mathjax.org/mathjax/2.6-latest/MathJax.js?config=TeX-AMS_HTML'
    };

    // Called when the editor is completely ready.
    vm.onReady = function() {
        console.log("I am herrr")
        // ...
    };
    vm.initialLoadfunction = function() {
        //CKEDITOR.replace('editor1');
        if ($state.params.type === 'update') {
            requestHandler.get('questions/', { id: $state.params.id }).query(function(response) {
                console.log("hh", response)
                vm.questionObj = response.data[0];
            });
        }
    }
    vm.initialLoadfunction();
    vm.addAnswers = function() {
        vm.questionObj.answersForQuestions.push({ title: '', iscorrectanswer: false });
    }

    vm.removeAnswer = function(index) {
        vm.questionObj.answersForQuestions.splice(index, 1);
    }

    vm.addCorrectAnswer = function(index) {
        angular.forEach(vm.questionObj.answersForQuestions, function(val, ind) {
            if (ind === index) {
                val.iscorrectanswer = true;
            } else {
                val.iscorrectanswer = false;
            }

        })
    }

    vm.saveQuestion = function() {
        var sendObj = {};
        sendObj = angular.extend(sendObj, vm.questionObj);
        console.log("ssss", sendObj);
        if (Object.keys(sendObj).length > 6) {
            //console.log("----", sendObj);
            requestHandler.post('question/' + $state.params.type + '/').save([sendObj]).$promise.then(function(res) {
                if (res.status === 200) {
                    $state.go('quizlist');
                }
            });
        } else {
            toaster.pop('error', 'Validation Error', 'Please Fill All Fields');
        }
    }

}])