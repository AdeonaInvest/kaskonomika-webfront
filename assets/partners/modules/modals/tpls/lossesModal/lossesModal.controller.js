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
        vm.saveComment = saveComment; //Сохранение комментария
        vm.deleteComment = deleteComment; //Удаление комментария
        vm.editComment = editComment; //Редактирование комментария

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
                    vm.ld.titles = [];
                    vm.ld.address = JSON.parse(vm.ld.address);
                    if (vm.ld.files.scene.length > 0) {
                        vm.ld.files.scene.forEach(function(f){
                            vm.ld.photos.push(f.path);
                            vm.ld.titles.push(f.category)
                        })
                    }
                    if (vm.ld.files.details.length > 0) {
                        vm.ld.files.details.forEach(function(f){
                            if (f.path) {
                                vm.ld.photos.push(f.path);
                                vm.ld.titles.push(f.category)
                            }
                        })
                    }
                    if (vm.ld.files.overview.length > 0) {
                        vm.ld.files.overview.forEach(function(f){
                            if (f.path) {
                                vm.ld.photos.push(f.path);
                                vm.ld.titles.push(f.category)
                            }
                        })
                    }
                    if (vm.ld.files.required.length > 0) {
                        vm.ld.files.required.forEach(function(f){
                            if (f.path) {
                                vm.ld.photos.push(f.path);
                                vm.ld.titles.push(f.category)
                            }
                        })
                    }
                })
                .then(getComments('status')) //Получение списка комментариев
                .then(getComments('application')) //Получение списка комментариев
        }

        /**
         * Сохранение комментария
         */
        function saveComment(type, text) {
            if (vm.edit) {
                let data = {
                    text: text
                };
                $http.put(config.api + '/losses/applications/'+vm.id+'/comments/'+vm.edit.comment+'?token='+vm.token,data)
                    .then(function(res){
                        if (res.data.result) {
                            vm.commentLosses = null;
                            vm.commentStatus = null;
                            vm.edit = undefined;
                            getComments(type)
                        } else {
                            vm.commentLosses = null;
                            vm.commentStatus = null;
                            vm.edit = undefined;
                        }
                    })
            } else {
                let data = {
                    token: vm.token,
                    type: type,
                    text: text
                };
                $http.post(config.api + '/losses/applications/'+vm.id+'/comments',data)
                    .then(function(res){
                        if (res.data.result) {
                            if (type === 'status') {
                                getComments('status')
                            } else if (type === 'application') {
                                getComments('application')
                            }
                        }
                    })
                    .then(function(){
                        vm.commentLosses = null;
                        vm.commentStatus = null;
                        vm.edit = undefined;
                    })
            }
        }

        /**
         * Получение списка комментариев
         * @param type - тип необходимого комментария
         */
        function getComments(type) {
            if (type === 'status') {
                vm.commentsStatus = undefined;
            } else if (type === 'application') {
                vm.commentsApp = undefined;
            }
            $http.get(config.api + '/losses/applications/'+vm.id+'/comments?type='+type+'&token='+vm.token)
                .then(function(res){
                    if (res.data.result) {
                        if (type === 'status') {
                            vm.commentsStatus = res.data.response;
                        } else if (type === 'application') {
                            vm.commentsApp = res.data.response;
                        }
                    }
                })
        }

        /**
         * Удаление комментария
         * @param id - ID самого комментария
         * @param type - тип комментария (application, status)
         */
        function deleteComment(id,type) {
            $http.delete(config.api + '/losses/applications/'+vm.id+'/comments/'+id+'?token='+vm.token)
                .then(function(res){
                    if (res.data.result) {
                        if (type === 'status') {
                            getComments('status')
                        } else if (type === 'application') {
                            getComments('application')
                        }
                    }
                })
        }

        /**
         * Редактирование комментария
         * @param comment - весь объект коммента
         * @param type - тип комментария
         */
        function editComment(comment,type) {
            if (type === 'status') {
                vm.commentStatus = comment.comment;
            } else if (type === 'application') {
                vm.commentLosses = comment.comment;
            }
            vm.edit = {
                comment: comment.id
            }
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
            if (vm.ld.second_participant.length > 0) {
                let html = '<div class="popover-html">' +
                    '<dl class="dl-horizontal">' +
                    '<dt>#</dt><dd>'+vm.ld.second_participant.id+'</dd></dl>' +
                    '<dl class="dl-horizontal">' +
                    '<dt>Ф.И.О.</dt><dd>'+vm.ld.second_participant.name+'</dd></dl>' +
                    '<dl class="dl-horizontal">' +
                    '<dt>Д.р.</dt><dd>'+vm.ld.second_participant.birth_date+'</dd></dl>' +
                    '<dl class="dl-horizontal">' +
                    '<dt>Авто</dt><dd>'+vm.ld.second_participant.car.mark_model+'</dd></dl>' +
                    '<dl class="dl-horizontal">' +
                    '<dt>Номер</dt><dd>'+vm.ld.second_participant.car.reg_plate+'</dd></dl>' +
                    '<dl class="dl-horizontal">' +
                    '<dt>Страховая компания</dt><dd>'+vm.ld.second_participant.osago.company+'</dd></dl>' +
                    '<dl class="dl-horizontal">' +
                    '<dt>Номер осаго</dt><dd>'+vm.ld.second_participant.osago.serie+' '+vm.ld.second_participant.osago.number+'</dd></dl>' +
                    '<dl class="dl-horizontal">' +
                    '<dt>Юр.статус</dt><dd>'+vm.ld.second_participant.is_juridical+'</dd></dl>' +
                    '</div>';
                vm.second_participant = $sce.trustAsHtml(html);
            }
        }
    }

})();