(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .config(config);

    config.$inject = ['$routeProvider'];
    
    function config ($routeProvider) {
        $routeProvider
            .when ('/', {
                templateUrl: '/index/index.html',
                controller: 'indexController',
                controllerAs: 'vm'
            })
            .when ('/how-it-work', {
                templateUrl: '/how-it-work/how-it-work.html',
                controller: 'indexController',
                controllerAs: 'vm'
            })
            .when ('/faq', {
                templateUrl: '/faq/faq.html',
                controller: 'faqController',
                controllerAs: 'vm'
            })
            .when ('/download', {
                templateUrl: '/download/download.html',
                controller: 'downloadController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();