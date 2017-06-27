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
        $rootScope.allData = {
            marks: '',
            models: '',
            year: '',
            mods: '',
            drivers: '',
            old: '',
            exp: ''
        };
        $rootScope.findData = {
            is_open: false,
            step: 1
        };


        vm.getMarks = getMarks;
        vm.getYear = getYear;
        vm.getModels = getModels;
        vm.getModification = getModification;
        vm.getDrivers = getDrivers;
        vm.getAges = getAges;
        vm.getExp = getExp;
        vm.resetFinder = resetFinder;
        vm.finalStep = finalStep;
        vm.ageTitle = ageTitle;
        vm.expTitle = expTitle;
        vm.progressWidth = progressWidth;
        vm.findResults = findResults;
        vm.disableBtnResult = disableBtnResult;


        /**
         * Проверка модуля на синглтон
         */
        function checkInitFinder(){
            if (!$rootScope.carFinder) {
                $rootScope.carFinder = true;
                xlog('carFinderController-ready');
                getMarks();
                $scope.$on('cfpLoadingBar:completed',function(){
                    vm.view = true;
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
                        $rootScope.allData.marks = response.data.response;
                    }
                })
        }

        /**
         * Получение списка годов выпуска автомобилей
         */
        function getYear(mark){
            $rootScope.findData.is_open = false;
            vm.wait = true;
            $http.get('https://api.kaskonomika.ru/v1/dictionaries/marks/' + mark)
                .then(function(response){
                    if (response.data.result) {
                        $rootScope.allData.year = response.data.response;
                        $rootScope.findData.step = 2;
                        $rootScope.findData.is_open = true;
                        vm.wait = false;
                    }
                })
        }

        /**
         * Получение списка моделей автомобилей
         */
        function getModels(year){
            $rootScope.findData.is_open = false;
            vm.wait = true;
            $http.get('https://api.kaskonomika.ru/v1/dictionaries/marks/' + $rootScope.findData.mark.mark + '/' + year)
                .then(function(response){
                    if (response.data.result) {
                        $rootScope.allData.models = response.data.response;
                        $rootScope.findData.step = 3;
                        $rootScope.findData.is_open = true;
                        vm.wait = false;
                    }
                })
        }

        /**
         * Получение списка модификаций автомобилей
         */
        function getModification(model){
            $rootScope.findData.is_open = false;
            vm.wait = true;
            $http.get('https://api.kaskonomika.ru/v1/dictionaries/marks/' + $rootScope.findData.mark.mark + '/' + $rootScope.findData.year + '/' + model)
                .then(function(response){
                    if (response.data.result) {
                        $rootScope.allData.mods = response.data.response;
                        $rootScope.findData.step = 4;
                        $rootScope.findData.is_open = true;
                        vm.wait = false;
                    }
                })
        }

        /**
         * Получение списка модификаций типов водителей
         */
        function getDrivers(){
            $rootScope.findData.is_open = false;
            vm.wait = true;
            $http.get('https://api.kaskonomika.ru/v1/dictionaries/drivers/options')
                .then(function(response){
                    if (response.data.result) {
                        $rootScope.allData.drivers = response.data.response;
                        $rootScope.findData.step = 5;
                        $rootScope.findData.is_open = true;
                        vm.wait = false;
                    }
                })
        }

        /**
         * Получение списка годов рождения
         */
        function getAges(){
            $rootScope.findData.is_open = false;
            $rootScope.allData.age = [];
            for (var i = 18; i < 69; ++i) {
                $rootScope.allData.age.push(i);
            }
            $rootScope.findData.step = 6;
            $rootScope.findData.is_open = true;
        }

        /**
         * Получение списка опыта
         */
        function getExp(year){
            $rootScope.findData.is_open = false;
            $rootScope.allData.exp = [];
            var start = 2017-year+18;
            for (var i = start; i < 2017; ++i) {
                $rootScope.allData.exp.push(i);
            }
            $rootScope.findData.step = 7;
            $rootScope.findData.is_open = true;
        }

        /**
         * Финальный шаг, после которого уходим на перерасчет
         */
        function finalStep() {
            $rootScope.findData.step = 8;
            $rootScope.findData.is_open = false;
            $rootScope.findData.ready = true;
        }

        /**
         * Очистка фильтра поиска
         * @param data - Obj - что именно нужно очистить
         * @param step - Int - на какой шаг перейти после очистки
         */
        function resetFinder(data, step) {
            if (data.mark) $rootScope.findData.mark = undefined;
            if (data.year) $rootScope.findData.year = undefined;
            if (data.model) $rootScope.findData.model = undefined;
            if (data.mod) $rootScope.findData.mod = undefined;
            if (data.driver) $rootScope.findData.driver = undefined;
            if (data.age) $rootScope.findData.age = undefined;
            if (data.exp) $rootScope.findData.exp = undefined;

            console.log('vm.findData',$rootScope.findData);
            console.log('data',data);

            $rootScope.findData.step = step;
            $rootScope.findData.is_open = true;
            $rootScope.findData.ready = false;

            $rootScope.$digest; // Принудительное обновление данных фильтра
        }

        /**
         * Форматирование вывода возраста водителя
         * @param age - Int - возраст водителя
         * @returns {*} - "XX года"
         */
        function ageTitle(age) {
            if (age) {
                age = age.toString();
                var last = age.length,
                key = parseInt(age[last-1]);
                if (key == 1) {
                    return ' год';
                } else if (key == 2 || key == 3 || key == 4) {
                    return ' года';
                } else {
                    return ' лет';
                }
            }
        }

        /**
         * Форматирование стажа водителя
         * @param exp - стаж водителя - указывается год
         * @returns {string} - "с 2000 года"
         */
        function expTitle(exp) {
            if (exp) {
                return 'c' + ' ' + exp + ' года';
            }
        }

        function progressWidth(){
            if ($rootScope.findData) {
                if ($rootScope.findData.step < 5) {
                    return 0;
                } else if ($rootScope.findData.step > 4) {
                    return 33;
                }
            }
        }

        /**
         * Переход на страницу результатов
         */
        function findResults(){
            $location.url('/result');
        }

        function disableBtnResult(){
            var a = $rootScope.findData;
            console.log('a',a);
            if (a.mark!='' && a.year!='' && a.model!='' && a.mod!='' && a.driver!='' && a.age!='' && a.exp!='') return true
        }


    }
})();