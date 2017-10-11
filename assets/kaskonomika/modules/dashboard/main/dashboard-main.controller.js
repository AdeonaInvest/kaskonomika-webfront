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
            getCarPosition(id); //Получение местонахождения авто
            getCarDocuments(id); //Получение данных по авто
            getSummaryMileage(id); //Получние данных о пробеге за последний месяц
            getMileagePerMonth(id); //Получние данных о пробеге за последний год
        }

        /**
         * Получение списка событий по авто
         */
        function getEventList(id) {
            let data = {
                token: vm.token,
                from: 0,
                to: 6
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
         * Получение данных по авто
         */
        function getCarDocuments(id) {
            $http.get(config.api + 'policies/objects/'+ id +'/documents?token=' + vm.token)
                .then(function(res){
                    if (res.data.result) {
                        vm.carDocs = {};
                        res.data.response.forEach(function(f){
                            if (f.document === 'ПТС') {
                                vm.carDocs.pts = {
                                    expiration_date: f.expiration_date || null,
                                    id: f.id,
                                    issued_date: (new Date(f.issued_date)).getTime(),
                                    number: f.number,
                                    policy_object_document_type_id: f.policy_object_document_type_id,
                                    policy_object_id: f.policy_object_id,
                                    series: f.series,
                                    value: f.value,
                                    ns: f.series + ' ' + f.number
                                }
                            } else if (f.document === 'СТС') {
                                vm.carDocs.sts = {
                                    expiration_date: f.expiration_date || null,
                                    id: f.id,
                                    issued_date: (new Date(f.issued_date)).getTime(),
                                    number: f.number,
                                    policy_object_document_type_id: f.policy_object_document_type_id,
                                    policy_object_id: f.policy_object_id,
                                    series: f.series,
                                    value: f.value,
                                    ns: f.series + ' ' + f.number
                                }
                            }
                        });
                    }
                    else {
                        xlog('MODULE : DASHBOARD : PROFILE : getContractorInfo() error!')
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
         * Получние данных о пробеге за последний год
         * @param id
         */
        function getMileagePerMonth(id) {
            let date = new Date(),
                data = {
                    token: vm.token,
                    date_from: (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + ((date.getMonth()) < 10 ? '0' + date.getMonth() : date.getMonth()) + '.' +(date.getFullYear()-1),
                    date_to: (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + ((date.getMonth()) < 10 ? '0' + date.getMonth() : date.getMonth()) + '.' + date.getFullYear(),
                    type: 'm'
                };
            $http.post(config.api + 'policies/' + id + '/mileage/',data)
                .then(function(res) {
                    if (res.data.result) {
                        let mileageChartMileagePerMonth = [],
                            mileageChartLimitPerMonth = [];
                        res.data.response.forEach(function(f){
                            mileageChartMileagePerMonth.push(f.mileage);
                            mileageChartLimitPerMonth.push(f.limit);
                        });
                        vm.mileageChartPerMonth = {
                            data: [mileageChartMileagePerMonth,mileageChartLimitPerMonth],
                            labels: [1,2,3,4,5,6,7,8,9,10,11,12],
                            series: ['Текущий пробег','Рекомендованный пробег'],
                            datasetOverride: [{ yAxisID: 'y-axis-1' }, { xAxisID: 'x-axis-1' }],
                            options: {
                                tooltip: {

                                },
                                scales: {
                                    yAxes: [
                                        {
                                            id: 'y-axis-1',
                                            type: 'linear',
                                            display: false,
                                            position: 'left'
                                        },
                                        {
                                            id: 'x-axis-1',
                                            type: 'linear',
                                            display: false,
                                            position: 'bottom'
                                        }
                                    ]
                                }
                            }
                        };
                        xlog('vm.mileageChart',vm.mileageChart)
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

        /**
         * Получние данных о пробеге за последний месяц
         */
        function getSummaryMileage(id) {
            let date = new Date(),
                data = {
                token: vm.token,
                date_from: '01.' + ((date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + '.' +date.getFullYear(),
                date_to: (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + ((date.getMonth()+1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '.' +date.getFullYear(),
                type: 'd'
            };
            $http.post(config.api + 'policies/' + id + '/mileage/',data)
                .then(function(res) {
                    if (res.data.result) {
                        let mileageChartMileage = [],
                            mileageChartLimit = [];
                        vm.arr = [];
                        res.data.response.forEach(function(f){
                            mileageChartMileage.push(f.mileage);
                            mileageChartLimit.push(f.limit);
                        });
                        for (let i = 1; i < res.data.response.length; i++) {
                            vm.arr.push(i)
                        }
                        vm.mileageChart = {
                            data: [mileageChartMileage,mileageChartLimit],
                            labels: vm.arr,
                            series: ['Текущий пробег','Рекомендованный пробег'],
                            datasetOverride: [{ yAxisID: 'y-axis-1' }, { xAxisID: 'x-axis-1' }],
                            options: {
                                tooltip: {

                                },
                                scales: {
                                    yAxes: [
                                        {
                                            id: 'y-axis-1',
                                            type: 'linear',
                                            display: false,
                                            position: 'left'
                                        },
                                        {
                                            id: 'x-axis-1',
                                            type: 'linear',
                                            display: false,
                                            position: 'bottom'
                                        }
                                    ]
                                }
                            }
                        };
                        xlog('vm.mileageChart',vm.mileageChart)
                    }
                })
        }
        
    }
})();