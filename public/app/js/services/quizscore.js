// service that calculate quiz score.
angular.module('mockquiz.services').service('quizscore', ['$resource', '$q', '$http', function($resource, $q, $http) {

    this.calculateQuizTotalScore = function() {
        //console.log(arguments);
        var totalScore = 0.00;
        for (var i = 0; i < arguments[0].length; i++) {
            for (var j = 0; j < arguments[0][i].answersForQuestions.length; j++) {

                if (arguments[0][i].answersForQuestions[j].isSelected !== undefined &&
                    arguments[0][i].answersForQuestions[j].isSelected) {
                    if (arguments[0][i].answersForQuestions[j].iscorrectanswer) {
                        totalScore = totalScore + arguments[1];
                    } else {
                        totalScore = totalScore - arguments[2];
                    }
                }
            }
        }
        //console.log(totalScore);
        return totalScore;
    }

}])