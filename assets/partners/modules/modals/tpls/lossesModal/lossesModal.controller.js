(function () {
    'use strict';

    angular
        .module('partners')
        .controller('lossesModalModalController', lossesModalModalController);

    lossesModalModalController.$inject = ['$rootScope','config','$http','$sce'];

    function lossesModalModalController($rootScope,config,$http,$sce) {
        let vm = this;

        vm.id = $rootScope.modalData.id;

        vm.getContractorInfo = getContractorInfo; //Получение данных по пользователю
        vm.getSecondParticipantInfo = getSecondParticipantInfo; //Получение данных по виновнику

        //////////////////////
        activate();

        function activate() {
            checkUser();
        }

        /////////////////////

        /**
         * Проверка залогенного пользователя
         */
        function checkUser() {
            vm.token = localStorage.getItem('token');
            getLossData();
        }

        /**
         * Получение подробных данных о заявлении
         */
        function getLossData(){
            $http.get(config.api + '/losses/applications/item/'+vm.id+'?token=' + vm.token)
                .then(function(res){
                    vm.ld = res.data.response;
                    vm.ld.photos = [];
                    vm.ld.address = JSON.parse(vm.ld.address);
                    if (vm.ld.files.scene.length > 0) {
                        vm.ld.files.scene.forEach(function(f){
                            vm.ld.photos.push(f.path)
                        })
                    }
                    if (vm.ld.files.details.length > 0) {
                        vm.ld.files.details.forEach(function(f){
                            if (f.path) {
                                vm.ld.photos.push(f.path)
                            }
                        })
                    }
                    if (vm.ld.files.overview.length > 0) {
                        vm.ld.files.overview.forEach(function(f){
                            if (f.path) {
                                vm.ld.photos.push(f.path)
                            }
                        })
                    }
                    if (vm.ld.files.required.length > 0) {
                        vm.ld.files.required.forEach(function(f){
                            if (f.path) {
                                vm.ld.photos.push(f.path)
                            }
                        })
                    }
                })
        }


        /**
         * Получение данных по пользователю
         * @param id
         */
        function getContractorInfo(id) {
            $http.get(config.api + '/contractors/' + id + '?token=' + vm.token)
                .then(function(res){
                    if (res.data.result) {
                        let html = '<div class="popover-html">' +
                            '<dl class="dl-horizontal">' +
                            '<dt>#</dt><dd>'+res.data.response[0].id+'</dd></dl>' +
                            '<dl class="dl-horizontal">' +
                            '<dt>Ф.И.О.</dt><dd>'+res.data.response[0].name +'</dd></dl>' +
                            '<dl class="dl-horizontal">' +
                            '<dt>Д.р.</dt><dd>'+res.data.response[0].birth_date+'</dd></dl>' +
                            '<dl class="dl-horizontal">' +
                            '<dt>Пол</dt><dd>'+res.data.response[0].sex+'</dd></dl>' +
                            '<dl class="dl-horizontal">' +
                            '<dt>Юр.статус</dt><dd>'+res.data.response[0].is_juridical+'</dd></dl>' +
                            '<dl class="dl-horizontal">' +
                            '<dt>Основной</dt><dd>'+res.data.response[0].is_primary+'</dd></dl>' +
                            '</div>';
                        vm.contractor = $sce.trustAsHtml(html);
                    }
                })
        }

        /**
         * Получение данных по виновнику
         * @param id
         */
        function getSecondParticipantInfo(id) {
            $http.get(config.api + '/contractors/' + id + '?token=' + vm.token)
                .then(function(res){
                    if (res.data.result) {
                        let html = '<div class="popover-html">' +
                            '<dl class="dl-horizontal">' +
                            '<dt>#</dt><dd>'+res.data.response[0].id+'</dd></dl>' +
                            '<dl class="dl-horizontal">' +
                            '<dt>Ф.И.О.</dt><dd>'+res.data.response[0].name +'</dd></dl>' +
                            '<dl class="dl-horizontal">' +
                            '<dt>Д.р.</dt><dd>'+res.data.response[0].birth_date+'</dd></dl>' +
                            '<dl class="dl-horizontal">' +
                            '<dt>Пол</dt><dd>'+res.data.response[0].sex+'</dd></dl>' +
                            '<dl class="dl-horizontal">' +
                            '<dt>Юр.статус</dt><dd>'+res.data.response[0].is_juridical+'</dd></dl>' +
                            '<dl class="dl-horizontal">' +
                            '<dt>Основной</dt><dd>'+res.data.response[0].is_primary+'</dd></dl>' +
                            '</div>';
                        vm.second_participant = $sce.trustAsHtml(html);
                    }
                })
        }
    }

})();