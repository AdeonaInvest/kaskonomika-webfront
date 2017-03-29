/**
 * Created by Ravy on 22.03.2017.
 */
(function () {
    'use strict';

    angular.module('partners')
        .controller('pageLossesController', pageLossesController);

    pageLossesController.$inject = ['$http','config'];

    function pageLossesController($http,config) {
        var vm = this;
        var api = config.api;

        activate();
        /////////////////////
        function activate() {
            getLosses();

        }

        function getLosses() {
            $http.get(api + '/losses/applications/statuses')
                .then(function(response){
                    if (response.data.result) {
                        vm.lossesList = response.data.response;
                    }
                })
        }

    }
})();

