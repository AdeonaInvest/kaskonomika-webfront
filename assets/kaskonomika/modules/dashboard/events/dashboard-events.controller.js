(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('dashboardEventsController', dashboardEventsController);

    dashboardEventsController.$inject = ['$rootScope','$scope','$http','$location','config'];

    function dashboardEventsController($rootScope, $scope, $http,$location,config) {
        let vm = this;

        vm.newList = []; //Список новых уведомлений
        vm.eventsList = []; //Список всех уведомлений

        vm.setViewed = setViewed; //ОТметка о прочтении сообщения
        vm.setViewedAll = setViewedAll; //Отметка о прочтении всех сообщений

        activate();
        ///////////////////
        function activate() {
            checkUser();
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
                getEventsList(); //Получение списка авто с оформленными полисами
            }
        }

        /**
         * Получение списка событий по авто
         */
        function getEventsList() {
            let data = {
                token: vm.token,
                from: 0,
                to: 100
            };
            $http.post(config.api + 'communications/events/list',data)
                .then(function(res){
                    if (res.data.result && res.data.response.length > 0) {
                        vm.eventsList = res.data.response;
                        vm.eventsList.forEach(function (f) {
                            let date = new Date(f.create_date);
                            f.time = date.getTime();
                            if (f.is_viewed === '0') {
                                vm.newList.push(f);
                            }
                        });
                        xlog('vm.newList',vm.newList)
                    }
                })
        }

        /**
         * ОТметка о прочтении сообщения
         * @param item - весь объект сообщения
         */
        function setViewed(item) {
            let data = {
                token: vm.token,
                id: [item.id]
            };
            $http.post(config.api + 'communications/messages/viewed',data)
                .then(function(res){
                    item.is_viewed = '1';
                    xlog('f',res.data)
                })
        }

        /**
         * Отметка о прочтении всех сообщений
         */
        function setViewedAll() {
            let ids = [];
            vm.newList.forEach(function(f){
                ids.push(f.id);
            });
            let data = {
                token: vm.token,
                id: ids
            };
            $http.post(config.api + 'communications/messages/viewed',data)
                .then(function(res){
                    vm.newList = [];
                    xlog('setViewedAll',res.data)
                })
        }
        
    }
})();