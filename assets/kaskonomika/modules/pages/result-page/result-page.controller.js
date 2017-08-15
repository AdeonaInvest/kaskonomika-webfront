(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('resultPageController', resultPageController);

    resultPageController.$inject = ['$rootScope','$scope','$routeParams'];

    function resultPageController($rootScope,$scope,$routeParams) {
        ///////////////////
        var vm = this;
        vm.view = false; //Статус готовности отображения
        vm.routeParams = $routeParams;

        vm.addDriver = addDriver;
        vm.removeDriver = removeDriver;
        
        activate();
        function activate() {
            $scope.$on('cfpLoadingBar:completed',function(){
                vm.view = true;
            });
        }
        //////////////////

        $scope.$on('$includeContentLoaded',function(){
            if ($rootScope.findData) {
                if (localStorage.getItem('findData')) {
                    var data = localStorage.getItem('findData'),
                        all = localStorage.getItem('allData');
                    $rootScope.findData = JSON.parse(data);
                    $rootScope.allData = JSON.parse(all);
                    $rootScope.findData.step = 9;
                }
            }
        });

        /**
         * Хранение всех данных по фильтрам, поискам и со всеми параметрами
         */
        vm.filter = {
            franchiseSilder: {
                min: 100,
                max: 50000,
                options: {
                    floor: 0,
                    ceil: 200000,
                    step: 5000
                }
            }, // Слайдер для франшизы
            milageSlider: {
                min: 0,
                max: 10000,
                options: {
                    floor: 0,
                    ceil: 30000,
                    step: 500
                }
            }, // сладйер для пограничения пробега
            drivers: [
                {
                    age: '',
                    exp: ''
                }
            ], // Массив водителей
            maxDriversCount: 5 // Орраничение количества водителей
        };


        /**
         * Добавление водителя в список допущенных для вождения
         */
        function addDriver() {
            if (vm.filter.drivers.length < vm.filter.maxDriversCount) {
                // Анимирование нажатия кнопки "добавить водителя"
                if (!vm.addDriverClicked) {
                    vm.addDriverClicked = true;
                    setTimeout(function(){
                        vm.addDriverClicked = false;
                        $scope.$digest();
                    },1000)
                }
                // добавление пустого водителя в массив
                vm.filter.drivers.push({age:'',exp:''});
            }
        }

        /**
         * Удаление водителя из списка допущенных из vm.filter.drivers
         * @param key - порядковый номер водителя в vm.filter.drivers
         */
        function removeDriver(key) {
            vm.filter.drivers.splice(key,1);
        }



    }
})();