(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('contactsController', contactsController);

    contactsController.$inject = ['$scope'];

    function contactsController($scope) {
        ///////////////////
        var vm = this;
        vm.view = false; //Статус готовности отображения
        activate();
        function activate() {
            $scope.$on('cfpLoadingBar:completed',function(){
                vm.view = true;
            });
        }
        //////////////////
        
    }
})();