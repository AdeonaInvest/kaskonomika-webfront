(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('carFinderController', carFinderController);

    carFinderController.$inject = ['$rootScope','$scope','$http','$location'];

    function carFinderController($rootScope,$scope,$http,$location) {
        
        ///////////////////
        var vm = this;
        vm.view = false; //Статус готовности отображения
        
        activate();
        function activate() {
            checkInitFinder(); //Проверка модуля на синглтон
        }
        //////////////////


        vm.getMarks = getMarks;
        vm.getYear = getYear;
        vm.getModels = getModels;
        vm.getModification = getModification;
        vm.getDrivers = getDrivers;
        vm.getAges = getAges;
        vm.getExp = getExp;
        vm.resetFinder = resetFinder;
        vm.finalStep = finalStep;
        
        vm.findResults = findResults;


        /**
         * Проверка модуля на синглтон
         */
        function checkInitFinder(){
            if (!$rootScope.carFinder) {
                vm.allData = {
                    marks: '',
                    models: '',
                    year: '',
                    mods: '',
                    drivers: '',
                    old: '',
                    exp: ''
                };
                vm.findData = {
                    is_open: false,
                    step: 1
                };
                $rootScope.carFinder = true;
                xlog('carFinderController-ready');
                getMarks();
                $scope.$on('cfpLoadingBar:completed',function(){
                    vm.view = true;
                    xlog('vm.allData',vm.allData)
                    xlog('vm.findData',vm.findData)
                });
            }
        }

        /**
         * Получение списка марок автомобилей
         */
        function getMarks(){
            $http.get('https://api.kaskonomika.ru/v1/dictionaries/marks')
                .then(function(response){
                    if (response.data.result) {
                        vm.allData.marks = response.data.response;
                    }
                })
        }

        /**
         * Получение списка годов выпуска автомобилей
         */
        function getYear(mark){
            vm.findData.is_open = false;
            $http.get('https://api.kaskonomika.ru/v1/dictionaries/marks/' + mark)
                .then(function(response){
                    if (response.data.result) {
                        vm.findData.step = 2;
                        vm.findData.is_open = true;
                        vm.allData.year = response.data.response;
                    }
                })
        }

        /**
         * Получение списка моделей автомобилей
         */
        function getModels(year){
            vm.findData.is_open = false;
            $http.get('https://api.kaskonomika.ru/v1/dictionaries/marks/' + vm.findData.mark.mark + '/' + year)
                .then(function(response){
                    if (response.data.result) {
                        vm.findData.step = 3;
                        vm.findData.is_open = true;
                        vm.allData.models = response.data.response;
                    }
                })
        }

        /**
         * Получение списка модификаций автомобилей
         */
        function getModification(model){
            vm.findData.is_open = false;
            $http.get('https://api.kaskonomika.ru/v1/dictionaries/marks/' + vm.findData.mark.mark + '/' + vm.findData.year + '/' + model)
                .then(function(response){
                    if (response.data.result) {
                        vm.findData.step = 4;
                        vm.findData.is_open = true;
                        vm.allData.mods = response.data.response;
                    }
                })
        }

        /**
         * Получение списка модификаций типов водителей
         */
        function getDrivers(){
            vm.findData.is_open = false;
            $http.get('https://api.kaskonomika.ru/v1/dictionaries/drivers/options')
                .then(function(response){
                    if (response.data.result) {
                        vm.findData.step = 5;
                        vm.findData.is_open = true;
                        vm.allData.drivers = response.data.response;
                    }
                })
        }

        /**
         * Получение списка годов рождения
         */
        function getAges(){
            vm.findData.is_open = false;
            vm.allData.age = [];
            for (var i = 18; i < 69; ++i) {
                vm.allData.age.push(i);
            }
            vm.findData.step = 6;
            vm.findData.is_open = true;
        }

        /**
         * Получение списка опыта
         */
        function getExp(year){
            vm.findData.is_open = false;
            vm.allData.exp = [];
            var start = 2017-year+18;
            for (var i = start; i < 2017; ++i) {
                vm.allData.exp.push(i);
            }
            vm.findData.step = 7;
            vm.findData.is_open = true;
        }
        
        function finalStep() {
            vm.findData.is_open = false;
        }

        function resetFinder(data, step) {
            if (data.mark) vm.findData.mark = undefined;
            if (data.year) vm.findData.year = undefined;
            if (data.model) vm.findData.model = undefined;
            if (data.mods) vm.findData.mods = undefined;
            if (data.driver) vm.findData.driver = undefined;
            if (data.age) vm.findData.age = undefined;
            if (data.exp) vm.findData.exp = undefined;

            console.log('vm.findData',vm.findData);
            console.log('data',data);
            
            vm.findData.step = step;
            vm.findData.is_open = true
        }


        /**
         * Переход на страницу результатов
         */
        function findResults(){
            $location.url('/result');
        }


    }
})();