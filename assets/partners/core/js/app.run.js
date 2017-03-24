(function () {
    'use strict';

    angular
        .module('partners')
        .run(run);

        run.$inject = ['$rootScope'];

    function run ($rootScope) {
        
        var token = localStorage.getItem('token');
        $rootScope.token = token || null;
        xlog('Токен:', $rootScope.token || 'не существует');
        
    }
})();