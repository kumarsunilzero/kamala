angular.module('mockquiz.controllers').controller('addquiz', ['$scope', 'requestHandler', '$rootScope', 'utils', 'toaster', function($scope, requestHandler, $rootScope, utils, toaster) {

    var vm = this;
    vm.allAssociatedLevel = ['Easy', 'Hard', 'Medium'];
    vm.allAssociatedType = ['Multiple'];
    vm.questionExcelData = '';
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
            }
        ],
        data: []
    }
    vm.quizObj = {};
    vm.initialLoadfunction = function() {
        requestHandler.get('quizs/').query(function(response) {
            console.log("hh", response)
            if (response.status === 200) {
                vm.quizlistArray = response.data;
            }
        });
    }

    vm.configureExcelFile = function(file) {
        console.log(file);
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
                    }
                }
                reader.readAsBinaryString(file);
            }
        } catch (err) {
            console.log("err", err);
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
            for (var j = 0; j < data[i].answersForQuestions.length; j++) {
                var obj = {};
                obj["title"] = data[i].title;
                obj["answers"] = data[i].answersForQuestions[j].title;
                obj["iscorrectanswer"] = data[i].answersForQuestions[j].iscorrectanswer;
                obj["explanation"] = data[i].explanation;
                dataArray.push(obj);
            }
        }
        vm.quizQuestionsGrid.data = dataArray;
    }
    vm.saveQuiz = function() {
        var sendObj = {};
        sendObj = angular.extend(sendObj, vm.quizObj);
        sendObj["questionsForQuiz"] = vm.questionExcelMap;
        if (Object.keys(sendObj).length === 8) {
            //console.log("----", sendObj);
            requestHandler.post('quiz/add/').save(sendObj).$promise.then(function(res) {
                if (res.status === 200) {
                    $state.go('quizlist');
                }
            });
        } else {
            toaster.pop('error', 'Validation Error', 'Please Fill All Fields');
        }
    }

}])