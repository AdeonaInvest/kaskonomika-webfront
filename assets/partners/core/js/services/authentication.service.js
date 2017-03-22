(function () {
    'use strict';

    angular
        .module('partners')
        .service('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', 'intercomService', 'userService'];

    function authenticationService($http, intercomService, userService) {
        this.login = login;
        this.logout = logout;
        this.registration = registration;
        this.restorePswrd = restorePswrd;

        ////////////////

        // Авториязация по логину / паролю
        function login(email, password) {
            return $http
                .post('/api/login', {email: email, password: password})
                .then(function () {
                    intercomService.emit('authentication.login');
                })
        }

        // Регистрация пользователя
        function registration(email, action) {
            preloader.act('authenticationService-registration');
            var data = {
                email: email,
                password: 'passwordpassword'
            };

            if (action && action == 'autoLogin') {
                //TODO............................
            } else {
                return $http.post('/api/signup', data)
                    .then(function(){
                        /*$window.location.reload();*/
                    })
                    .finally(function(){
                        preloader.dis('authenticationService-registration');
                    })
            }
        }

        // Выход из аккаунта
        function logout() {
            preloader.act('authenticationService-logout');
            $http.get('/api/logout')
                .then(function () {
                    userService.resetUserProfile();
                    window.location.href = '/';
                    preloader.dis('authenticationService-logout');
                })
                .finally(function(){
                    preloader.dis('authenticationService-logout');
                });
        }

        // Восстановление пароля на почту
        function restorePswrd(email) {
            var data = {
              email: email
            };
            return $http.post('/api/accounts/password/reset', data)
        }
    }

})();

