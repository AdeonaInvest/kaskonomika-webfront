(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .service('modalService', modalService);

    modalService.$inject = ['$uibModal','$rootScope'];

    function modalService($uibModal,$rootScope) {
        let vm = this;
        vm.open = open;

        /**
         * Открытие кастомного модального окна
         */
        function open(data) {
            !data.data ? data.modalData = {} : null;
            !data.template ? data.template = 'default' : null;
            $rootScope.modalData = data.data;
            $uibModal.open({
                animation: true,
                templateUrl: '/modals/tpls/' + data.template + '/' + data.template + '.html',
                size: !data.size ? data.size = 'md' : data.size,
                backdrop: true,
                controller: !data.ctrl ? data.ctrl = 'defaultModalController' : data.ctrl,
                controllerAs: 'vm'
            });
        }
    }

})();