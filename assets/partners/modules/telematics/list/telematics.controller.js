/**
 * Created by Ravy on 22.03.2017.
 */
(function () {
    'use strict';

    angular.module('partners')
        .controller('pageTelematicsListController', pageTelematicsListController);

    pageTelematicsListController.$inject = ['$rootScope','$http','config'];

    function pageTelematicsListController($rootScope,$http,config) {
        var vm = this;
        var api = config.api;
        vm.telemathicList = false;

        activate();
        /////////////////////
        function activate() {
            getTelemathic();

        }

        /**
         * Получение и форматирование списка убытков
         */
        function getTelemathic() {
            $http.get(api + '/telematic/cars_with_devices?token=' + $rootScope.token)
                .then(function(response){
                    if (response.data.result) {
                        vm.telemathicList = response.data.response;
                    } else {
                        vm.error = true;
                    }
                })
        }

    }
})();

