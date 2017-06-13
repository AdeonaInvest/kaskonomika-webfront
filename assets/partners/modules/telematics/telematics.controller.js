/**
 * Created by Ravy on 22.03.2017.
 */
(function () {
    'use strict';

    angular.module('partners')
        .controller('pageTelematicsController', pageTelematicsController);

    pageTelematicsController.$inject = ['$rootScope','$http','config','$filter'];

    function pageTelematicsController($rootScope,$http,config, $filter) {
        var vm = this;
        var api = config.api;
        vm.telemathicList = false;
        vm.token = localStorage.getItem('token');
        vm.cars = [];
        vm.tabIndex = 0;
        vm.eventsList = [];
        vm.eventListToShow = [];

        vm.currentMonth = null;

        vm.monthCalendar = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
        vm.series = ['Пробег'];
        vm.eventsTabs = [
            {
                title: 'Апрель',
                num: 4
            },
            {
                title: 'Май',
                num: 5
            },
            {
                title: 'Июнь',
                num: 6
            }
        ];

        vm.data = [
            [65, 59, 80, 81, 56, 55, 40,75,30,98,47,64]
        ];

        vm.currentYear = 17;

        vm.getNewResult = getNewResult;
        vm.showEventList = showEventList;
        vm.showMoreinfo = showMoreinfo;

        vm.currentMap = undefined;

        activate();
        /////////////////////
        function activate() {
            getCarsWithDevices();

        }

        function getNewResult(carId) {
            vm.sampleCars.forEach(function(f){
                if (f.object_id == carId) {
                    getScoringByCar(f);
                    getMileage(f);
                    getTrips(f);
                }
            })
        }

        /**
         * Получение списка данных по машинам
         */
        function getCarsWithDevices() {
            if (vm.token) {
                $http.get(api+'/telematic/cars_with_devices?token='+vm.token)
                    .then(function(response){
                        if (response.data.result) {
                            vm.sampleCars = response.data.response;
                            vm.sampleCars.forEach(function(f){
                                var a = {
                                    title: f.mark + ' ' + f.model,
                                    contract_id: f.contract_id,
                                    object_id: f.object_id
                                };
                                vm.cars.push(a)
                            });
                            getNewResult(vm.sampleCars[0].object_id)
                        }
                    })
            }
        }

        /**
         * Получение данных скоринга по машине
         * @param carData
         */
        function getScoringByCar(carData) {
            var data = {
                token: vm.token,
                carId: carData.object_id,
                policyId: carData.policy_id,
                contractId: carData.contract_id,
                periodType: 'CONTRACT'
            };
            $http.post(api + '/telematic/citymaster/scoring/get', data)
                .then(function(response){
                    if (response.data.response.response) {
                        response.data.response.response.forEach(function(f){
                            if (f.param === null) {
                                vm.dashboardData = f;
                            }
                        });
                        xlog('vm.dashboardData',vm.dashboardData)
                    }
                })
        }

        // Data for charts
        function getMileage(carData) {
            // Begin date
            var newBeginYearMounth = carData.begin_date.split('-');
            var newBeginData = newBeginYearMounth[2].split(' ')[0];

            // End date
            var newEndYearMounth = carData.end_date.split('-');
            var newEndData = newBeginYearMounth[2].split(' ')[0];

            // Get Data per days by mounth
            var dataMounth = {
                token: vm.token,
                dateBegin: newBeginData+'.'+newBeginYearMounth[1]+'.'+newBeginYearMounth[0],
                dateEnd: newEndData+'.'+newEndYearMounth[1]+'.'+newEndYearMounth[0],
                contractId: carData.contract_id,
                carId: carData.object_id,
                dmy: 'D'
            };
            $http.post(api + '/telematic/citymaster/mileage/get',dataMounth)
                .then(function(response){
                    if (response.data.result) {
                        vm.newMounthcalendarLabels = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''];
                        vm.newMounthcalendar = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
                        var maxYear = 1 , maxMounth = 1;
                        if (response.data.response.response) {
                            response.data.response.response.forEach(function(f){
                                var date = f.date.split(' ');
                                var items = date[0].split('.');
                                if (parseInt(items[2]) > maxYear) {
                                    maxYear = items[2];
                                }
                                if (parseInt(items[2]) == maxYear && parseInt(items[1]) > maxMounth) {
                                    maxMounth = items[1];
                                }
                            });
                            response.data.response.response.forEach(function(f,i){
                                var date = f.date.split(' ');
                                var items = date[0].split('.');
                                if (items[1] == maxMounth) {
                                    var day = parseInt(items[0]);
                                    vm.newMounthcalendar[0][parseInt(items[0])-1] = f.value;
                                    if (f.value != 0 || f.value != '0') {
                                        vm.newMounthcalendarLabels[day-1] = parseInt(items[0]);
                                    }
                                }
                            });
                        }
                    }
                });

            // Get Data per mounth by yaer
            var dataYear = {
                token: vm.token,
                dateBegin: newBeginData+'.'+newBeginYearMounth[1]+'.'+newBeginYearMounth[0],
                dateEnd: newEndData+'.'+newEndYearMounth[1]+'.'+newEndYearMounth[0],
                contractId: carData.contract_id,
                carId: carData.object_id,
                dmy: 'M'
            };
            $http.post(api + '/telematic/citymaster/mileage/get',dataYear)
                .then(function(response){
                    if (response.data.result) {
                        if (response.data.response.response) {
                            var maxYear = 0;
                            vm.yearsCalendar = [];
                            vm.yearsCalendarPerMounth = [[0,0,0,0,0,0,0,0,0,0,0,0]];
                            response.data.response.response.forEach(function(f){
                                var date = f.date.split(' '),
                                    items = date[0].split('.');

                                if (items[2] > maxYear) maxYear = items[2];
                            });
                            response.data.response.response.forEach(function(f){
                                var error = false,
                                    date = f.date.split(' '),
                                    items = date[0].split('.');

                                vm.yearsCalendar.forEach(function(a){
                                    if (items[2] == maxYear && items[1] == a) {
                                        error = true;
                                    }
                                });
                                if (!error) {
                                    if (items[1] !== undefined) {
                                        vm.yearsCalendar.push(items[1])
                                    }
                                }
                            });
                            vm.yearsCalendar.forEach(function(m){
                                response.data.response.response.forEach(function(f){
                                    var date = f.date.split(' '),
                                        items = date[0].split('.');
                                    if (items[2] == maxYear && items[1] == m) {
                                        if (f.value !== undefined) {
                                            vm.yearsCalendarPerMounth[0][parseInt(m)-1] = f.value;
                                        }
                                    }
                                });
                            });
                        }
                    }
                })
        }

        function getTrips(carData) {

            vm.eventListToShow = [];
            vm.currentMonth = null;

            var newBeginYearMounth = carData.begin_date.split('-');
            var newBeginData = newBeginYearMounth[2].split(' ')[0];

            // End date
            var newEndYearMounth = carData.end_date.split('-');
            var newEndData = newBeginYearMounth[2].split(' ')[0];

            var data = {
                token: vm.token,
                carId: carData.object_id,
                dateBegin: newBeginData+'.'+newBeginYearMounth[1]+'.'+newBeginYearMounth[0],
                dateEnd: newEndData+'.'+newEndYearMounth[1]+'.'+newEndYearMounth[0],
                pageNumber: 0,
                pageSize: 20
            };
            $http.post(api + '/telematic/citymaster/trip/get', data)
                .then(function(response){
                    if (response.data.result) {
                        var trips = response.data.response.trips;
                        $http.post(api + '/telematic/citymaster/parking/get', data)
                            .then(function(response){
                                if (response.data.result) {
                                    var parking = response.data.response.response;
                                    parking.forEach(function(f){
                                        var beforeParse = f.dateBegin.split(' '),
                                            afterParse = beforeParse[0].split('.'),
                                            newDate = afterParse[2]+'-'+afterParse[1]+'-'+afterParse[0]+' ' + beforeParse[1];

                                        f.time_start = Date.parse(newDate);


                                        beforeParse = f.dateEnd.split(' ');
                                        afterParse = beforeParse[0].split('.');
                                        newDate = afterParse[2]+'-'+afterParse[1]+'-'+afterParse[0]+' ' + beforeParse[1];
                                        f.time_end = Date.parse(newDate);
                                        f.type = 'parking';
                                        vm.eventsList.push(f);
                                    });
                                    trips.forEach(function(f){
                                        f.type = 'trip';
                                        f.time_end = f.time_end*1000;
                                        f.time_start = f.time_start*1000;
                                        vm.eventsList.push(f);
                                    });
                                    vm.currentMonth = 2;
                                    showEventList(6);
                                }
                            })
                    }
                })
        }

        function showEventList(mounth) {
            vm.eventListToShow = [];
            if (vm.eventsList.length > 0) {
                vm.eventsList.forEach(function(f){
                    var getMounth = parseInt($filter('date')(f.time_start,'MM','GMT+3'));
                    if (getMounth == mounth) {
                        vm.eventListToShow.push(f);
                    }
                });
                vm.eventListToShow.sort(compareNumbers);
            }
        }
        
        function showMoreinfo(event) {
            vm.eventMore = event;
            vm.eventMorePoi = event.poi;
            var data = {
                token: vm.token,
                carId: event.carId,
                'regionList[0]': event.regionId
            };
            $http.post(api + '/telematic/citymaster/region/get',data)
                .then(function(response){
                    xlog(response.data);
                    createCurrentMap(event);
                })
        }

        function createCurrentMap(event){
            if (event.type='parking') {
                var location = {lat: event.latitude, lng: event.longitude},
                    id = 'map' + event.time_start;
                var map = new google.maps.Map(document.getElementById(id), {
                    zoom: 13,
                    center: location
                });
                var marker = new google.maps.Marker({
                    position: location,
                    map: map
                });
            } else if (event.type == 'trip') {
                var directionsDisplay = new google.maps.DirectionsRenderer();

                var request = {
                    origin: new google.maps.LatLng(60.023539414725356,30.283663272857666), //точка старта
                    destination: new google.maps.LatLng(59.79530896374892,30.410317182540894), //точка финиша
                    travelMode: google.maps.DirectionsTravelMode.DRIVING //режим прокладки маршрута
                };

                directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                    }
                });

                directionsDisplay.setMap(map);
            }

        }

        function compareNumbers(a, b) {
            return a.time_end - b.time_start;
        }
    }

})();

