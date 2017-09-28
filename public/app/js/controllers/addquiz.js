angular.module('mockquiz.controllers').controller('addquiz', ['$scope', 'requestHandler', '$rootScope', 'utils', 'toaster', '$state', function($scope, requestHandler, $rootScope, utils, toaster, $state) {

    var vm = this;
    vm.allAssociatedLevel = ['Easy', 'Hard', 'Medium'];
    vm.allAssociatedType = ['Multiple'];
    vm.questionExcelData = '';
    vm.questionListApi = {};
    vm.selectedQIds = [];
    vm.quizQuestionsGrid = {
        columnDefs: [{
                displayName: 'Title',
                name: 'title'
            },
            {
                displayName: 'Answers',
                name: 'answers'
            },
            {
                displayName: 'Explanations',
                name: 'explanation'
            },
            {
                displayName: 'Correct answer',
                name: 'iscorrectanswer'
            },
            {
                name: "answer",
                width: "30%",
                cellTemplate: "<div class='ui-grid-cell-contents'><ol><li ng-repeat='list in row.entity.answer'>{{list}}</li></ol></div>"
            },
        ],
        data: []
    }
    vm.options = {
        language: 'en',
        allowedContent: false,
        entities: false,
        extraPlugins: 'mathjax',
        mathJaxClass: 'm-equation',
        mathJaxLib: 'http://cdn.mathjax.org/mathjax/2.6-latest/MathJax.js?config=TeX-AMS_HTML'
    };
    vm.questionlistGrid = {
        enableFiltering: true,
        rowHeight: 30,
        columnDefs: [{
                width: '4%',
                //name: 'name',
                field: 'text',
                headerCellTemplate: '<div class="ui-grid-cell-contents padding-10px"></div>',
                suppressRemoveSort: true,
                cellTemplate: '<div class="ui-grid-cell-contents padding-10px"><input type="checkbox" id="{{row.entity.id}}" class="filled-in" ng-checked="row.entity.isSelected" ng-click="grid.appScope.ctrl.checkAllQuestion(grid.renderContainers.body.visibleRowCache.indexOf(row),row.entity.id,row.entity.qmid)"><label for="{{row.entity.id}}"></label></div>',
                cellClass: function(grid, row) {
                    console.log(grid, row);
                }
            }, {
                name: "title",
                width: "30%",
                cellTemplate: "<div ng-bind-html='row.entity.title'></div>"
            },
            {
                name: "explanation",
                width: "20%",
                cellTemplate: "<div ng-bind-html='row.entity.explanation'></div>"
            },
            {
                name: "subject",
                width: "10%"
            },
            {
                name: "category",
                width: "10%"
            },
            {
                name: "answer",
                width: "30%",
                cellTemplate: "<div class='ui-grid-cell-contents'><ol><li ng-repeat='list in row.entity.answer'>{{list}}</li></ol></div>"
            },
        ],
        data: [],
        onRegisterApi: function(gridApi) {
            vm.questionListApi = gridApi;
            console.log(gridApi)
        }
    }
    vm.quizObj = {};
    vm.isHeaderSelected = false;
    var addedqid = [];
    var deletedqid = [];
    var updatedqid = [];
    vm.checkAllQuestion = function(index, id, qmid) {
        console.log(vm.questionListApi, index, addedqid);

        console.log(addedqid.indexOf(id));
        if ($state.params.type === 'update') {


            if (vm.questionListApi.grid.rows[index].entity.isSelected) {
                if (qmid !== undefined) {
                    (deletedqid.indexOf(qmid) === -1) ? deletedqid.push(qmid): '';
                } else {
                    updatedqid.splice(updatedqid.indexOf(id), 1);
                }
                vm.questionListApi.grid.rows[index].entity.isSelected = false;
            } else {
                if (qmid !== undefined) {
                    deletedqid.splice(deletedqid.indexOf(qmid), 1);
                } else {
                    if (addedqid.indexOf(id) === -1) {
                        (updatedqid.indexOf(id) === -1) ? updatedqid.push(id): '';
                    }
                }
                vm.questionListApi.grid.rows[index].entity.isSelected = true;
            }
        } else {
            if (vm.questionListApi.grid.rows[index].entity.isSelected) {
                addedqid.splice(addedqid.indexOf(id), 1);
                vm.questionListApi.grid.rows[index].entity.isSelected = false;
            } else {
                (addedqid.indexOf(id) === -1) ? addedqid.push(id): '';
                vm.questionListApi.grid.rows[index].entity.isSelected = true;
            }
        }
    }

    vm.initialLoadfunction = function() {
        //$("#quesListModal").modal('show');

        requestHandler.get('questions/').query(function(response) {
            console.log("hh", response)
            if (response.status === 200) {

                //if ($state.params.type === 'update') {
                requestHandler.get('quizs/', { id: $state.params.id, association: 1 }).query(function(res) {
                    console.log("hhjjj", res)
                    if (res.status === 200) {
                        var selectedQIds = [];
                        if ($state.params.type === 'update') {

                            angular.forEach(res.data[0].quizsMap, function(val, ind) {
                                addedqid.push(val.questionId);
                                selectedQIds[val.questionId] = val.id;
                            })
                            vm.quizObj = {
                                title: res.data[0].title,
                                description: res.data[0].description,
                                totaltime: res.data[0].totaltime,
                                level: res.data[0].level,
                                type: res.data[0].type,
                                id: res.data[0].id
                            }
                        }
                        var quesdataArray = [];
                        console.log(selectedQIds, addedqid);
                        angular.forEach(response.data, function(val, index) {
                            var answerList = [];
                            angular.forEach(val.answersForQuestions, function(value, ind) {
                                answerList.push(value.title);
                            })
                            var obj = {
                                title: val.title,
                                explanation: val.explanation,
                                marks: val.marks,
                                category: val.category,
                                subject: val.subject,
                                answer: answerList,
                                isSelected: (addedqid.indexOf(val.id) > -1) ? true : false,
                                id: val.id,
                                qmid: selectedQIds[val.id]
                            }
                            quesdataArray.push(obj)
                        })
                        vm.questionlistGrid.data = quesdataArray;
                        console.log(quesdataArray);
                    }
                });
                //}

            }
        });
    }

    vm.initialLoadfunction();

    vm.configureExcelFile = function(file) {
        //console.log(file);
        try {
            if (file.name.split('.')[1] === 'xlsx' || file.name.split('.')[1] === 'xls') {
                var reader = new FileReader();
                //console.log('hhhhhh')
                reader.onload = function(e) {
                    //console.log("ddddd", e);
                    var bstr = e.target.result;
                    var workbook = XLSX.read(bstr, { type: 'binary' });
                    //console.log("workbook", workbook)
                    var sheet1 = workbook.Sheets.Questions;
                    var isSheet1Valid = (sheet1 !== undefined) &&
                        (sheet1.A1 !== undefined && sheet1.A1.h === 'title') &&
                        (sheet1.B1 !== undefined && sheet1.B1.h === 'option1') &&
                        (sheet1.C1 !== undefined && sheet1.C1.h === 'option2') &&
                        (sheet1.D1 !== undefined && sheet1.D1.h === 'option3') &&
                        (sheet1.E1 !== undefined && sheet1.E1.h === 'option4') &&
                        (sheet1.F1 !== undefined && sheet1.F1.h === 'explanation') &&
                        (sheet1.G1 !== undefined && sheet1.G1.h === 'correctanswer');


                    //console.log("workbook", workbook)
                    if (isSheet1Valid) {
                        var questionExcel = utils.to_json(workbook);
                        //console.log("-----", questionExcel.Questions);
                        vm.questionExcelData = questionExcel.Questions;
                        vm.questionExcelMap = generatequestionMapping(vm.questionExcelData);
                        generateGridData(vm.questionExcelMap);
                        // if (questionExcel !== undefined && questionExcel.length > 0) {
                        //     vm.questionExcelData = questionExcel.Questions;
                        // }
                    } else {
                        toaster.pop('error', "Upload Excel", "Uploaded Excel is not valid.")
                    }
                }
                reader.readAsBinaryString(file);
            } else {
                toaster.pop('error', "Upload Excel", "Please Enter .xlsx or .xls format template.")
            }
        } catch (err) {
            //console.log("err", err);
            toaster.pop('error', "Upload Excel", "Please Enter Correct template.")
        }
    }

    function generatequestionMapping(data) {
        var questionMap = [];
        for (var i = 0; i < data.length; i++) {
            var obj = {};
            obj["title"] = data[i].title;
            obj["explanation"] = data[i].explanation;
            obj["answersForQuestions"] = [];
            obj["answersForQuestions"].push({
                title: data[i].option1,
                iscorrectanswer: ('option1' === data[i].correctanswer) ? true : false
            });
            obj["answersForQuestions"].push({
                title: data[i].option2,
                iscorrectanswer: ('option2' === data[i].correctanswer) ? true : false
            });
            obj["answersForQuestions"].push({
                title: data[i].option3,
                iscorrectanswer: ('option3' === data[i].correctanswer) ? true : false
            });
            obj["answersForQuestions"].push({
                title: data[i].option4,
                iscorrectanswer: ('option4' === data[i].correctanswer) ? true : false
            });
            questionMap.push(obj);
        }
        return questionMap;
    }

    function generateGridData(data) {
        //console.log(">>>>>>>>>>", data);
        var dataArray = [];
        for (var i = 0; i < data.length; i++) {
            var obj = {};
            obj["title"] = data[i].title;
            obj["explanation"] = data[i].explanation;
            obj["answers"] = data[i].answersForQuestions[j].title;
            obj["isSelected"] = false;
            obj["answers"] = [];
            for (var j = 0; j < data[i].answersForQuestions.length; j++) {
                obj["answers"].push(data[i].answersForQuestions[j].title);
            }
            dataArray.push(obj);
        }
        vm.quizQuestionsGrid.data = dataArray;
        vm.questionListApi.grouping.groupColumn('title');
    }

    vm.saveQuiz = function() {
        var sendObj = {};
        sendObj = angular.extend(sendObj, vm.quizObj);
        //sendObj["questionsForQuiz"] = vm.questionExcelMap;
        console.log("********", sendObj, addedqid, deletedqid, updatedqid);

        if (Object.keys(sendObj).length > 4) {
            if (addedqid.length > 0) {
                console.log("----", sendObj);
                requestHandler.post('quiz/' + $state.params.type + '/').save({ quiz: sendObj, questions: addedqid, deletedqid: deletedqid, updatedqid: updatedqid }).$promise.then(function(res) {
                    if (res.status === 200) {
                        $state.go('quizlist');
                    }
                });
            } else {
                toaster.pop('error', 'Validation Error', 'Please Select Question');
            }
        } else {
            toaster.pop('error', 'Validation Error', 'Please Fill All Fields');
        }
    }

    vm.addSelectedQuestion = function() {
        $("#quesListModal").modal('hide');
        var data = vm.questionListApi.selection.getSelectedRows();
        generateGridData(data);
    }

}])