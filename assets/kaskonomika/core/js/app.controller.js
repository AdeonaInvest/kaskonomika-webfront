(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('appController', appController);

    appController.$inject = ['$rootScope','$scope','$location'];

    function appController($rootScope,$scope,$location) {
        
        $rootScope.calcCount = [];

        activate();

        ////////////////

        function activate() {
            clearScopeCaсhe();
            waitContentIncludes(); // Wait downloading content
        }

        /**
         * Событие очистки кеша событий
         */
        function clearScopeCaсhe(){
            $scope.$on("$routeChangeSuccess", function() {
                $rootScope.carFinder = false; // Обнуление данных поиска авто
                $rootScope.showCalc = false; // Обновление отображения поиска в хедере
                $rootScope.currentUrl = $location.path(); // Create note for current URL
                xlog('APP : CLEAR_SCOPE_DATA -> Scope data is cleared');
            });
        }

        /**
         * Wait downloading content
         */
        function waitContentIncludes() {
            $rootScope.$on('$includeContentLoaded',function(){
                $rootScope.pageLoaded = true;
            });
        }

    }

})();

