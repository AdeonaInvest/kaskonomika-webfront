(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('resultPageController', resultPageController);

    resultPageController.$inject = ['$rootScope','$scope','$routeParams','$location','$http','config','$timeout'];

    function resultPageController($rootScope,$scope,$routeParams,$location,$http,config,$timeout) {
        ///////////////////
        var vm = this;
        vm.view = false; //Статус готовности отображения
        vm.routeParams = $routeParams;
        vm.executeTimer = 1000; // Duration for $http POST execute
        vm.execute = []; // Execute results array
        vm.resultList = []; // Results list


        vm.addDriver = addDriver;
        vm.removeDriver = removeDriver;
        vm.checkValidAge = checkValidAge;
        vm.checkValidExp = checkValidExp;

        activate();
        function activate() {
            $scope.$on('cfpLoadingBar:completed',function(){
                vm.view = true;
            });
            getCurrentYear(); //Get current year : YYYY
            checkRootScopeChange(); // Watch for change $rootScope.findData && vm.filter

            /**
             * Получение результатов расчетов из LocalStorage
             */
            $scope.$on('$includeContentLoaded',function(){
                if (!vm.haveResult && $rootScope.findData) { // For singleton
                    if (localStorage.getItem('findData')) {
                        $rootScope.findData = JSON.parse(localStorage.getItem('findData'));// -> All data for search
                        $rootScope.allData = JSON.parse(localStorage.getItem('allData')); // -> All data from server
                        $rootScope.findData.step = 9; // Set step for stop car-finder
                        vm.filter.drivers[0].age = $rootScope.findData.age;
                        vm.filter.drivers[0].exp = $rootScope.findData.exp;
                        vm.haveResult = true; // For singleton
                    } else {
                        vm.haveResult = false; // For singleton
                        $location.url('/'); // -> Relocate to index

                    }
                }
            });
        }
        //////////////////

        /**
         * Get current year : YYYY
         */
        function getCurrentYear() {
            var date = new Date();
            vm.currentYear = date.getFullYear();
        }

        /**
         * Watch for change $rootScope.findData && vm.filter
         */
        function checkRootScopeChange() {

            // Watch for change $rootScope.findData
            $scope.$watch('$rootScope.findData', function(){
                executeTimeout()
            },true);

            //Watch for change $rootScope.findData && vm.filter
            $scope.$watch('vm.filter', function(){
                executeTimeout()
            },true);

            // Timer for call $http POST execute
            function executeTimeout() {
                $timeout.cancel(vm.executeTimeout); // Cancel past timeout
                // Create new timeout
                vm.executeTimeout = $timeout(function(){
                    console.log('Данные в фильтре изменились', vm.filter);
                    console.log('$rootScope.findData changed', $rootScope.findData);
                    getExecute(); // Запрос на получение результатов списка страховок по заданным параметрам
                },vm.executeTimer)
            }

        }

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
            maxDriversCount: 5, // Орраничение количества водителей
            sum: 1000000
        };

        /**
         * Запрос на получение результатов списка страховок по заданным параметрам
         */
        function getExecute() {
            // If no 'stop' execute
            if (!vm.stopExecute) {
                var data = {
                    token:'',
                    mark_id: $rootScope.findData.mark.mark,
                    year: $rootScope.findData.year,
                    model_id: $rootScope.findData.model.model,
                    mark_model_id: $rootScope.findData.mod.id,
                    drivers_option_id: $rootScope.findData.driver.id,
                    sum: parseInt(vm.filter.sum),
                    promocode: '',
                    repair_glass: false,
                    repair_body: false,
                    repair_contractor: false,
                    trans_keys: false,
                    trans_taxi: false,
                    entity: false,
                    franchises_type_id: vm.filter.franchise ? '2' : null,
                    minimal_franchise_money: vm.filter.franchise ? vm.filter.franchiseSilder.min : null,
                    franchise_money: vm.filter.franchise ? vm.filter.franchiseSilder.max : null,
                    minimal_mileage: vm.filter.mileage_limit ? vm.filter.milageSlider.min : null,
                    mileage: vm.filter.mileage_limit ? vm.filter.milageSlider.max : null,
                    age: vm.filter.drivers[0].age,
                    experience_start_year: vm.filter.drivers[0].exp,
                    "drivers[1]['age']": vm.filter.drivers[1] ? vm.filter.drivers[1].age : null,
                    "drivers[1]['experience_start_year']": vm.filter.drivers[1] ? vm.filter.drivers[1].exp : null,
                    "drivers[2]['age']": vm.filter.drivers[2] ? vm.filter.drivers[2].age : null,
                    "drivers[2]['experience_start_year']": vm.filter.drivers[2] ? vm.filter.drivers[2].exp : null,
                    "drivers[3]['age']": vm.filter.drivers[3] ? vm.filter.drivers[3].age : null,
                    "drivers[3]['experience_start_year']": vm.filter.drivers[3] ? vm.filter.drivers[3].exp : null,
                    "drivers[4]['age']": vm.filter.drivers[4] ? vm.filter.drivers[4].age : null,
                    "drivers[4]['experience_start_year']": vm.filter.drivers[4] ? vm.filter.drivers[4].exp : null
                };
                $http.post(config.api + 'calculations/execute', data)
                    .then(function(response){
                        if (response.data.result) {
                            console.log('response',response);
                            vm.execute = response.data.response.outer_ids;
                            vm.resultCount = vm.execute.length; // New results counter
                            getResults(vm.execute); //Get results from executions list
                        } else {
                            console.log('REJECT -> getExecute',response)
                        }


                    })
            }
        }

        /**
         * Get results from executions list
         */
        function getResults(execute) {
            vm.resultList = [];
            execute.forEach(function(f){
                var data = {
                    token: '',
                    id: f
                };
                $http.post(config.api + 'calculations/result', data)
                    .then(function(r){
                        vm.resultCount--; // New results counter
                        if (r.data.result){
                            vm.resultList.push(r.data.response)
                        }
                    })
            });
        }


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

        /**
         * Validation age input
         * @param key - key in DRIVERS array
         */
        function checkValidAge(key) {
            if (vm.filter.drivers[key].age.length > 1) { // Only start input anything
                if (vm.filter.drivers[key].age / 2 ) { // If value is number
                    if (vm.filter.drivers[key].age < 18) {
                        vm.filter.drivers[key].age = 18;
                        vm.filter.drivers[key].exp = vm.currentYear;
                    }
                    if (vm.filter.drivers[key].age > 80) {
                        vm.filter.drivers[key].age = 80;
                    }
                } else {
                    vm.filter.drivers[key].age = 18; // Set default value
                }
                vm.stopExecute = false; // Start execute
            } else {
                vm.stopExecute = true; // Stop execute
            }
        }

        /**
         * Validation exp input
         * @param key - key in DRIVERS array
         */
        function checkValidExp(key) {
            if (vm.filter.drivers[key].exp.length > 3) { // Only start input anything
                if (vm.filter.drivers[key].exp / 2) { // If value is number
                    if (vm.filter.drivers[key].exp > vm.currentYear) {
                        vm.filter.drivers[key].exp = (vm.currentYear + 1) - vm.filter.drivers[key].age;
                    } else {
                        if (vm.filter.drivers[key].exp < ((vm.currentYear + 18) - vm.filter.drivers[key].age)) vm.filter.drivers[key].exp = (vm.currentYear + 18) - vm.filter.drivers[key].age;
                    }
                    vm.stopExecute = false; // Start execute
                } else {
                    vm.filter.drivers[key].exp = (vm.currentYear + 18) - vm.filter.drivers[key].age; // Set default value
                }
            } else {
                vm.stopExecute = true; // Stop execute
            }
        }



    }
})();