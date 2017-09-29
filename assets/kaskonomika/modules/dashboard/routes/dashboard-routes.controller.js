(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('dashboardRoutesController', dashboardRoutesController);

    dashboardRoutesController.$inject = ['$rootScope','$http','config'];

    function dashboardRoutesController($rootScope,$http,config) {
        let vm = this;

        vm.carsList = [];


        vm.setCurrentMonth = setCurrentMonth;

        activate();
        ///////////////////
        function activate() {
            getLocalData();
            setLastThreeMounth();
        }

        /**
         * Получение данных о token'е из localStorage
         */
        function getLocalData() {
            vm.token = localStorage.getItem('currentToken');
            getVehicles(); //Получение списка авто с оформленными полисами
        }

        /**
         * Получение списка авто с оформленными полисами
         */
        function getVehicles() {
            $http.get(config.api + 'policies/vehicles?token=' + vm.token)
                .then(function(res){
                    if (res.data.result) {
                        res.data.response.forEach(function(f){
                            if (f.policies.length > 0 && f.contract_id !== '' && f.contract_id !== undefined && f.contract_id !== null) {
                                vm.carsList.push(f);
                            }
                            if (vm.carsList.length > 0) {
                                vm.carsList[0].active = true;
                            } else {
                                //TODO Пустой список машин, нечего отображать. Вывести сценарий добавления машины
                                vm.carsListIsEmpty = true;
                            }
                        })
                    }
                })
        }

        /**
         * получение полного списка поездок
         */
        function getTrips(month) {
            /*let data = {
                token: vm.token,
                offset: 0,
                limit: 10,
                object_id: 21, //vm.carsList car ID
                time_start: 1504213200,
                time_end: 1506805199
            };
            $http.post(config.api + 'telematic/meta/get_trips', data)
                .then(function(res){

                })*/
            xlog('поездки', month)

        }

        function setLastThreeMounth() {
            vm.date = new Date(); //Получение текущей даты

            vm.currentMonth = (vm.date.getMonth() + 1) < 10 ? '0' + (vm.date.getMonth() + 1) : vm.date.getMonth() + 1; //Установка текущего месяца
            getTrips(vm.currentMonth); //Получение поездок по текущему месяцу

            //Кнопки для выбора ближайших месяцев
            vm.smallCalendar = [month(1),month(0),month(-1)];

            /**
             * Конструктор месяцев для кнопочек
             * @param index - порядковый месяц со смещением от текущего (+1)
             * @returns {string} - номер месяца по календарю (09, 08, 07...)
             */
            function month(index) {
                return (vm.date.getMonth() + index) < 10 ? '0' + (vm.date.getMonth() + index) : vm.date.getMonth() + index
            }

            vm.textStartDate = vm.date.getFullYear() + '-' + ((vm.date.getMonth() + 1) < 10 ? '0' + (vm.date.getMonth() + 1) : vm.date.getMonth() + 1) + '-' + '01';
            vm.textEndDate = vm.date.getFullYear() + '-' + ((vm.date.getMonth() + 1) < 10 ? '0' + (vm.date.getMonth() + 1) : vm.date.getMonth() + 1) + '-' + (vm.date.getDate() < 10 ? '0' + vm.date.getDate() : vm.date.getDate());
            vm.startDate = (new Date(vm.textStartDate)).getTime();
            vm.endDate = (new Date(vm.textEndDate)).getTime();
        }

        /**
         * Смена текущего месяца
         * @param month
         */
        function setCurrentMonth(month) {
            vm.currentMonth = month;
            getTrips(month);
        }
        
    }
})();