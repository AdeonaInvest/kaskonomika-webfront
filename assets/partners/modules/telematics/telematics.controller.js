/**
 * Created by Ravy on 22.03.2017.
 */
(function () {
    'use strict';

    angular.module('partners')
        .controller('pageTelematicsController', pageTelematicsController);

    pageTelematicsController.$inject = ['$rootScope','$http','config','$window'];

    function pageTelematicsController($rootScope,$http,config, $window) {
        var vm = this;
        var api = config.api;
        vm.telemathicList = false;
        vm.cars = [
            {title: 'Peugeot 3008, 2014'},
            {title: 'Mazda Demio, 2012'},
            {title: 'Mitsubishi Pajero Sport, 2016'}
        ];
        vm.tabIndex = 0;

        vm.monthCalendar = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
        vm.series = ['Пробег'];

        vm.data = [
            [65, 59, 80, 81, 56, 55, 40,75,30,98,47,64]
        ];
        
        vm.currentYear = 17;

        vm.eventsList = [
            {
                title: 'Dynamic Group Header - 1',
                type: 'trip',
                id: 1
            },
            {
                title: 'Dynamic Group Header - 2',
                type: 'trip',
                id: 2
            }
        ];


        vm.getNewResult = getNewResult;
        vm.initMap = initMap;

        vm.currentMap = undefined;

        activate();
        /////////////////////
        function activate() {

        }

        function getNewResult(key) {
            vm.tabIndex = key;
            xlog('берем новые резултатыт',key)

        }

        function initMap(id,openTab) {
            if (openTab) {
                $http.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyBxrJsPPf5hKLa3dVmIZkO8D-Qg2UbPJUU')
                    .then(function(){
                        vm.currentMap = new google.maps.Map(document.getElementById('map'+id), {
                            center: {lat: -34.397, lng: 150.644},
                            zoom: 8
                        });
                        console.log('vm.currentMap', vm.currentMap);
                    });
            } else {
                $('#scriptArea').empty();
                vm.currentMap = undefined;
                console.log('vm.currentMap2', vm.currentMap);
            }

        }


        


    }
})();

