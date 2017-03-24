/**
 * Created by Ravy on 22.03.2017.
 */
(function () {
    'use strict';

    angular.module('partners')
        .controller('loginController', loginController);

    loginController.$inject = ['authenticationService','intercomService','$scope'];

    function loginController(authenticationService,intercomService,$scope) {
        var vm = this;
        vm.loginEmail = null;
        vm.loginPass = null;
        vm.loginRemember = false;
        vm.error = null;
        vm.restoreBtnReady = false;

        vm.login = login; //Запрос авторизации пользователя
        vm.restore = restore; //Восстановление доступа к аккаунту
        vm.lookAtRestoreAddress = lookAtRestoreAddress; //Слежение за вводимыми данными в поле для восстановления пароля

        activate();

        function activate(){
            getUserRemember();

            intercomService.on('user-login-error', userLoginError);
        }

        /**
         * Запрос авторизации пользователя
         */
        function login(){
            //TODO сделать валидацию поля vm.loginEmail на предмет ника, почты или телефона
            authenticationService.login(vm.loginEmail, vm.loginPass, '/dashboard')
        }

        /**
         * Отработка ошибки авторизации на сайте
         * @param error - Сообщение о ошибке авторизации.
         */
        function userLoginError(error) {
            vm.loginPass = null;
            vm.error = error.response.message;
            xlog('Ошибка авторизации', error.response.code, error.response.message);
        }

        /**
         * Просил ли пользователь запоминать его на этом устройстве?
         */
        function getUserRemember() {
            var user = localStorage.getItem('userAuthRemember');
            if (user) vm.loginEmail = user;
        }

        /**
         * Слежение за вводимыми данными в поле для восстановления пароля
         */
        function lookAtRestoreAddress() {
            console.log('переключился');
            $scope.$watch('vm.restoreEmail',function(){
                console.log('vm.restoreEmail',vm.restoreEmail, vm.restoreBtnReady, vm.restoreEmail, vm.restoreBtnType);
                if (vm.restoreEmail) {
                    if (vm.restoreEmail.length > 0 && ((vm.restoreEmail.length == 11 && vm.restoreEmail/2) || (vm.restoreEmail.indexOf('@') > 0 && vm.restoreEmail.indexOf('.') > 0))) {
                        if (vm.restoreEmail / 2) {
                            vm.restoreBtnType = 'phone'
                        } else {
                            vm.restoreBtnType = 'mail'
                        }
                        vm.restoreBtnReady = true;
                    } else {
                        vm.restoreBtnReady = false;
                        vm.restoreTextError = 'Некорректно указан адрес почты или телефон введен неверно'
                    }
                }
            })

            
        }

        /**
         * Восстановление доступа к аккаунту
         */
        function restore() {

        }

        // Login Page Flipbox control
        $('#toFlip').click(function() {
            loginFlip();
            return false;
        });

        $('#noFlip').click(function() {
            loginFlip();
            return false;
        });

        function loginFlip () {
            $('.login-box').toggleClass('flipped');
        }

    }
})();

