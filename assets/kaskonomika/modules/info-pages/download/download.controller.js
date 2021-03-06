(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('downloadController', downloadController);

    downloadController.$inject = ['$scope','$interval'];

    function downloadController($scope,$interval) {
        let vm = this;

        vm.view = false; //Статус готовности отображения
        vm.phone = 1; // Начальная позиция слайдера

        vm.clearIntervalSlider = clearIntervalSlider; //Отключение слайдера при клике на стрелочки

        activate();
        /////////////////////
        function activate() {
            $scope.$on('cfpLoadingBar:completed',function(){
                vm.view = true;
            });

            phoneSlider(); //Запуск слайдера
        }

        /**
         * Запуск слайдера
         */
        function phoneSlider(){
            vm.interval = $interval(function(){
                if (vm.phone > 2) {
                    vm.phone = 0;
                }
                vm.phone++;
            },3000);
        }

        /**
         * Отключение слайдера при клике на стрелочки
         */
        function clearIntervalSlider(){
            $interval.cancel(vm.interval)
        }
        
    }
})();