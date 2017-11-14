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
            sd: {},
            mapCenter: 'Москва',
            repairGlass: false,
            repairLighting: false,
            repairMirrors: false,
            repairBody: false,
            repairWheels: false,
            showGuiltyAnketa: false,
            showMap: false
        };
        vm.activeIncident = 0;
        vm.lossesAwait = 0; // 0 - стоп, 1 - ожидаение, 2 - завершение
        vm.uploaderCreated = false; // Uploader не инициализирован
        vm.lossesApplicationCreated = false; // Заявка еще не создана
        vm.oneAtATime = true; // открытие лишь одной вкладки в шаге 5
        vm.step5Tabs = [
            {
                img: '/src/img/icons/insurance/front_direct.png',
                uploaderId: 11,
                header: 'Спереди',
                text: 'Фотографий:',
                open: false
            },
            {
                img: '/src/img/icons/insurance/view_left.png',
                uploaderId: 10,
                header: 'Слева',
                text: 'Фотографий:',
                open: false
            },
            {
                img: '/src/img/icons/insurance/view_rear_direct.png',
                uploaderId: 12,
                header: 'Сзади',
                text: 'Фотографий:',
                open: false
            },
            {
                img: '/src/img/icons/insurance/view_right.png',
                uploaderId: 13,
                header: 'Справа',
                text: 'Фотографий:',
                open: false
            }
        ];

        vm.getVariantsList = getVariantsList;
        vm.getGuiltyType = getGuiltyType;
        vm.getGuiltyDrivers = getGuiltyDrivers;
        vm.clearQueue = clearQueue;
        vm.editGoogleMap = editGoogleMap;
        vm.createDriverContractor = createDriverContractor;
        vm.createLossesApplication = createLossesApplication;

        activate();
        ///////////////////
        function activate() {
            getLocalData(); //Получение данных о token'е из localStorage
            setRulesForMap(); //Получние прав и определение координат пользователя
            $http.post(config.api + 'storage/files/categories',{token: vm.token})
                .then(function(res){
                    xlog(res.data);
                })
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
            if (id !== 3) {
                $http.get(config.api + 'losses/variants/list/' + id + '?token=' + vm.token)
                    .then(function (res) {
                        if (res.data.result) {
                            vm.variantsList = res.data.response;
                        } else {
                            xerror('MODULE : DASHBOARD : INSURANCE_CREATE : getVariantsList()')
                        }
                    })
            } else {
                vm.issue.guiltyType = 2; //Установка виновника, как неизвестное лицо
                editGoogleMap(); //Работа с картой, установка меток и т.п.
            }
        }

        /**
         * Получение списка виновников происшествия
         */
        function getGuiltyType(id) {
            vm.issue.showGuiltyAnketa = false; //отображение анкеты виновника
            vm.guiltyDrivers = null;
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
            if (vm.issue.guiltyType.id === '2' || vm.issue.guiltyType.id === '4') {
                vm.issue.showGuiltyAnketa = true; //отображение анкеты виновника
            } else {
                vm.issue.showGuiltyAnketa = false; //отображение анкеты виновника
                $http.get(config.api + 'losses/guiltyDrivers?object_id=' + id + '?token=' + vm.token)
                    .then(function (res) {
                        if (res.data.result) {
                            vm.guiltyDrivers = [];
                            res.data.response.forEach(function(f){
                                if (f.is_deleted !== '1') {
                                    vm.guiltyDrivers.push(f)
                                }
                            });
                        } else {
                            xerror('MODULE : DASHBOARD : INSURANCE_CREATE : getGuiltyDrivers()')
                        }
                    })
            }
        }

        /**
         * Создание объекта контрагента-виновника происшествия и добавления к нему авто
         */
        function createDriverContractor(){
            let data = {
                token: vm.token,
                name: vm.issue.sd.name,
                phone: vm.issue.sd.phone,
                address: vm.issue.sd.reg_address
            };
            $http.post(config.api + 'contractors/complexcreate',data) //Комплексное добавление контрагента с контактами и тд
                .then(function(res){
                    if (res.data.result) {
                        if (vm.issue.guiltyType.is_car_data_needed === '1') {
                            let date = new Date(vm.issue.sd.osago_date),
                                data = {
                                token: vm.token,
                                name: vm.issue.sd.name,
                                reg_plate: vm.issue.sd.car_number,
                                driver_contractor_id: res.data.response, //ID, из "Комплексное добавление контрагента с контактами и тд"
                                osago_number: vm.issue.sd.osago_number,
                                osago_expiration_date: (date.getDate()<10?'0'+date.getDate():date.getDate())+'.'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1))+'.'+date.getFullYear(),
                                osago_company: vm.issue.sd.osago_name
                            };
                            $http.post(config.api + 'losses/addGuiltyCarKasko',data) //Добавление машины контрагента
                                .then(function(res){
                                    if (res.data.result) {
                                        vm.issue.guilty_contractor_id = res.data.response; //ID виновника происшествия
                                        editGoogleMap() //Работа с картой, установка меток и т.п.
                                    } else {
                                        xerror('MODULE : DASHBOARD : INSURANCE_CREATE : createDriverContractor() : contractors/complexcreate')
                                    }
                                })
                        } else {
                            editGoogleMap() //Работа с картой, установка меток и т.п.
                        }
                    } else {
                        xerror('MODULE : DASHBOARD : INSURANCE_CREATE : createDriverContractor()')
                    }
                })
        }

        /**
         * Работа с картой, установка меток и т.п.
         */
        function editGoogleMap(event) {

            vm.issue.showMap = true;
            // Запрос текущего местоположения браузера / телефона пользователя
            navigator.geolocation.getCurrentPosition(function(res){
                if (res) {
                    vm.phonePosition = res.Position.coords.coords;
                }
            });

            let geocoder = new google.maps.Geocoder(); //Доступ к сервису геокодирования

            if (event) {
                vm.issue.mapPosition = {lat: event.latLng.lat(),lng: event.latLng.lng()}; //Получение координат клика
                vm.issue.mapCenter = [vm.issue.mapPosition.lat, vm.issue.mapPosition.lng]; // Центрирование карты
            }

            //------------------- Декодирование адреса местоположения авто ---------------------//
            geocoder.geocode({'location': vm.issue.mapPosition}, function(results, status) {
                if (status === 'OK') {
                    vm.issue.mapAddress = results[0].formatted_address; // Вывод адреса в строку
                } else {
                    xerror('MODULE : DASHBOARD : INSURANCE : editGoogleMap() : Geocode error!',results[0])
                }
            });
        }

        //createLossesApplication()

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
                    losses_guilty_type_id: vm.issue.guiltyType.id,
                    guilty_contractor_id: vm.issue.guilty_contractor_id ? vm.issue.guilty_contractor_id : null,
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
                        address: vm.issue.mapAddress
                    }),
                    info: vm.issue.myVersion,
                    pc_lat: '', //
                    pc_lng: '', //
                    variant_id: vm.issue.variant,
                    is_glass: vm.issue.repairGlass,
                    is_light: vm.issue.repairLighting,
                    is_mirror: vm.issue.repairMirrors,
                    is_body: vm.issue.repairBody,
                    is_wheels: vm.issue.repairWheels,
                    phone_lat: vm.phonePosition ? vm.phonePosition.latitude : null,
                    phone_lng: vm.phonePosition ? vm.phonePosition.longitude : null,
                    car_lat: vm.issue.mapPosition ? vm.issue.mapPosition.lat : null,
                    car_lng: vm.issue.mapPosition ? vm.issue.mapPosition.lng : null
            };
            $http.post(config.api + 'losses/applications/create',data)
                .then(function (res) {
                    if (res.data.result) {
                        vm.issue.lossesId = res.data.response;
                        vm.lossesAwait = 2;
                        vm.waitLossesApp = false;
                        getDocumentAdditionalList();
                    } else {
                        xerror('MODULE : DASHBOARD : INSURANCE_CREATE : createLossesApplication()')
                    }
                })
        }

        /**
         * Получение списка дополнительных документов
         */
        function getDocumentAdditionalList() {
            let data = {
                token:  vm.token,
                losses_companies_id: vm.activeIncident.id,
                variant_id: vm.issue.variant,
                guilty_type_id: vm.issue.guiltyType.id,
                is_glass: vm.issue.repairGlass,
                is_light: vm.issue.repairLighting,
                is_mirror: vm.issue.repairMirrors,
                is_body: vm.issue.repairBody,
                is_wheels: vm.issue.repairWheels
            };
            $http.post(config.api + 'losses/documents_required_list',data)
                .then(function(res){
                    if (res.data.result) {
                        vm.addDocumentsList = {};
                        vm.addDocumentsList.indexes = [];
                        vm.addDocumentsList.docs = res.data.response;
                        vm.addDocumentsList.number = vm.addDocumentsList.docs.length;

                        vm.addDocumentsList.docs.forEach(function(f){
                            vm.addDocumentsList.indexes.push(f.type_id);
                        });

                        createUploaders();
                    }

                })
        }

        /**
         * Утверждение заявления и отправка данных на сервер
         */
        /*function insuranceReady() {
            let date = new Date(),
                data = {

                };
            $http.post(config.api + 'losses/applications/create',data)
                .then(function (res) {
                    if (res.data.result) {
                        //TODO открыть после установления нормального сценария

                    } else {
                        xerror('MODULE : DASHBOARD : INSURANCE_CREATE : insuranceReady() $http failure')
                    }
                })
        }*/

        /**
         * Создание загрузчиков для фото
         */
        function createUploaders() {
            /**
             * Настройки для загрузчика
             * @type {{url: string, method: string, autoUpload: boolean, formData: [], withCredentials: boolean}}
             */
            vm.uploaderConfig = {
                url: config.api + 'storage/upload',
                method: 'post',
                autoUpload : true,
                formData: [],
                withCredentials: false
            };
            // Создание массива для загрузчиков
            for (let i = 0; i < 50; i++) {
                vm['uploader'+i] = new FileUploader(vm.uploaderConfig);
                vm.issue.uploader.push([]);

                /**
                 * Обработка перед загрузкой изображения
                 * @param item
                 */
                vm['uploader'+i].onBeforeUploadItem = function(item) {
                    let data = {
                        token: vm.token,
                        owner_id: vm.user.id
                    };
                    switch (i) {
                        case 21: data.category_id = 5; //Спереди-справа
                            break;
                        case 22: data.category_id = 6; //Спереди-слева
                            break;
                        case 23: data.category_id = 8; //Сзади-слева
                            break;
                        case 24: data.category_id = 7; //Сзади-справа
                            break;
                        case 25: data.category_id = 9; //Детальный вид повреждений
                            break;
                        case 26: data.category_id = 2; //Общий вид места ДТП
                            break;
                        case 4: data.losses_documents_types = 22;//Фотография одометра
                            break;
                        case 5: data.losses_documents_types = 21;//Фотография VIN-номера
                            break;
                        case 27: data.losses_documents_types = 1; //Свидетельство о регистрации ТС (СТС)
                            break;
                        case 28: data.losses_documents_types = 9; //Справка о ДТП (Приложение к приказу МВД РФ № 154)
                            break;
                        case 29: data.losses_documents_types = 10; //Протокол об административном правонарушении (если составлялся)
                            break;
                        case 30: data.losses_documents_types = 11; //Определение о возбуждении дела об административном правонарушении (если оформлялось)
                            break;
                        case 31: data.losses_documents_types = 12; //Определение об отказе в возбуждении дела об административном правонарушении (если оформлялось)
                            break;
                        case 32: data.losses_documents_types = 24; //Водительское удостоверение лица, управлявшего ТС в момент заявляемого события
                            break;
                        case 33: data.losses_documents_types = 30; //Постановление по делу об административном правонарушении (если составлялось)
                            break;
                        default: data.category_id = 14; //Дефолтный ID для всех изображений
                            break;
                    }
                    item.formData.push(data);
                };

                /**
                 * Событие после завершения загрузки изображения
                 * @param item
                 * @param response
                 */
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

            //Создание загрузчиков для динамических списков документов
            let index = 0;
            for (let i = 50; i <= vm.addDocumentsList.number; i++) {
                vm['uploader'+i] = new FileUploader(vm.uploaderConfig);
                vm.issue.uploader.push([]);

                /**
                 * Обработка перед загрузкой изображения
                 * @param item
                 */
                vm['uploader'+i].onBeforeUploadItem = function(item) {
                    item.formData.push({
                        losses_documents_types: vm.addDocumentsList.indexes[index],
                        token: vm.token,
                        owner_id: vm.user.id
                    });
                };

                /**
                 * Событие после завершения загрузки изображения
                 * @param item
                 * @param response
                 */
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
                index++;
            }

            /**
             * Событие при завершении создания всех загрузчиков
             */
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
                vm['uploader'+index] = new FileUploader(vm.uploaderConfig);
            } else {
                vm.issue.uploader[index] = [];
                vm['uploader'+index] = new FileUploader(vm.uploaderOptions);
            }
        }

    }
})();