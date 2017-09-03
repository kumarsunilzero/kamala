// service that calculate quiz score.
angular.module('mockquiz.services').service('utils', ['$resource', '$q', '$http', function($resource, $q, $http) {

    this.to_json = function(workbook) {
        var result = {};
        workbook.SheetNames.forEach(function(sheetName) {
            //console.log(sheetName);
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            //console.log(roa);
            if (roa.length > 0) {
                result[sheetName] = roa;
            }
        });
        return result;
    }

}])