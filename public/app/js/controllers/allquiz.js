angular.module('mockquiz.controllers').controller('allquiz', ['$scope', 'requestHandler', '$rootScope', 'utils', function($scope, requestHandler, $rootScope, utils) {

    var vm = this;
    vm.quizlistGrid = {
        columnDefs: [{
                displayName: 'Title',
                name: 'title'
            },
            {
                displayName: 'Description',
                name: 'description'
            },
            {
                displayName: 'Total Marks',
                name: 'totalmarks'
            },
            {
                displayName: 'Marks',
                name: 'marks'
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
            }
        ],
        data: []
    }
    vm.initialLoadfunction = function() {
        requestHandler.get('quizs/').query(function(response) {
            //console.log("hh", response)
            if (response.status === 200) {
                var dataArray = [];
                angular.forEach(response.data, function(val, index) {
                    dataArray.push({
                        title: val.title,
                        description: val.description,
                        totaltime: val.totaltime,
                        totalmarks: val.totalscore,
                        marks: val.marks,
                        type: val.type,
                        level: val.level
                    })
                })
                vm.quizlistGrid.data = dataArray;
            }
        });
    }
}])