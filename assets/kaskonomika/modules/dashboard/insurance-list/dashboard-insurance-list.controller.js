(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('dashboardInsuranceListController', dashboardInsuranceListController);

    dashboardInsuranceListController.$inject = ['$rootScope','$scope','$http','$location','config'];

    function dashboardInsuranceListController($rootScope, $scope, $http,$location,config) {
        let vm = this;

        vm.lossesList = []; //Список новых уведомлений

        activate();
        ///////////////////
        function activate() {
            checkUser();
            checkUrlParams();
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
                getLossesList(); //Получение списка авто с оформленными полисами
            }
        }

        /**
         * Получение списка событий по авто
         */
        function getLossesList() {
            $http.get(config.api + 'losses/applications?token=' + vm.token)
                .then(function(res){
                    if (res.data.result && res.data.response.length > 0) {
                        res.data.response.forEach(function (f) {
                            let date = new Date(f.create_date);
                            f.time = date.getTime();
                            vm.lossesList.push(f);
                        });
                        vm.lossesList.reverse();
                    } else {
                        xerror('MODULE : DASHBOARD : INSURANCE_LIST : getLossesList() error!')
                    }
                })
        }

        function checkUrlParams() {
            vm.params = $location.search();
            if (vm.params.action) {
                xlog('открытие мобалки')
            }
        }
        
    }
})();