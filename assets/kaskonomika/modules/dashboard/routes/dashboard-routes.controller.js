(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('dashboardRoutesController', dashboardRoutesController);

    dashboardRoutesController.$inject = ['$rootScope','$http','config','NgMap'];

    function dashboardRoutesController($rootScope,$http,config,NgMap) {
        let vm = this;

        vm.carsList = [];


        vm.setCurrentMonth = setCurrentMonth; //Смена текущего месяца
        vm.getTripTrack = getTripTrack; //Получение детальных данных о поездке. Координаты, события и т.п.
        vm.setInvisibilityMap = setInvisibilityMap; //Скрытие уже открытых вкладок

        activate();
        ///////////////////
        function activate() {
            getLocalData();
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
                        });
                        setLastThreeMounth();
                    }
                })
        }

        /**
         * Получение последних трех месяцев для переключателей
         */
        function setLastThreeMounth() {
            vm.date = new Date(); //Получение текущей даты

            vm.currentMonth = (vm.date.getMonth() + 1) < 10 ? '0' + (vm.date.getMonth() + 1) : (vm.date.getMonth() + 1)+''; //Установка текущего месяца

            //Кнопки для выбора ближайших месяцев
            vm.smallCalendar = [month(1),month(0),month(-1)];

            getTrips(getStartAndEndTime(month(1)).start, getStartAndEndTime(month(1)).end, vm.carsList[0].id); //Получение поездок по текущему месяцу
        }

        /**
         * Полуничение datetime по любому месяцу
         * @param month - порядковый месяц по календарю
         * @returns {{start: number, end: number}} - объект с началом и концом для расчетов
         */
        function getStartAndEndTime(month) {
            let date = new Date();

            date.setMonth(month);

            let start = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + '-' + '01',
            end = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + '-' + '31';

            return {
                start: (new Date(start)).getTime(),
                end: (new Date(end)).getTime()
            }
        }

        /**
         * Конструктор месяцев для кнопочек
         * @param index - порядковый месяц со смещением от текущего (+1)
         * @returns {string} - номер месяца по календарю (09, 08, 07...)
         */
        function month(index) {
            let date = new Date();
            return (date.getMonth() + index) < 10 ? '0' + (date.getMonth() + index) : (date.getMonth() + index) + ''
        }

        /**
         * получение полного списка поездок
         */
        function getTrips(startDate, endDate, carId) {
            vm.waiter = true;
            vm.tripsError = undefined;
            vm.routesMeta = {
                days: [],
                perDay: [],
                allMileage: 0
            };
            let data = {
                token: vm.token,
                offset: '0',
                limit: '1000',
                object_id: carId, //vm.carsList car ID
                time_start: (startDate / 1000).toString(),
                time_end: (endDate / 1000).toString()
            };
            $http.post(config.api + 'telematic/meta/get_trips', data)
                .then(function(res){
                    if (res.data.result) {
                        vm.routesData = res.data.response;
                        if (vm.routesData.length !== 0) {
                            vm.routesData.forEach(function(f){
                                let date = new Date(f.start_date),
                                    start_day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

                                if (vm.routesMeta.days.indexOf(start_day) === -1) {
                                    vm.routesMeta.days.push(start_day);
                                }

                                if (!vm.routesMeta.perDay[start_day]) {
                                    vm.routesMeta.perDay[start_day] = {};
                                }
                                if (!vm.routesMeta.perDay[start_day].array) {
                                    vm.routesMeta.perDay[start_day] = {array: []};
                                }
                                vm.routesMeta.perDay[start_day].array.push(f);
                                vm.routesMeta.allMileage = vm.routesMeta.allMileage + f.mileage;
                            });
                            vm.routesMeta.perDay.forEach(function(a){
                                a.mileage = 0;
                                a.array.forEach(function(m){
                                    a.mileage = a.mileage + m.mileage;
                                })
                            });
                            xlog('vm.routesMeta',vm.routesMeta)
                        } else {
                            vm.tripsError = {
                                status: true,
                                text: 'Данных о поездках за выбранный месяц не найдено.'
                            };
                        }
                        vm.waiter = false;
                        xlog('trips', res.data);
                    } else {
                        vm.tripsError = {
                            status: true,
                            text: 'Данные телематики временно недоступны. Приносим извинения за временные неудобства.'
                        };
                        vm.waiter = false;
                        xlog('trips-ERROR');
                    }
                })
        }

        /**
         * Получение детальных данных о поездке. Координаты, события и т.п.
         * @param trip - объект поездки vm.routesMeta.perDay[day]
         */
        function getTripTrack(trip) {
            vm.routesPath = [];
            vm.routesEvents = [];
            xlog('trip',trip);
            if (!trip.active && !trip.waiterMap) {
                trip.waiterMap = true;
                let data = {
                    token: vm.token,
                    object_id: vm.carsList[0].id,
                    start_time: trip.start_date,
                    finish_time: trip.stop_date
                };
                $http.post(config.api + 'telematic/meta/trip_track', data)
                    .then(function(res){
                        trip.active = true;
                        trip.routes = true;
                        res.data.response.tracker.p.forEach(function(f){
                            let data = {
                                lat: parseFloat(f.pt.gps.lat),
                                lon: parseFloat(f.pt.gps.lon)
                            };
                            vm.routesPath.push([data.lat, data.lon]);
                        });
                        trip.trip_events.forEach(function(f){
                            let data = {
                                lat: parseFloat(f.lat),
                                lon: parseFloat(f.lon),
                                event: f.name
                            };
                            vm.routesEvents.push(data);
                        });

                        trip.waiterMap = false;
                    })
            } else if(!trip.active && trip.waiterMap){
                trip.routes = null;
            } else if (trip.active && !trip.waiterMap){
                trip.routes = null;
                trip.waiterMap = false;
                trip.active = false;
            }
        }

        /**
         * Скрытие уже открытых вкладок
         * @param array - все поездки за выбранный период
         */
        function setInvisibilityMap(array) {
            for (let i in array) {
                array[i].array.forEach(function(a){
                    a.routes = false;
                    a.active = false;
                })
            }
        }

        /**
         * Смена текущего месяца
         * @param month
         */
        function setCurrentMonth(month) {
            vm.currentMonth = month;
            getTrips(getStartAndEndTime(month).start, getStartAndEndTime(month).end, vm.carsList[0].id); //Получение поездок по текущему месяцу
        }
        
    }
})();