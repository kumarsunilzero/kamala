angular.module('mockquiz.services', []).service('requestHandler', ['$resource', '$q', '$http', function($resource, $q, $http) {
    console.log("this", this);

    this.get = function(url, params) {
        console.log("url....", url, params);
        var host = "http://localhost:3000/api/v1/";
        return $resource(host + url, params, {
            query: {
                method: 'GET',
                isArray: false,
                // cache : true,
            }
        }, {
            stripTrailingSlashes: false
        });

        // $http({
        //     method: 'GET',
        //     url: 'http://localhost:3000/api/v1/quizs/'
        // }).then(function successCallback(response) {
        //     // this callback will be called asynchronously
        //     // when the response is available
        //     console.log("response", response);
        //     return response;
        // }, function errorCallback(response) {
        //     // called asynchronously if an error occurs
        //     // or server returns response with an error status.
        // });
        // return $http({
        //     method: 'GET',
        //     url: 'http://localhost:3000/api/v1/quizs/'
        // });
    }
    this.post = function(url, params) {
        console.log("url....", url, params);
        var host = "http://localhost:3000/api/v1/";
        return $resource(host + url, params, {
            save: {
                method: 'POST',
                isArray: false,
                // cache : true,
            }
        }, {
            stripTrailingSlashes: false
        });
    }
}])