(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('dashboardInsuranceCreateController', dashboardInsuranceCreateController);

    dashboardInsuranceCreateController.$inject = ['$scope','$http','config','FileUploader','NgMap'];

    function dashboardInsuranceCreateController($scope,$http,config,FileUploader,NgMap) {
        let vm = this;

        vm.carsList = [];
        vm.issue = {
            repairCount: 0,
            uploader: [],
            mapCenter: 'Москва'
        };
        vm.activeIncident = 0;
        vm.lossesAwait = 0; // 0 - стоп, 1 - ожидаение, 2 - завершение
        vm.uploaderCreated = false; // Uploader не инициализирован
        vm.lossesApplicationCreated = false; // Заявка еще не создана
        vm.oneAtATime = true; // открытие лишь одной вкладки в шаге 5
        vm.step5Tabs = [
            {
                img: '/src/img/icons/insurance/view_front_right.png',
                uploaderId: 11,
                header: 'Спереди-справа',
                text: 'Фотографий:',
                open: false
            },
            {
                img: '/src/img/icons/insurance/view_front_left.png',
                uploaderId: 10,
                header: 'Спереди-слева',
                text: 'Фотографий:',
                open: false
            },
            {
                img: '/src/img/icons/insurance/view_rear_left.png',
                uploaderId: 12,
                header: 'Сзади-слева',
                text: 'Фотографий:',
                open: false
            },
            {
                img: '/src/img/icons/insurance/view_rear_right.png',
                uploaderId: 13,
                header: 'Сзади-справа',
                text: 'Фотографий:',
                open: false
            }
        ];


        vm.getVariantsList = getVariantsList;
        vm.getGuiltyType = getGuiltyType;
        vm.getGuiltyDrivers = getGuiltyDrivers;
        vm.clearQueue = clearQueue;
        vm.editGoogleMap = editGoogleMap;

        activate();
        ///////////////////
        function activate() {
            getLocalData(); //Получение данных о token'е из localStorage
            setRulesForMap(); //Получние прав и определение координат пользователя

            createUploaders();
        }

        /**
         * Получение данных о token'е из localStorage
         */
        function getLocalData() {
            vm.user = JSON.parse(localStorage.getItem('currentUser'));
            vm.token = localStorage.getItem('currentToken');
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
                        });
                        // TODO
                        //editMap();
                    } else {
                        xerror('MODULE : DASHBOARD : INSURANCE_CREATE : getGuiltyDrivers()')
                    }
                })
        }


        /**
         * Получние прав и определение координат пользователя
         */
        function setRulesForMap() {
            navigator.geolocation.getCurrentPosition(show_map, handle_error);

            function show_map(position) {
                vm.issue.mapCenter = [position.coords.latitude, position.coords.longitude]; // Центрирование карты
            }

            function handle_error(err) {
                xerror('MODULE : DASHBOARD : INSURANCE : setRulesForMap() : Geoposition failure!', err)
            }
        }

        /**
         * Работа с картой, установка меток и т.п.
         */
        function editGoogleMap(event) {
            let geocoder = new google.maps.Geocoder(); //Доступ к сервису геокодирования

            vm.issue.mapPosition = {lat: event.latLng.lat(),lng: event.latLng.lng()}; //Получение координат клика
            vm.issue.mapCenter = [vm.issue.mapPosition.lat, vm.issue.mapPosition.lng]; // Центрирование карты

            //------------------- Декодирование адреса местоположения авто ---------------------//
            geocoder.geocode({'location': vm.issue.mapPosition}, function(results, status) {
                if (status === 'OK') {
                    vm.issue.mapAddress = results[0].formatted_address; // Вывод адреса в строку
                } else {
                    xerror('MODULE : DASHBOARD : INSURANCE : editGoogleMap() : Geocode error!',results[0])
                }
            });
        }

        /**
         * Таймер на срабатываение после указания количества поврежденных деталей
         */
        $scope.$watch('vm.issue.repairCount',function(){
            clearTimeout(vm.awaitLosses);
            vm.awaitLosses = setTimeout(function(){
                if (vm.issue.repairCount > 0 && vm.lossesAwait === 0) {
                    vm.lossesAwait = 1;
                    createLossesApplication();
                }
            },2000)
        });

        /**
         * Получение списка водителей авто
         */
        function createLossesApplication() {
            let date = new Date(),
                data = {
                    token: vm.token,
                    policy_id: vm.issue.policy ? vm.issue.policy.id : null,
                    object_id: vm.issue.car ? vm.issue.car.id : null,
                    losses_companies_id: vm.activeIncident.id,
                    event_date: (date.getDate()<10?'0'+date.getDate():date.getDate())+'.'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1))+'.'+date.getFullYear(),
                    losses_guilty_type_id: vm.activeIncident.id,
                    guilty_contractor_id: vm.issue.guilty ? vm.issue.guilty.id : null,
                    address: JSON.stringify({
                        kladr: '',
                        index: '',
                        region: '',
                        disctrict: '',
                        city: '',
                        sub_city: '',
                        street: '',
                        building: '',
                        number: '',
                        address: 'Бережковская наб., Москва, Россия, 121059'
                    }),
                    info: vm.issue.myVersion,
                    pc_lat: '', //
                    pc_lng: '', //
                    variant_id: vm.issue.variant,
                    is_glass: vm.issue.repairGlass,
                    is_light: vm.issue.repairLighting,
                    is_mirror: vm.issue.repairMirrors,
                    is_body: vm.issue.repairBody,
                    parts_count: vm.issue.repairCount
            };
            $http.post(config.api + 'losses/applications/create',data)
                .then(function (res) {
                    if (res.data.result) {
                        vm.issue.lossesId = res.data.response;
                        vm.lossesAwait = 2;
                        //TODO открыть после установления нормального сценария
                        createUploaders();
                    } else {
                        xerror('MODULE : DASHBOARD : INSURANCE_CREATE : createLossesApplication()')
                    }
                })
        }

        /**
         * Создание загрузчиков для фото
         */
        function createUploaders() {

            /**
             * Загрузчик для 1 документа
             * @type {{url: string, method: string, autoUpload: boolean, formData: [null], withCredentials: boolean}}
             */
            vm.uploaderOptions = {
                url: config.api + 'storage/upload',
                method: 'post',
                autoUpload : true,
                formData: [{
                    category_id: 6,
                    token: vm.token,
                    owner_id: vm.user.id
                }],
                withCredentials: false
            };
            // Создание массива для загрузчиков
            for (let i = 1; i <= 20; i++) {
                vm['uploader'+i] = new FileUploader(vm.uploaderOptions);
                vm.issue.uploader.push([]);

                vm['uploader'+i].onCompleteItem  = function(item, response){
                    if (response.result === true) {
                        $http.get(config.api + 'storage/files/'+ response.response +'?token=' + vm.token)
                            .then(function(res){
                                if (res.data.result) {
                                    vm.issue.uploader[i].push(res.data.response.path)
                                }
                            });
                    }
                };
            }

            /**
             * Загрузчик для нескольких документов в ШАГЕ 5
             * @type {{url: string, method: string, autoUpload: boolean, formData: [null], withCredentials: boolean}}
             */
            vm.uOstep5 = {
                url: config.api + 'storage/upload',
                method: 'post',
                autoUpload : true,
                formData: [{
                    category_id: 6,
                    token: vm.token,
                    owner_id: vm.user.id
                }],
                withCredentials: false
            };
            // Создание массива для загрузчиков
            for (let i = 21; i <= 25; i++) {
                vm['uploader'+i] = new FileUploader(vm.uOstep5);
                vm.issue.uploader.push([]);

                vm['uploader'+i].onCompleteItem  = function(item, response){
                    if (response.result === true) {
                        $http.get(config.api + 'storage/files/'+ response.response +'?token=' + vm.token)
                            .then(function(res){
                               if (res.data.result) {
                                   vm.issue.uploader[i].push(res.data.response.path)
                               }
                            });
                    }
                };
            }
            setTimeout(function(){
                vm.uploaderCreated = true;
            },500);
        }

        /**
         * Удаление изображения из очереди
         */
        function clearQueue(a) {
            let index = a.index;
            vm['uploader'+ index].destroy();
            if (a.key) {
                vm.issue.uploader[index].splice(a.key-1,1);
                vm['uploader'+index] = new FileUploader(vm.uOstep5);
            } else {
                vm.issue.uploader[index] = [];
                vm['uploader'+index] = new FileUploader(vm.uploaderOptions);
            }
        }


        
    }
})();