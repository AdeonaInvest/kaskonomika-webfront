(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('downloadController', downloadController);

    downloadController.$inject = ['$scope'];

    function downloadController($scope) {
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