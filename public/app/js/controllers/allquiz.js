angular.module('mockquiz.controllers').controller('allquiz', ['$scope', 'requestHandler', '$rootScope', 'utils', function($scope, requestHandler, $rootScope, utils) {

    var vm = this;
    vm.quizlistGrid = {
        columnDefs: [{
                displayName: 'Title',
                name: 'title',
                cellTemplate: "<div ng-bind-html='row.entity.title'></div>"
            },
            {
                displayName: 'Description',
                name: 'description',
                cellTemplate: "<div ng-bind-html='row.entity.description'></div>"
            },
            {
                displayName: 'Total Time',
                name: 'totaltime'
            },
            {
                displayName: 'Level',
                name: 'level'
            }, {
                displayName: 'Type',
                name: 'type'
            },
            {
                name: 'action',
                displayName: 'Action',
                cellTemplate: '<div><span class="btn" title="Edit" ui-sref="addquiz({type:\'update\',id:row.entity.id})"><i class="material-icons">mode_edit</i></span></div>'
            }
        ],
        data: []
    }

    vm.initialLoadfunction = function() {
        requestHandler.get('quizs/', { association: 1 }).query(function(response) {
            console.log("hh", response)
            if (response.status === 200) {
                var dataArray = [];
                angular.forEach(response.data, function(val, index) {
                    dataArray.push({
                        title: val.title,
                        description: val.description,
                        totaltime: val.totaltime,
                        type: val.type,
                        level: val.level,
                        id: val.id,
                        status: val.isApproved
                    })
                })
                vm.quizlistGrid.data = [];
                vm.quizlistGrid.data = dataArray;
            }
        });
    }

    vm.deleteQuiz = function(id) {
        requestHandler.delete('quiz/delete/', { id: id }).delete(function(response) {
            console.log(response);
            if (response.status === 200) {
                vm.initialLoadfunction();
            }
        })
    }
}])