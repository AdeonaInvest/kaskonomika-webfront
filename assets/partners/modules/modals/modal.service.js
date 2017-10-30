(function () {
    'use strict';

    angular
        .module('partners')
        .service('modalService', modalService);

    modalService.$inject = ['$uibModal','$rootScope'];

    function modalService($uibModal,$rootScope) {
        let vm = this;
        vm.openModal = openModal;

        /**
         * Открытие кастомного модального окна
         * @param template (string) - имя шаблона
         * @param modalData (obj)- любые данные в формате JSON. Доступ к ним в модальном окне осуществляется через vm.mo
         * @param size (string) - размер окна - lg, md, sv
         * @returns {Window|*|{height}}
         */
        function openModal(template, modalData, size, ctrl) {
            $rootScope.modalData = modalData;
            $uibModal.open({
                animation: true,
                templateUrl: '/modals/tpls/' + template + '/' + template + '.html',
                size: size || 'md',
                backdrop: true,
                controller: ctrl,
                controllerAs: 'vm'
            });
        }
    }

})();