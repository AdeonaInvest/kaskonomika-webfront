/**
 * Created by Ravy on 22.03.2017.
 */
(function () {
    'use strict';

    angular.module('partners')
        .controller('pagePsoController', pagePsoController);

    pagePsoController.$inject = ['$rootScope','$scope','$http','config'];

    function pagePsoController($rootScope,$scope,$http,config) {
        var vm = this,
        api = config.api;
        $scope.order = 'create_date';
        $scope.reverse = false;
        vm.psoList = false;

        activate();
        /////////////////////
        function activate() {
            getPsoList();

        }

        /**
         * Получение и форматирование списка ПСО
         */
        function getPsoList() {
            var list;
            $http.get(api + '/pso/applications/list?token=' + $rootScope.token)
                .then(function(response){
                    vm.psoList = [];
                    if (response.data.result) {
                        list = response.data.response;
                        list.forEach(function(f){
                            var data = {
                                number: f.number,
                                policy_number: f.policy_number,
                                pso_status: f.pso_status,
                                create_date: f.create_date,
                                pso_status_date: f.pso_status_date,
                                is_mount: f.is_mount || false,
                                is_review: f.is_review || false
                            };
                            vm.psoList.push(data);
                        })
                    } else {
                        vm.error = true;
                    }
                })
        }

    }
})();

