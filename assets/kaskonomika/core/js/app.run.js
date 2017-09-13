(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .run(run);

        run.$inject = ['$http','config','$rootScope'];

    function run ($http,config,$rootScope) {


        /**
         * Проверка наличия залогининного пользователя
         */
        (function checkUser() {
            var token = localStorage.getItem('currentToken'),
                user = localStorage.getItem('currentUser');
            if (token && user) {
                $http.get(config.api+'isTokenAuthorized/'+token)
                    .then(function(_res){
                        if (_res.data.response && _res.data.result) {
                            $rootScope.currentUser = JSON.parse(user);
                            $rootScope.currentToken = token;
                            xlog('APP.RUN : USER ->', $rootScope.currentUser);
                        } else {
                            $rootScope.currentUser = undefined;
                            localStorage.removeItem('currentToken');
                            localStorage.removeItem('currentUser');
                        }
                    })
            } else {
                $rootScope.currentUser = undefined;
                localStorage.removeItem('currentToken');
                localStorage.removeItem('currentUser');
            }
        })()


    }
})();