/**
 * Created by Ravy on 22.03.2017.
 */
(function () {
    'use strict';

    angular.module('partners')
        .controller('pageTelematicsController', pageTelematicsController);

    pageTelematicsController.$inject = ['$window','$http','config','$filter','$sce'];

    function pageTelematicsController($window,$http,config, $filter,$sce) {
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
            vm.carID = carId;
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
                    var otherScoringArray = [];
                    vm.popoverHtml = '';
                    if (response.data.response.response) {
                        response.data.response.response.forEach(function(f){
                            if (f.param === null) {
                                vm.dashboardData = f;
                            } else {
                                otherScoringArray.push(f);
                            }
                        });
                        otherScoringArray.forEach(function(a){
                            vm.popoverHtml = vm.popoverHtml + '<li>' + a.param + ':' + ' ' +  a.score + '</li>';
                        });
                        vm.popoverHtml = '<ul>' + vm.popoverHtml + '</ul>';
                        vm.popoverHtml = $sce.trustAsHtml(vm.popoverHtml);
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
                pageNumber: 0
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
        
        function showMoreinfo(event, open) {
            if (open){
                console.log('event',event);
                vm.eventMore = event;
                if (event.type == 'parking') {
                    vm.eventMorePoi = event.poi;
                    var region = [event.regionId];
                    var data = {
                        token: vm.token,
                        carId: event.carId,
                        regionIdList: region
                    };
                    $http.post(api + '/telematic/citymaster/region/get',data)
                        .then(function(response){
                            if (response.data.result) {
                                vm.region = response.data.response.response[0];
                                vm.regionChart = [];
                                vm.regionChartLabel = [];
                                vm.region.poiWeight.sort(compareWeight);
                                vm.region.poiWeight.forEach(function(f){
                                    switch (f.type) {
                                        case 'home_goods_store':
                                            f.type = 'Товары для дома';
                                            break;
                                        case 'school':
                                            f.type = 'Школа';
                                            break;
                                        case 'point_of_interest':
                                            f.type = 'Без категории';
                                            break;
                                        case 'food':
                                            f.type = 'Еда';
                                            break;
                                        case 'general_contractor':
                                            f.type = 'Контрагент';
                                            break;
                                        case 'shopping_mall':
                                            f.type = 'Торговые центры';
                                            break;
                                        case 'store':
                                            f.type = 'Магазин';
                                            break;
                                        case 'lawyer':
                                            f.type = 'Закон';
                                            break;
                                        case 'shoe_store':
                                            f.type = 'Магазин обуви';
                                            break;
                                        case 'finance':
                                            f.type = 'Финансы';
                                            break;
                                        case 'establishment':
                                            f.type = 'Творчество';
                                            break;
                                        case 'accounting':
                                            f.type = 'Финансы';
                                            break;
                                        case 'moving_company':
                                            f.type = 'Перевозки';
                                            break;
                                        case 'health':
                                            f.type = 'Здоровье';
                                            break;
                                        case 'transit_station':
                                            f.type = 'Общественный транспорт';
                                            break;
                                        case 'bus_station':
                                            f.type = 'Автобусные остановки';
                                            break;
                                        case 'florists':
                                            f.type = 'Цветы';
                                            break;
                                        case 'furniture_store':
                                            f.type = 'Мебельный магазин';
                                            break;
                                        case 'atm':
                                            f.type = 'Банкоматы';
                                            break;
                                        case 'hair_care':
                                            f.type = 'Парикмахерская';
                                            break;
                                        case 'locksmith':
                                            f.type = 'Слесарь';
                                            break;
                                        case 'place_of_worship':
                                            f.type = 'Памятники';
                                            break;
                                        case 'bank':
                                            f.type = 'Банк';
                                            break;
                                        case 'book_store':
                                            f.type = 'Книжный магазин';
                                            break;
                                        case 'parking':
                                            f.type = 'Парковка';
                                            break;
                                        case 'grocery_or_supermarket':
                                            f.type = 'Супермаркет';
                                            break;
                                        case 'car_repair':
                                            f.type = 'Автомастерская';
                                            break;
                                        case 'car_dealer':
                                            f.type = 'Автосалон';
                                            break;
                                        case 'dentist':
                                            f.type = 'Дантист';
                                            break;
                                        case 'real_estate_agency':
                                            f.type = 'Агенство недвижимости';
                                            break;
                                        case 'clothing_store':
                                            f.type = 'Магазин одежды';
                                            break;
                                        case 'jewelry_store':
                                            f.type = 'Ювелирный одежды';
                                            break;
                                    }
                                    vm.regionChart.push(f.weight);
                                    vm.regionChartLabel.push(f.type);
                                });
                                console.log('vm.regionChart',vm.regionChart)
                                console.log('vm.regionChartLabel',vm.regionChartLabel)
                                createCurrentMap(event);
                            }

                        })
                } else if (event.type == 'trip') {
                    var data = {
                        token: vm.token,
                        carId: vm.carID,
                        tripId: event.id,
                        periodType: 'TRIP'
                    };
                    $http.post(api + '/telematic/citymaster/scoring/get', data)
                        .then(function(response){
                            vm.otherScoringTrip = [];
                            if (response.data.response.response) {
                                response.data.response.response.forEach(function (f) {
                                    if (f.param === null) {
                                        vm.tripScoringData = f;
                                    } else {
                                        vm.otherScoringTrip.push(f);
                                    }
                                });
                            }
                        });
                    createCurrentMap(event);
                }

            }
        }

        function createCurrentMap(event){
            console.log('рисую карту')
            if (event.type == 'parking') {
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
                var data = {
                    token: vm.token,
                    tripId: event.id
                };
                $http.post(api+'/telematic/citymaster/track/get',data)
                        .then(function(response) {
                            vm.waypoints = [];
                            vm.waypointsList = [];
                            vm.waypointsServer = response.data.response.tracker.p;
                            var waypointsCounter = Math.floor(vm.waypointsServer.length / Math.floor(vm.waypointsServer.length / 21));

                            // Создание массива ключевых точек
                            for (var i = 0; i < 21; i = i + waypointsCounter) {
                                vm.waypointsList.push(vm.waypointsServer[i])
                            }

                            vm.waypointsList.forEach(function(f){
                                var location = new google.maps.LatLng(f.pt.gps.lat,f.pt.gps.lon);
                                var a = {
                                    location: location,
                                    stopover: false
                                };
                                vm.waypoints.push(a);
                            });

                            //Отображение карты с маршрутом
                            var request = {
                                origin: new google.maps.LatLng(event.start_point.lat,event.start_point.lon), //точка старта
                                destination: new google.maps.LatLng(event.end_point.lat,event.end_point.lon), //точка финиша
                                waypoints: vm.waypoints,
                                optimizeWaypoints: true,
                                travelMode: 'DRIVING'
                            };
                            var directionsDisplay = new google.maps.DirectionsRenderer();
                            var directionsService = new google.maps.DirectionsService();
                            var map;
                            var id = 'map' + event.time_start;
                            var mapOptions = {
                                zoom:7,
                                center: request.destination
                            };

                            map = new google.maps.Map(document.getElementById(id), mapOptions);
                            directionsDisplay.setMap(map);

                            directionsService.route(request, function(result, status) {
                                if (status == 'OK') {
                                    directionsDisplay.setDirections(result);
                                } else {
                                    window.alert('Directions request failed due to ' + status);
                                }
                            });
                        });

            }

        }


        function compareNumbers(a, b) {
            return ((a.time_end-100) - b.time_start);
        }

        function compareWeight(a, b) {
            return (b.weight - a.weight);
        }
    }

})();

