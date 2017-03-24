(function () {
    'use strict';

    angular
        .module('partners')
        .service('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', 'intercomService', 'userService','config','$rootScope'];

    function authenticationService($http, intercomService, userService,config,$rootScope) {
        this.login = login;
        this.logout = logout;
        this.registration = registration;
        this.restorePswrd = restorePswrd;

        var api = config.api;

        ////////////////

        /*{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }*/

        // Авториязация по логину / паролю
        function login(email, password, redirect, remember) {
            return $http
                .post(api+'/authorization', {username: email, password: password,'meta-stop':true})
                .then(function (response) {
                    if (response.data.result) {
                        localStorage.setItem('token', response.data.token);
                        $rootScope.token = response.data.token;
                        xlog('Token:', $rootScope.token);
                        $rootScope.user = response.data.response;
                        intercomService.emit('user-login-success',{
                            remember: remember || null, 
                            url: redirect
                            }
                        );

                    } else {
                        intercomService.emit('user-login-error', response.data);
                    }
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

