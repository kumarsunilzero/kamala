angular.module('mockquiz.controllers').controller('instructions', ['$scope', 'requestHandler', '$state', function($scope, requestHandler, $state) {

    var vm = this;
    vm.quizid = $state.params.id;
}])