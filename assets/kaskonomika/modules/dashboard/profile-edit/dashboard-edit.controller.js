(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('dashboardEditController', dashboardEditController);

    dashboardEditController.$inject = ['FileUploader','$http','config','$location'];

    function dashboardEditController(FileUploader,$http,config,$location) {
        let vm = this;


        vm.clearQueue = clearQueue; //Удаление изображения из очереди
        vm.btnAddContact = btnAddContact; //Добавление новго контакта к пользователю
        vm.deleteContacts = deleteContacts; //Удаление контакта от пользователя
        vm.saveChanges = saveChanges; //Сохранение всех внесенных изменений

        activate();
        ///////////////////
        function activate() {
            //Данные пользователя на странице
            vm.user = {
                is_juridical: false,
                newPhone: [],
                newEmail: [],
                havePassport: false
            };
            checkUser(); //Проверка залогенного пользователя
        }

        /**
         * Проверка залогенного пользователя
         */
        function checkUser() {
            vm.currentUser = localStorage.getItem('currentUser');
            vm.token = localStorage.getItem('currentToken');
            if (!vm.user || !vm.token) {
                $location.path('/')
            } else {
                createUploaders(); //Создание загрузчиков для фото
                getUserInfo();
                getUserContractorData();
            }
        }

        /**
         * Создание загрузчиков для фото
         */
        function createUploaders() {
            for (let i = 1; i <= 10; i++) {
                vm['uploader'+i] = new FileUploader(vm.uploaderOptions);

                vm['uploader'+i].onAfterAddingAll = function(){
                    xlog('MODULE : FILLING : FILE-UPLOADER : File added ->',vm['uploader'+i].queue[0]._file);
                };
            }
        }

        /**
         * Удаление изображения из очереди
         */
        function clearQueue(index) {
            vm['uploader'+index].destroy();
            vm['uploader'+index] = new FileUploader(vm.uploaderOptions);
        }

        /**
         * Получение данных по пользователю
         */
        function getUserInfo() {
            let data = {
                token: vm.token
            };
            $http.post(config.api + 'users/info',data)
                .then(function(res){
                    if (res.data.result) {
                        vm.user.info = res.data.response;
                        vm.user.email = res.data.response.email;
                        vm.user.phone = res.data.response.phone;
                    } else {
                        xlog('MODULE : DASHBOARD : PROFILE_EDIT : getUserInfo() error!')
                    }
                })
        }

        /**
         * Получение данных контрактора
         */
        function getUserContractorData() {
            $http.get(config.api + 'contractors/primary?token=' + vm.token)
                .then(function(res){
                    if (res.data.result) {
                        vm.user.contractor = res.data.response;
                        if (vm.user.contractor.is_juridical === '1') {
                            vm.user.is_juridical = true;
                        }
                        vm.user.birth_date = vm.user.contractor.birth_date || undefined;
                        vm.user.last_name = vm.user.contractor.name.split(' ')[0];
                        vm.user.name = vm.user.contractor.name.split(' ')[1];
                        vm.user.middle_name = vm.user.contractor.name.split(' ')[2];
                        vm.user.sex = vm.user.contractor.sex || undefined;
                        getContractorDocuments();
                        getContractorsContacts();
                    } else {
                        xlog('MODULE : DASHBOARD : PROFILE_EDIT : getUserContractorData() error!')
                    }
                })
        }

        /**
         * Получение документов контрактора
         */
        function getContractorDocuments() {
            $http.get(config.api + 'contractors/'+ vm.user.contractor.id +'/documents?token=' + vm.token)
                .then(function(res){
                    if (res.data.result) {
                        vm.user.docs = res.data.response[0];
                        if (res.data.response[0]) {
                            vm.user.havePassport = true;
                            vm.user.passportSn = vm.user.docs.series + ' ' + vm.user.docs.number;
                            vm.user.last_name = vm.user.docs.last_name;
                            vm.user.name = vm.user.docs.name;
                            vm.user.middle_name = vm.user.docs.middle_name;
                            let dates = vm.user.docs.issued_date.split('.');
                            vm.user.docs.issued_date = dates[2] + '-' + dates[1] + '-' + dates[0]
                        }
                        xlog('vm.user.docs',vm.user.docs)
                    } else {
                        xlog('MODULE : DASHBOARD : PROFILE_EDIT : getContractorDocuments() error!')
                    }
                })
        }

        /**
         * Получение контактов контрактора
         */
        function getContractorsContacts() {
            $http.get(config.api + 'contractors/'+ vm.user.contractor.id +'/contacts?token=' + vm.token)
                .then(function(res){
                    if (res.data.result) {
                        vm.user.contacts = res.data.response;
                        vm.user.contacts.forEach(function(f){
                            if (f.contact_type_id === '3') {
                                vm.user.regAddress = JSON.parse(f.content).address;
                            } else if (f.contact_type_id === '4') {
                                vm.user.homeAddress = JSON.parse(f.content).address;
                            }
                        });
                        xlog('vm.user.contacts',vm.user.contacts)
                    } else {
                        xlog('MODULE : DASHBOARD : PROFILE_EDIT : getContractorsContacts() error!')
                    }
                })
        }

        /**
         * Добавление новго контакта к пользователю
         * @param type = contact_type_id для контакта
         */
        function btnAddContact(type) {
            if (type === 1) {
                vm.user.newPhone.push({
                    contact_type_id: type,
                    content: null
                })
            } else {
                vm.user.newEmail.push({
                    contact_type_id: type,
                    content: null
                })
            }

        }

        /**
         * Удаление контакта от пользователя
         * @param key - порядковый номер в массиве
         * @param from - откуда удалять? старый или вновь добавленные контакты
         */
        function deleteContacts(key, from, param) {
            if (param) {
                from.forEach(function(f,k){
                    if (f.id === key) {
                        from.splice(k,1)
                    }
                })
            } else {
                from.splice(key,1);
            }
        }

        /**
         * Сохранение всех внесенных изменений
         */
        function saveChanges() {

            if (!vm.user.havePassport) {
                let date = new Date(vm.user.contractor.birth_date),
                    data = {
                        token: vm.token,
                        is_juridical: vm.user.is_juridical ? 1 : 0,
                        birth_date: (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + ((date.getMonth()+1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '.' +date.getFullYear(),
                        is_primary: 1,
                        sex: vm.user.sex,
                        name: vm.user.last_name + ' ' + vm.user.name + ' ' + vm.user.middle_name
                    };
                    $http.post(config.api + 'contractors/create',data)
                        .then(function(res){
                            if (res.data.result) {
                                $http.get(config.api + 'contractors/primary?token=' + vm.token)
                                    .then(function(res){
                                        if (res.data.result) {
                                            vm.user.contractor = res.data.response;
                                            let data = {
                                                token: vm.token,
                                                name: vm.user.last_name,
                                                middle_name: vm.user.middle_name,
                                                last_name: vm.user.last_name,
                                                full_name: vm.user.last_name + ' ' + vm.user.name + ' ' + vm.user.middle_name,
                                                series: vm.user.passportSn.substring(0,4),
                                                number: vm.user.passportSn.substring(4,10),
                                                document_type_id: 1,
                                                issued: vm.user.docs.issued,
                                                issued_date: (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + ((date.getMonth()+1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '.' +date.getFullYear(),
                                                expiration_date: (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + ((date.getMonth()+1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '.' +(date.getFullYear()+100),
                                                content: ''
                                            };
                                            $http.post(config.api + 'contractors/'+vm.user.contractor.id+'/documents/create',data)
                                                .then(function(res){
                                                    // Сохранение телефонов
                                                    if (vm.user.newPhone.length > 0) {
                                                        xlog('vm.user.newPhone.length > 0');
                                                        vm.user.newPhone.forEach(function(f){
                                                            saveContractorContact(f.contact_type_id, f.content, res.data);
                                                        })
                                                    }

                                                    // Сохранение адресов электронной почты
                                                    if (vm.user.newEmail.length > 0) {
                                                        xlog('vm.user.newEmail.length > 0');
                                                        vm.user.newEmail.forEach(function(f){
                                                            saveContractorContact(f.contact_type_id, f.content);
                                                        })
                                                    }

                                                    // Сохранение адреса регистрации
                                                    if (vm.user.regAddress) {
                                                        saveContractorContact(3, vm.user.regAddress);
                                                    }

                                                    // Сохранение адреса прописки
                                                    if (vm.user.homeAddress) {
                                                        saveContractorContact(4, vm.user.homeAddress);
                                                    }

                                                    uploadPassportScans(); //Сохранение сканов паспорта

                                                    setTimeout(activate,3000); //Обновление данных через 3 секунды после завершения загрузки
                                                });
                                        }
                                    })
                            }
                        })
            } else {
                let date = new Date(vm.user.docs.issued_date),
                    data = {
                        token: vm.token,
                        name: vm.user.last_name,
                        middle_name: vm.user.middle_name,
                        last_name: vm.user.last_name,
                        full_name: vm.user.last_name + ' ' + vm.user.name + ' ' + vm.user.middle_name,
                        series: vm.user.passportSn.substring(0,4),
                        number: vm.user.passportSn.substring(4,10),
                        document_type_id: 1,
                        issued: vm.user.docs.issued,
                        issued_date: (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + ((date.getMonth()+1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '.' +date.getFullYear(),
                        expiration_date: (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + ((date.getMonth()+1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '.' +(date.getFullYear()+100),
                        content: ''
                    };
                $http.post(config.api + 'contractors/'+ vm.user.contractor.id +'/documents/create',data)
                    .then(function(res){
                        if (res.data.result) {
                            setTimeout(activate,3000);
                        }
                    })
            }
        }

        /**
         * Сохранение контактов
         */
        function saveContractorContact(id, content) {
            let data;
            if (id === 1 || id === 2) {
                data = {
                    token: vm.token,
                    contact_type_id: id,
                    content: content,
                    is_primary: 0
                };
            } else {
                data = {
                    token: vm.token,
                    contact_type_id: id,
                    content: JSON.stringify({
                        kladr: "",
                        index: "",
                        region: "",
                        disctrict: "",
                        city: "",
                        sub_city: "",
                        street: "",
                        building: "",
                        number: "",
                        address: content
                    }),
                    is_primary: 0
                };
            }
            $http.post(config.api + 'contractors/'+ vm.user.contractor.id +'/contacts/create',data)
                .then(function(res){
                    if (res.data.result) {
                        xlog('that!s OK');
                    }

                })
        }


        function uploadPassportScans() {
            vm.uploader1.queue[0].formData = [{
                token: vm.token,
                category_id: 27,
                owner_id: vm.user.contractor.id,
                user_phone: vm.user.phone,
                user_email: vm.user.email
            }];
            vm.uploader1.uploadAll();
            vm.uploader2.queue[0].formData = [{
                token: vm.token,
                category_id: 27,
                owner_id: vm.user.contractor.id,
                user_phone: vm.user.phone,
                user_email: vm.user.email
            }];
            vm.uploader2.uploadAll();
        }

        /**
         * Получение данных по пользователю
         */
        /*function dsf() {
            let data = {
                token: vm.token
            };
            $http.post(config.api + 'users/info',data)
                .then(function(res){
                    if (res.data.result) {

                    } else {
                        xlog('MODULE : DASHBOARD : PROFILE_EDIT : getUserInfo() error!')
                    }
                })
        }*/



        
    }
})();