(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('fillingInsuranceController', fillingInsuranceController);

    fillingInsuranceController.$inject = ['$rootScope','$scope','$http','$location'];

    function fillingInsuranceController($rootScope,$scope,$http,$location) {
        ///////////////////
        var vm = this;
        vm.view = false; //Статус готовности отображения
        vm.fill = {
            avto: {}
        };

        vm.nextStep = nextStep;
        vm.submitResults = submitResults;
        
        activate();
        function activate() {
            $scope.$on('cfpLoadingBar:completed',function(){
                vm.view = true;
                vm.fill.step = 1;
                getFindData();
            });
        }


        //////////////////

        /**
         * Get findData from localStorage
         */
        function getFindData() {
            $rootScope.findData = JSON.parse(localStorage.getItem('findData'));// -> All data for search
            if ($rootScope.findData) {
                $rootScope.findData.step = 11; // Установка дефолтного шага.
                xlog('findData',$rootScope.findData);
            } else {
                $location.path('/')
            }
        }

        /**
         * Go to the next step in filling
         */
        function nextStep() {
            vm.fill.step++
        }

        /**
         * Post results for create policy
         */
        function submitResults() {
            
        }
        
    }
})();