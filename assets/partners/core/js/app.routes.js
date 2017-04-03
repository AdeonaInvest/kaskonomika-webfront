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
                templateUrl: '/pso/list/pso-list.html',
                controller: 'pagePsoListController',
                controllerAs: 'vm'
            })
            .when ('/pso/item/:id', {
                templateUrl: '/pso/item/pso-item.html',
                controller: 'pagePsoItemController',
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