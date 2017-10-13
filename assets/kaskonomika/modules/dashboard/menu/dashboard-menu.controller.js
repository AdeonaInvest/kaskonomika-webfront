(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('dashboardMenuController', dashboardMenuController);

    dashboardMenuController.$inject = ['$http','config'];

    function dashboardMenuController($http,config) {
        let vm = this;

        activate();
        ///////////////////
        function activate() {
            getCarsList()
        }

        /**
         * Получение списка авто
         */
        function getCarsList() {
            let token = function token(){
                return localStorage.getItem('currentToken');
            };
            if (token) {
                $http.get(config.api + 'policies/vehicles?token=' + token())
                    .then(function(res){
                        if (res.data.result) {
                            if (res.data.response.length > 0 ) {
                                vm.is_cars = true;
                            }
                            xlog('$rootScope.is_cars',vm.is_cars)
                        }
                    })
            }
        }
        
    }
})();