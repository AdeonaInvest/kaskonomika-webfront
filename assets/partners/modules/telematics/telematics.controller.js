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
                type: 'parking'
            },
            {
                title: 'Dynamic Group Header - 2',
                type: 'trip'
            }
        ];

        vm.getNewResult = getNewResult;

        vm.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

        activate();
        /////////////////////
        function activate() {

        }

        function getNewResult(key) {
            vm.tabIndex = key;
            xlog('берем новые резултатыт',key)

        }

        


    }
})();

