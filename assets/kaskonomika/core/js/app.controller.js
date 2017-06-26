(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('appController', appController);

    appController.$inject = ['$rootScope'];

    function appController($rootScope) {
        var vm = this;
        $rootScope.carFinder = false;

        activate();

        ////////////////

        function activate() {
            
        }

    }

})();

