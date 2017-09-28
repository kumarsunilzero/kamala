angular.module('mockquiz.controllers').controller('allquestion', ['$scope', 'requestHandler', '$rootScope', 'utils', function($scope, requestHandler, $rootScope, utils) {

    var vm = this;

    vm.questionlistGrid = {
        columnDefs: [{
                name: "title",
                cellTemplate: "<div ng-bind-html='row.entity.title'></div>"
            },
            {
                name: "explanation",
                cellTemplate: "<div ng-bind-html='row.entity.explanation'></div>"
            },
            { name: "subject" },
            { name: "marks" },
            { name: "category" },
            { name: "negativemark" },
            { name: "totaltime" },
            {
                name: "answer",
                cellTemplate: "<div class='ui-grid-cell-contents'><ol><li ng-repeat='list in row.entity.answer'>{{list}}</li></ol></div>"
            },
            {
                name: "Action",
                cellTemplate: "<div class='ui-grid-cell-contents'><span class='btn' titel='Update' ui-sref='question({type:\"update\",id:row.entity.id})'><i class='material-icons'>mode_edit</i></span><span class='btn' title='Delete' ng-click='grid.appScope.ctrl.deleteQuestion(row.entity.id)'><i class='material-icons'>cancel</i></span></div>"
            },
        ],
        data: []
    }

    vm.initialLoadfunction = function() {
        requestHandler.get('questions/').query(function(response) {
            console.log("hh", response)
            if (response.status === 200) {
                var quesdataArray = [];
                angular.forEach(response.data, function(val, index) {
                    var answerList = [];
                    angular.forEach(val.answersForQuestions, function(value, ind) {
                        answerList.push(value.title);
                    })
                    quesdataArray.push({
                        title: val.title,
                        explanation: val.explanation,
                        marks: val.marks,
                        category: val.category,
                        subject: val.subject,
                        answer: answerList,
                        id: val.id
                    })
                })
                vm.questionlistGrid.data = [];
                vm.questionlistGrid.data = quesdataArray;
            }
        });
    }

    vm.deleteQuestion = function(id) {
        console.log(">.........", id);
        requestHandler.delete('question/delete/', { id: id }).delete(function(response) {
            console.log(response);
            if (response.status === 200) {
                vm.initialLoadfunction();
            }
        })
    }

}])