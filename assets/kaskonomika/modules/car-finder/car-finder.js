(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('carFinderController', carFinderController);

    carFinderController.$inject = ['$rootScope','$scope','$http','$location','$timeout','config','$route',];

    function carFinderController($rootScope,$scope,$http,$location,$timeout,config,$route) {

        ///////////////////
        let vm = this;
        vm.view = false; //Статус готовности отображения

        $rootScope.allData = {
            marks: '',
            models: '',
            year: '',
            bodyType: '',
            gear: '',
            mods: '',
            drivers: '',
            old: '',
            exp: ''
        };

        $rootScope.findData = {
            step: 1
        };


        $rootScope.$watch('pageLoaded',function(){
            if ($rootScope.pageLoaded) {
                activate();
            }
        });

        function activate() {
            checkInitFinder(); //Проверка модуля на синглтон
        }
        //////////////////


        vm.getMarks = getMarks;
        vm.getYear = getYear;
        vm.getModels = getModels;
        vm.getBodyTypes = getBodyTypes;
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
        vm.goBackToResults = goBackToResults;
        vm.getGearBox = getGearBox;
        vm.getModification = getModification;


        /**
         * Проверка модуля на синглтон
         */
        function checkInitFinder(){
            if (!$rootScope.carFinder) {
                $rootScope.carFinder = true;
                xlog('MODULE : CAR-FINDER -> Initialisation complete');
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
            $http.get(config.api + 'dictionaries/marks')
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
            $http.get(config.api + 'dictionaries/marks/' + mark)
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
        function getModels(year) {
            $rootScope.findData.is_open = false;
            vm.wait = true;
            $http.get(config.api + 'dictionaries/marks/' + $rootScope.findData.mark.mark + '/' + year)
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
        function getBodyTypes(model){
            $rootScope.findData.is_open = false;
            vm.wait = true;
            $http.get(config.api + 'dictionaries/marks2/' + $rootScope.findData.mark.mark + '/' + $rootScope.findData.year + '/' + model) //2
                .then(function(response){
                    if (response.data.result) {
                        $rootScope.allData.bodyType = response.data.response;
                        if ($rootScope.allData.bodyType.length === 1) {
                            $rootScope.findData.bodyType = $rootScope.allData.bodyType[0];
                            getGearBox();
                        } else {
                            $rootScope.findData.step = 4;
                            $rootScope.findData.is_open = true;
                        }
                        vm.wait = false;
                    }
                })
        }

        /**
         * Получение списка КПП
         */
        function getGearBox(){
            $rootScope.findData.is_open = false;
            vm.wait = true;
            $http.get(config.api + 'dictionaries/marks2/' + $rootScope.findData.mark.mark + '/' + $rootScope.findData.year + '/' + $rootScope.findData.model.model + '/' + $rootScope.findData.bodyType.id) //2
                .then(function(response){
                    if (response.data.result) {
                        $rootScope.allData.gear = response.data.response;
                        if ($rootScope.allData.gear.length === 1) {
                            $rootScope.findData.gear = $rootScope.allData.gear[0];
                            getModification();
                        } else {
                            $rootScope.findData.step = 5;
                            $rootScope.findData.is_open = true;
                        }
                        vm.wait = false;
                    }
                })
        }

        /**
         * Получение списка модификаций автомобилей
         */
        function getModification(){
            $rootScope.findData.is_open = false;
            vm.wait = true;
            $http.get(config.api + 'dictionaries/marks2/' + $rootScope.findData.mark.mark + '/' + $rootScope.findData.year + '/' + $rootScope.findData.model.model + '/' + $rootScope.findData.bodyType.id + '/' + $rootScope.findData.gear.id) //2
                .then(function(response){
                    if (response.data.result) {
                        $rootScope.allData.mod = response.data.response;
                        $rootScope.findData.step = 6;
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
            $http.get(config.api + 'dictionaries/drivers/options')
                .then(function(response){
                    if (response.data.result) {
                        $rootScope.allData.drivers = response.data.response;
                        $rootScope.findData.step = 7;
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
            $timeout(function(){
                $rootScope.allData.age = [];
                for (let i = 18; i < 69; ++i) {
                    $rootScope.allData.age.push(i);
                }
                $rootScope.findData.step = 8;
                $rootScope.findData.is_open = true;
            })

        }

        /**
         * Получение списка опыта
         */
        function getExp(year){
            $rootScope.findData.is_open = false;
            $timeout(function(){
                $rootScope.allData.exp = [];
                let start = 2017-year+17;
                for (let i = start; i <= 2017; ++i) {
                    $rootScope.allData.exp.push(i);
                }
                $rootScope.findData.step = 9;
                $rootScope.findData.is_open = true;
            })

        }

        /**
         * Финальный шаг, после которого уходим на перерасчет
         */
        function finalStep() {
            $rootScope.findData.step = 10;
            $rootScope.findData.is_open = false;
            $rootScope.findData.ready = true;
            findResults();
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
            if (data.bodyType) $rootScope.findData.bodyType = undefined;
            if (data.gear) $rootScope.findData.gear = undefined;
            if (data.driver) $rootScope.findData.driver = undefined;
            if (data.age) $rootScope.findData.age = undefined;
            if (data.exp) $rootScope.findData.exp = undefined;

            $rootScope.findData.step = step;
            $rootScope.findData.is_open = true;
            $rootScope.findData.ready = false;
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

        /**
         * Ширина прогресс-бара
         * @returns {number}
         */
        function progressWidth(){
            if ($rootScope.findData) {
                if ($rootScope.findData.step < 7) {
                    return 0;
                } else if ($rootScope.findData.step >= 7 && $rootScope.findData.step < 10) {
                    return 33;
                } else if ($rootScope.findData.step > 9 && $rootScope.findData.step < 11) {
                    return 66;
                } else if ($rootScope.findData.step > 11) {
                    return 100;
                }
            }
        }

        /**
         * Переход на страницу результатов
         */
        function findResults(){
            localStorage.setItem('findData', JSON.stringify($rootScope.findData));
            localStorage.setItem('allData', JSON.stringify($rootScope.allData));
            if ($location.path() === '/result-page') {
                $route.reload();
            } else {
                $location.path('/result-page');
            }

        }

        /**
         * Обновление данных калькулятора
         * @returns {boolean}
         */
        function disableBtnResult(){
            let a = $rootScope.findData;
            if (a.mark!='' && a.bodyType!='' && a.gear!='' && a.year!='' && a.model!='' && a.mod!='' && a.driver!='' && a.age!='' && a.exp!='') return true
        }

        /**
         * Comeback to results page
         */
        function goBackToResults() {
            $location.path('/result-page')
        }
    }
})();