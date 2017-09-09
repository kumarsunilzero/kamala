angular.module('mockquiz.services', []).service('requestHandler', ['$resource', '$q', '$http', 'EnvironmentConfig', function($resource, $q, $http, EnvironmentConfig) {

    this.get = function(url, params) {
        var host = EnvironmentConfig.api;
        return $resource(host + url, params, {
            query: {
                method: 'GET',
                isArray: false,
                // cache : true,
            }
        }, {
            stripTrailingSlashes: false
        });
    }
    this.post = function(url, params) {
        var host = EnvironmentConfig.api;
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