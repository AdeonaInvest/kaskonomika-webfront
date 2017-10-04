(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('dashboardProfileController', dashboardProfileController);

    dashboardProfileController.$inject = ['$http','config','$location'];

    function dashboardProfileController($http, config,$location) {
        let vm = this;

        vm.carsList = []; //Список автомобилей

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
            vm.policyData = vm.carsList[key];
            getUserInfo(); //Получение данных пользователя
            getContractorInfo(); //Получение данных констрактора
            getUserDocuments(); //Получение данных по авто
            getCarRoute(); //Получение данных о местоположении авто
            getTotalScoring(); //Получение данных о скоринге
        }

        /**
         * Получение данных пользователя
         */
        function getUserInfo() {
            let data = {
                token: vm.token
            };
            $http.post(config.api + 'users/info',data)
                .then(function(res){
                    if (res.data.result) {
                        vm.userData = res.data.response;
                    } else {
                        xlog('MODULE : DASHBOARD : PROFILE : getUserInfo() error!')
                    }
                })
        }

        /**
         * Получение данных констрактора
         */
        function getContractorInfo() {
            $http.get(config.api + 'contractors/primary?token=' + vm.token)
                .then(function(res){
                    if (res.data.result) {
                        vm.contractor = res.data.response;
                    }
                    else {
                        xlog('MODULE : DASHBOARD : PROFILE : getContractorInfo() error!')
                    }
                })
        }

        /**
         * Получение данных по авто
         */
        function getUserDocuments() {
            $http.get(config.api + 'policies/objects/'+ vm.activeCarTab +'/documents?token=' + vm.token)
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
         * Получение данных о местоположении авто
         */
        function getCarRoute() {
            let data = {
                token: vm.token,
                object_id: vm.activeCarTab
            };
            $http.post(config.api + 'telematic/meta/get_route',data)
                .then(function(res){
                    if (res.data.result) {
                        vm.carPosition = res.data.response;
                        setTimeout(getCarRoute, 10000)
                    } else {
                        xlog('MODULE : DASHBOARD : PROFILE : getCarRoute() error!')
                    }
                })
        }

        /**
         * Получение данных о скоринге
         */
        function getTotalScoring() {
            let data = {
                token: vm.token
            };
            $http.post(config.api + 'policies/21/get_total_scoring/',data)
                .then(function(res){
                    if (res.data.result) {
                        vm.scoring = res.data.response;
                    } else {
                        xlog('MODULE : DASHBOARD : PROFILE : getTotalScoring() error!')
                    }
                })
        }

    }
})();