(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('dashboardMainController', dashboardMainController);

    dashboardMainController.$inject = ['$rootScope','$location','NgMap','$http','config'];

    function dashboardMainController($rootScope,$location,NgMap,$http,config) {
        let vm = this;
        vm.carsList = []; // Список табов с авто
        vm.eventsList = []; //Список событий по авто
        vm.mileageOneDay = 0; //Текущий пробег за сегодня
        vm.mileageRangedLimit = {}; //Общий пробег за период страхования
        vm.policyDate = '--'; //Срок действия текущего договора

        vm.dashboard = {
            scoring: 20, // Scoring data
            milage: {
                val: 3245, // Milage distance
                raw: 70 // Milage percent
            }  
        };

        vm.setActiveTab = setActiveTab;
        vm.setParking = setParking;


        activate();
        ///////////////////
        function activate() {
            checkUser(); //Проверка залогенного пользователя
        }

        /**
         * Проверка залогенного пользователя
         */
        function checkUser() {
            vm.user = localStorage.getItem('currentUser');
            vm.token = localStorage.getItem('currentToken');
            if (!vm.user || !vm.token) {
                $location.path('/')
            } else {
                getVehicles(); //Получение списка авто с оформленными полисами
            }
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
                        });
                        if (vm.carsList.length > 0) {
                            setActiveTab(vm.carsList[0].id, 0);
                            xlog('MODULE : DASHBOARD : MAIN : CarsList ->',vm.carsList)
                        } else {
                            //TODO Пустой список машин, нечего отображать. Вывести сценарий добавления машины
                            vm.carsListIsEmpty = true;
                            xlog('MODULE : DASHBOARD : MAIN : CarsListEmpty')
                        }
                    }
                })
        }

        /**
         * Клик по табам. Выбор активной машины
         * @param id
         * @param key
         */
        function setActiveTab(id, key){
            vm.activeCarTab = id;
            vm.policyDate = vm.carsList[key];
            getEventList(id); //Получение списка событий по авто
            getMileageOneDay(id); //Получение пробега за сегодня
            getMileageRangedLimit(id); //Получение текущего и оставшегося пробега
            getParkingStatus(id); //Получение данных о паркинге. Включен ли он
            getTotalScoring(id); //Получение оценки скоринга за поездки
            getCarPosition(id) //Получение местонахождения авто
        }

        /**
         * Получение списка событий по авто
         */
        function getEventList(id) {
            let data = {
                token: vm.token,
                from: 0,
                to: 4
            };
            $http.post(config.api + 'communications/events/list',data)
                .then(function(res){
                    if (res.data.result && res.data.response.length > 0) {
                        res.data.response.forEach(function (f) {
                            if (f.object_id === id) {
                                f.date = (new Date(f.create_date)).getTime();
                                vm.eventsList.push(f)
                            }
                        });
                    }
                })
        }

        /**
         * Получение пробега за сегодня
         * @param id - id авто из getVehicles
         */
        function getMileageOneDay(id) {
            let data = {
                token: vm.token
            };
            $http.post(config.api + 'policies/' + id +'/get_mileage_one_day/',data)
                .then(function(res){
                    if (res.data.result) {
                        vm.mileageOneDay = res.data.response;
                    }
                })
        }

        /**
         * Получение текущего и оставшегося пробега
         * @param id - id авто из getVehicles
         */
        function getMileageRangedLimit(id) {
            let data = {
                token: vm.token
            };
            $http.post(config.api + 'policies/' + id +'/mileage_ranged_limit/',data)
                .then(function(res){
                    if (res.data.result) {
                        vm.mileageRangedLimit = {
                            val: (res.data.response.limit - res.data.response.mileage) >= 0 ? res.data.response.limit - res.data.response.mileage : 0,
                            limit: Math.round(parseInt(res.data.response.limit)),
                            mileage: Math.round(parseInt(res.data.response.mileage)),
                            percent: (100 / res.data.response.limit * res.data.response.mileage) < 100 ? 100 / res.data.response.limit * res.data.response.mileage : 100
                        };
                    }
                })
        }

        /**
         * Получение данных о паркинге. Включен ли он
         */
        function getParkingStatus(id) {
            let data = {
                token: vm.token
            };
            $http.post(config.api + 'policies/' + id +'/get_parking/',data)
                .then(function(res){
                    if (res.data.result) {
                        vm.parkingStatus = res.data.response;
                        vm.parkingPostWait = false;
                    }
                })
        }

        /**
         * Получение оценки скоринга за поездки
         */
        function getTotalScoring(id) {
            let data = {
                token: vm.token
            };
            $http.post(config.api + 'policies/' + id +'/get_total_scoring/',data)
                .then(function(res){
                    if (res.data.result) {
                        vm.totalScoring = res.data.response;
                    }
                })
        }

        /**
         * Получение местонахождения авто
         * @param id - id авто из getVehicles
         */
        function getCarPosition(id) {
            let data = {
                token: vm.token,
                object_id: id
            };
            $http.post(config.api + 'telematic/meta/get_route',data)
                .then(function(res){
                    if (res.data.result) {
                        vm.carPosition = {
                            lat: parseInt(res.data.response.lat),
                            lon: parseInt(res.data.response.lon),
                            time: res.data.response.gps_time
                        };
                        //------------------- Декодирование адреса местоположения авто ---------------------//
                        let geocoder = new google.maps.Geocoder(),
                            latlng = {
                                lat: parseInt(res.data.response.lat),
                                lng: parseInt(res.data.response.lon)
                            };
                        geocoder.geocode({'location': latlng}, function(results, status) {
                            if (status == 'OK') {
                                vm.carAddress = results[0].formatted_address;
                                xlog('MODULE : DASHBOARD : MAIN : Car address ->',results[0])
                            }
                        });
                    }
                })
        }

        /**
         * Изменение статуса парковки авто
         * @param mode
         */
        function setParking(mode) {
            vm.parkingPostWait = true;
            let data = {
                token: vm.token,
                mode: mode
            };
            $http.post(config.api + 'policies/'+ vm.activeCarTab + '/set_parking/',data)
                .then(function(res){
                    if (res.data.result) {
                        getParkingStatus(vm.activeCarTab);
                    }
                })
        }
        
    }
})();