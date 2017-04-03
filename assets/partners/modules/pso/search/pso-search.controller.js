/**
 * Created by Ravy on 22.03.2017.
 */
(function () {
    'use strict';

    angular.module('partners')
        .controller('pagePsoSearchController', pagePsoSearchController);

    pagePsoSearchController.$inject = ['$rootScope','$location','$http','config'];

    function pagePsoSearchController($rootScope,$location,$http,config) {
        var vm = this,
        api = config.api;

        vm.findPsoById = findPsoById;


        function findPsoById(id) {
            vm.error = false;
            $http.get(api + '/pso/applications/item/' + id + '?token=' + $rootScope.token)
                .then(function(response){
                    if (response.data.result) {
                        $location.url('/pso/item/' + id);
                    } else {
                        vm.error = true;
                    }
                })

        }
        

    }
})();

