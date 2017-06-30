(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('resultPageController', resultPageController);

    resultPageController.$inject = ['$rootScope','$scope','$routeParams'];

    function resultPageController($rootScope,$scope,$routeParams) {
        ///////////////////
        var vm = this;
        vm.view = false; //Статус готовности отображения
        vm.routeParams = $routeParams;
        activate();
        function activate() {
            $scope.$on('cfpLoadingBar:completed',function(){
                vm.view = true;
            });
        }
        //////////////////

        $scope.$on('$includeContentLoaded',function(){
            if ($rootScope.findData) {
                if (localStorage.getItem('findData')) {
                    var data = localStorage.getItem('findData'),
                        all = localStorage.getItem('allData');
                    $rootScope.findData = JSON.parse(data);
                    $rootScope.allData = JSON.parse(all);
                    $rootScope.findData.step = 9;
                    console.log('vm.find',$rootScope.findData);
                }
            }
        });


    }
})();