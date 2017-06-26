(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('resultPageController', resultPageController);

    resultPageController.$inject = ['$scope'];

    function resultPageController($scope) {
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