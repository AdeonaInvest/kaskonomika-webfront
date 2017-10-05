(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('dashboardEditController', dashboardEditController);

    dashboardEditController.$inject = ['FileUploader','$http','config','$location'];

    function dashboardEditController(FileUploader,$http,config,$location) {
        let vm = this;

        vm.user = {
            is_juridical: false,
            newPhone: [],
            newEmail: []
        }; //Данные пользователя на странице

        vm.clearQueue = clearQueue; //Удаление изображения из очереди
        vm.btnAddContact = btnAddContact; //Добавление новго контакта к пользователю
        vm.deleteContacts = deleteContacts; //Удаление контакта от пользователя
        vm.saveChanges = saveChanges; //Сохранение всех внесенных изменений

        activate();
        ///////////////////
        function activate() {
            checkUser();
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
                        if (res.data.response[0]) vm.user.hasePassport = true;
                        vm.user.passportSn = vm.user.docs.series + ' ' + vm.user.docs.number;
                        vm.user.last_name = vm.user.docs.last_name;
                        vm.user.name = vm.user.docs.name;
                        vm.user.middle_name = vm.user.docs.middle_name;
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

            if (!vm.user.hasePassport) {
                let date = new Date(vm.user.contractor.birth_date),
                    data = {
                        token: vm.token,
                        is_juridical: vm.user.is_juridical,
                        birth_date: date.getDate() + '.' + ((date.getMonth()+1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + date.getFullYear(),
                        is_primary: 1,
                        sex: vm.user.sex,
                        name: vm.user.last_name + ' ' + vm.user.name + ' ' + vm.user.middle_name
                    };
                    $http.post(config.api + 'contractors/create',data)
                        .then(function(res){
                            if (res.data.result) {
                                
                            }
                        })
            }

            // Сохранение телефонов
            if (vm.user.newPhone.length > 0) {
                vm.user.newPhone.forEach(function(f){
                    saveContractorContact(f.contact_type_id, f.content);
                })
            }

            // Сохранение адресов электронной почты
            if (vm.user.newEmail.length > 0) {
                vm.user.newPhone.forEach(function(f){
                    saveContractorContact(f.contact_type_id, f.content);
                })
            }





        }

        /**
         * Сохранение контактов
         */
        function saveContractorContact(id, content) {
            let data = {
                token: vm.token,
                contact_type_id: id,
                content: content,
                is_primary: 0
            };
            $http.post(config.api + '/contractors/'+ vm.user.contractor.id +'/contacts/create',data)
                .then(function(res){
                    if (res.data.result) {
                        xlog('that!s OK');
                    }

                })
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