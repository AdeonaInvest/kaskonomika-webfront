(function () {
    'use strict';

    angular.module('partners')
        .controller('loginController', loginController);

    loginController.$inject = ['authenticationService','$location'];

    function loginController(authenticationService,$location) {
        var vm = this;
        vm.loginEmail = null;
        vm.loginPass = null;
        vm.loginRemember = false;
        vm.error = null;

        vm.login = login;
        vm.restore = restore;

        activate();

        function activate(){
            getUserRemember()
        }

        function login(){
            if (vm.loginEmail == 'admin' && vm.loginPass == 'admin') {
                if (vm.loginRemember)  {
                    localStorage.setItem('userAuthRemember', vm.loginEmail);
                }
                $location.url('/dashboard');
            } else {
                vm.loginPass = null;
                vm.error = 'Введены неверная почта или пароль. Попробуйте снова';

            }
            //authenticationService.login(vm.loginEmail, vm.loginPass);
        }

        function getUserRemember() {
            var user = localStorage.getItem('userAuthRemember');
            if (user) vm.loginEmail = user;
        }

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

