(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('faqController', faqController);

    faqController.$inject = ['$scope'];

    function faqController($scope) {
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