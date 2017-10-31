angular.module('mockquiz', [
        'ui.router',
        'mockquiz.controllers',
        'ngResource',
        'mockquiz.services',
        'timer',
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.exporter',
        'ui.grid.edit',
        'ui.grid.resizeColumns',
        'ui.grid.moveColumns',
        'ui.grid.treeView',
        'ui.grid.grouping',
        'ui.grid.autoResize',
        'ui.grid.pagination',
        'ui.grid.pinning',
        'ui.select',
        'ngFileUpload',
        'ngAnimate',
        'toaster',
        'myApp.config',
        'ckeditor',
        'ngSanitize'
    ])
    .run(['$rootScope', '$state', '$window', function($rootScope, $state, $window) {
        $rootScope.signOut = function() {
            $state.go('signin');
        }
        console.log($window);
        $rootScope.role = ($window.sessionStorage.role !== undefined) ? $window.sessionStorage.role : 'participant';
    }])