(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('dashboardInsuranceCreateController', dashboardInsuranceCreateController);

    dashboardInsuranceCreateController.$inject = ['$scope','$http','config','FileUploader'];

    function dashboardInsuranceCreateController($scope,$http,config,FileUploader) {
        let vm = this;

        vm.carsList = [];
        vm.issue = {
            repairCount: 0
        };
        vm.activeIncident = 0;
        vm.uploaderCreated = false; // Uploader не инициализирован
        vm.lossesApplicationCreated = false; // Заявка еще не создана


        vm.getVariantsList = getVariantsList;
        vm.getGuiltyType = getGuiltyType;
        vm.getGuiltyDrivers = getGuiltyDrivers;
        vm.clearQueue = clearQueue;

        activate();
        ///////////////////
        function activate() {
            getLocalData();
        }

        /**
         * Получение данных о token'е из localStorage
         */
        function getLocalData() {
            vm.user = JSON.parse(localStorage.getItem('currentUser'));
            vm.token = localStorage.getItem('currentToken');
            xlog('vm.user',vm.user)
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
                                vm.issue.car = vm.carsList[0];
                                vm.carsList[0].active = true;
                            } else {
                                //TODO Пустой список машин, нечего отображать. Вывести сценарий добавления машины
                                vm.carsListIsEmpty = true;
                            }
                            vm.issue.policy = f.policies[0];
                        });
                        getIncidentsList(); //Получение списка возможных происшествий
                    } else {
                        xerror('MODULE : DASHBOARD : INSURANCE_CREATE : getVehicles()')
                    }
                })
        }

        /**
         * Получение списка возможных происшествий
         */
        function getIncidentsList() {
            $http.get(config.api + 'losses/company?object_id=' + vm.issue.car.id)
                .then(function (res) {
                    if (res.data.result) {
                        vm.incidentList = res.data.response;
                    } else {
                        xerror('MODULE : DASHBOARD : INSURANCE_CREATE : getIncidentsList()')
                    }
                })
        }

        /**
         * Получение списка вариантов происшествий
         */
        function getVariantsList(id) {
            $http.get(config.api + 'losses/variants/list/' + id + '?token=' + vm.token)
                .then(function (res) {
                    if (res.data.result) {
                        vm.variantsList = res.data.response;
                    } else {
                        xerror('MODULE : DASHBOARD : INSURANCE_CREATE : getVariantsList()')
                    }
                })
        }

        /**
         * Получение списка виновников происшествия
         */
        function getGuiltyType(id) {
            $http.get(config.api + 'losses/guiltyTypes?variant=' + id + '?token=' + vm.token)
                .then(function (res) {
                    if (res.data.result) {
                        vm.guiltyType = res.data.response;
                    } else {
                        xerror('MODULE : DASHBOARD : INSURANCE_CREATE : getGuiltyType()')
                    }
                })
        }

        /**
         * Получение списка водителей авто
         */
        function getGuiltyDrivers(id) {
            $http.get(config.api + 'losses/guiltyDrivers?object_id=' + id + '?token=' + vm.token)
                .then(function (res) {
                    if (res.data.result) {
                        vm.guiltyDrivers = [];
                        res.data.response.forEach(function(f){
                            if (f.is_deleted !== '1') {
                                vm.guiltyDrivers.push(f)
                            }
                        })
                    } else {
                        xerror('MODULE : DASHBOARD : INSURANCE_CREATE : getGuiltyType()')
                    }
                })
        }


        $scope.$watch('vm.issue.repairCount',function(){
            if (vm.issue.repairCount > 0 && !vm.lossesApplicationCreated) {
                createLossesApplication();
            }
        });

        /**
         * Получение списка водителей авто
         */
        function createLossesApplication(id) {
            let data = {
                token: vm.token,
                policy_id: '', //26
                object_id: '', //21
                losses_companies_id: '', //1
                event_date: '', //09.09.2017
                losses_guilty_type_id: '', //3
                guilty_contractor_id: '', //address:{"kladr":"","index":"","region":"","disctrict":"","city":"","sub_city":"","street":"","building":"","number":"","address":"Бережковская наб., Москва, Россия, 121059"}
                info: '', //пусто
                pc_lat: '', //
                    pc_lng: '', //
                        variant_id: '', //2
                is_glass: '', //0
                is_light: '', //0
                is_mirror: '', //0
                is_body: '', //0
                parts_count: '', //63
            };
            $http.get(config.api + 'losses/applications/create',data)
                .then(function (res) {
                    if (res.data.result) {
                        vm.issue.lossesId = res.data.response;
                        vm.lossesApplicationCreated = true;
                    } else {
                        xerror('MODULE : DASHBOARD : INSURANCE_CREATE : getGuiltyType()')
                    }
                })
        }

        /**
         * Создание загрузчиков для фото
         */
        function createUploaders() {
            vm.uploaderOptions = {
                url: config.api + 'storage/upload',
                method: 'post',
                autoUpload : true,
                formData: [{
                    token: vm.token,
                    owner_id: vm.user.id
                }],
                withCredentials: false
            };
            for (let i = 1; i <= 20; i++) {
                vm['uploader'+i] = new FileUploader(vm.uploaderOptions);

                vm['uploader'+i].onAfterAddingFile = function(){
                    xlog('MODULE : FILLING : FILE-UPLOADER : File added ->',vm['uploader'+i].queue[0]._file);
                };
            }
            vm.uploaderCreated = true; // Uploader инициализирован
        }

        /**
         * Удаление изображения из очереди
         */
        function clearQueue(index) {
            vm['uploader'+index].destroy();
            vm['uploader'+index] = new FileUploader(vm.uploaderOptions);
        }


        
    }
})();