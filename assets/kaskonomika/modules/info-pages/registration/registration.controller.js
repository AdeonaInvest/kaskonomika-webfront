(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('registrationController', registrationController);

    registrationController.$inject = ['$scope','config','$http'];

    function registrationController($scope,config,$http) {
        ///////////////////
        var vm = this;
        vm.view = false; //Статус готовности отображения
        vm.step = 1;
        vm.user = {
            email: '',
            pass: '',
            phone: '',
            agree: false
        };
        
        vm.registration = registration;
        vm.confirmPhone = confirmPhone;
        vm.clearErrorData = clearErrorData;

        activate();
        function activate() {
            $scope.$on('cfpLoadingBar:completed',function(){
                vm.view = true;
            });
        }
        //////////////////

        /**
         * Регистрация пользователя
         */
        function registration() {
            var data = {
                phone: vm.user.phone,
                email: vm.user.email,
                password: vm.user.pass,
                login: vm.user.email
            };
            vm.user.await = true;
            vm.user.regError = false;
            $http.post(config.api + 'users/registration',data)
                .then(function(response){
                    if (response.data.result) {
                        vm.user.activation_hash = response.data.response.activation_hash;
                        vm.user.user_id = response.data.response.user_id;
                        vm.step = 2;
                        vm.user.await = false;
                    } else {
                        vm.user.regError = true;
                        vm.user.errorCode = response.data.response.code;
                        if (response.data.response.code == '200.1.4') {
                            vm.user.errorCode = '200.1.4'
                        }
                        vm.user.await = false;
                    }
                })
        }

        /**
         * Подтверждение кода из SMS
         */
        function confirmPhone() {
            var data = {
                phone: vm.user.phone,
                sms_verification_code: vm.user.code
            };
            vm.user.codeError = false;
            vm.user.await = true;
            $http.post(config.api + 'users/confirmPhoneByCode',data)
                .then(function(response){
                    if (response.data.result) {
                        vm.user.await = true;

                    } else {
                        vm.user.code = undefined;
                        vm.user.codeError = true;
                        vm.user.await = false;
                    }
                })
        }

        /**
         * Очищение ошибок при изменении форм
         */
        function clearErrorData() {
            vm.user.regError = false;
            vm.user.errorCode = undefined;
        }
        
    }
})();