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
                phone: vm.registrationPhone,
                email: vm.registrationEmail,
                password: vm.registrationPass,
                login: vm.registrationEmail
            };
            $http.post(config.api + 'users/registration',data)
                .then(function(response){
                    if (response.data.result) {
                        vm.user.activation_hash = response.data.response.activation_hash;
                        vm.user.user_id = response.data.response.user_id;
                        vm.step = 2;
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
            $http.post(config.api + 'users/confirmPhoneByCode',data)
                .then(function(response){
                    if (response.data.result) {

                    } else {
                        vm.user.code = undefined;
                        vm.user.cadeError = true;
                    }
                })
        }
        
    }
})();