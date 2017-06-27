(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('appController', appController);

    appController.$inject = ['$rootScope','$scope'];

    function appController($rootScope,$scope) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            clearScopeCashe();
        }

        /**
         * Событие очистки кеша событий
         */
        function clearScopeCashe(){
            $scope.$on("$routeChangeSuccess", function() {
                xlog('Очищаю scope cache');
                $rootScope.carFinder = false;
            });
        }

    }

})();

