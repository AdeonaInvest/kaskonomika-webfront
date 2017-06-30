(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('appController', appController);

    appController.$inject = ['$rootScope','$scope'];

    function appController($rootScope,$scope) {
        
        $rootScope.calcCount = [];
        
        activate();

        ////////////////

        function activate() {
            clearScopeCashe();
            waitContentIncludes();
        }

        /**
         * Событие очистки кеша событий
         */
        function clearScopeCashe(){
            $scope.$on("$routeChangeSuccess", function() {
                xlog('Очищаю scope cache');
                $rootScope.carFinder = false; //Обнуление данных поиска авто
                $rootScope.showCalc = false; //Обновление отображения поиска в хедере
            });
        }
        
        function waitContentIncludes() {
            $rootScope.$on('$includeContentLoaded',function(){
                $rootScope.pageLoaded = true;
            });
        }

    }

})();

