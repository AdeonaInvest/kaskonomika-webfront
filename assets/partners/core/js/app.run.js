(function () {
    'use strict';

    angular
        .module('partners')
        .run(run);

        run.$inject = ['$rootScope'];

    function run ($rootScope) {

        activate ();

        //////////////

        function activate() {
            getMyToken();
        }

        /**
         * Получение моего токена, если он сохранен в локалсторедже
         */
        function getMyToken() {
            var token = localStorage.getItem('token');
            $rootScope.token = token || null;
            xlog('Токен:', $rootScope.token || 'не существует');
        }
        

        
    }
})();