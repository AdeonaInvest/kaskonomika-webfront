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

        activate();
        /////////////////////
        function activate() {
            getPsoList();

        }

    /*<td>{{key}}</td>
        <td>{{row.number}}</td>
        <td>{{row.policy_number}}</td>
        <td>{{row.pso_status}}</td>
        <td>{{row.create_date}}</td>
        <td>{{row.pso_status_date}}</td>
        <td>
        <span ng-if="row.is_mount">Установка </span>
            <span ng-if="row.is_mount && row.is_review"> / </span>
            <span ng-if="row.is_review"> Осмотр</span>
            </td>*/
        function getPsoList() {
            var list;
            vm.psoList = [];
            $http.get(api + '/pso/applications/list?token=' + $rootScope.token)
                .then(function(response){
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


                    }

                })
        }

    }
})();

