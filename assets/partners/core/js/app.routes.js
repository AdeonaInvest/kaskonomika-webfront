(function () {
    'use strict';

    angular
        .module('partners')
        .config(config);

    config.$inject = ['$routeProvider'];
    
    function config ($routeProvider) {
        $routeProvider
            .when ('/', {
                templateUrl: '/login/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when ('/dashboard', {
                templateUrl: '/index/index.html',
                controller: 'indexController',
                controllerAs: 'vm'
            })
            .when ('/pso', {
                templateUrl: '/pso/pso.html',
                controller: 'pagePsoController',
                controllerAs: 'vm'
            })
            .when ('/losses', {
                templateUrl: '/losses/losses.html',
                controller: 'pageLossesController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();