/**
 * Created by Ravy on 22.03.2017.
 */
(function () {
    'use strict';

    angular.module('partners')
        .controller('pagePsoController', pagePsoController);

    pagePsoController.$inject = ['$rootScope','$http','config'];

    function pagePsoController($rootScope,$http,config) {
        var vm = this,
        api = config.api;

        activate();
        /////////////////////
        function activate() {
            getPsoList();

        }

        function getPsoList() {
            $http.get(api + '/pso/applications/list?token=' + $rootScope.token)
                .then(function(response){
                    if (response.data.result) {

                    }

                })
        }

    }
})();

