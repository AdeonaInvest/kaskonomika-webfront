(function () {
    'use strict';

    angular
        .module('partners')
        .controller('lossesModalModalController', lossesModalModalController);

    lossesModalModalController.$inject = ['$rootScope','config','$http'];

    function lossesModalModalController($rootScope,config,$http) {
        let vm = this;

        vm.id = $rootScope.modalData.id;

        console.log('srgfsdgfdg',$rootScope.modalData);



        activate();

        function activate() {
            checkUser();
        }

        /**
         * Проверка залогенного пользователя
         */
        function checkUser() {
            vm.token = localStorage.getItem('token');
            getLossData();
        }



        function getLossData(){
            $http.get(config.api + '/losses/applications/item/' + vm.id+ '?token=' + vm.token)
                .then(function(res){
                    vm.ld = res.data.response;
                    xlog('vm.lossData',vm.ld)
                })
        }
    }

})();