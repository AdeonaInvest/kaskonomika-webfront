/**
 * Created by Ravy on 22.03.2017.
 */
(function () {
    'use strict';

    angular.module('partners')
        .controller('pageLossesController', pageLossesController);

    pageLossesController.$inject = ['$rootScope','$http','config','modalService'];

    function pageLossesController($rootScope,$http,config,modalService) {
        let vm = this;
        vm.lossesList = false;

        vm.openModal = openModal; //Открытие модального окна

        activate();
        /////////////////////
        function activate() {
            getLosses();

        }

        /**
         * Получение и форматирование списка убытков
         */
        function getLosses() {
            $http.get(config.api + '/losses/applications?token=' + $rootScope.token)
                .then(function(response){
                    if (response.data.result) {
                        vm.lossesList = response.data.response;
                    } else {
                        vm.error = true;
                    }
                })
        }

        /**
         * Открытие модального окна
         * @param id - ID записи в списке
         */
        function openModal(id) {
            vm.id = id;
            modalService.openModal('lossesModal', {id:id}, 'lg','lossesModalModalController');
        }
    }
})();

