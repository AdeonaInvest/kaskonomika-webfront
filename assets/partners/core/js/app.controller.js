(function () {
    'use strict';

    angular
        .module('partners')
        .controller('appController', appController);

    appController.$inject = ['$rootScope','$location','$scope','intercomService','userService'];

    function appController($rootScope,$location,$scope,intercomService,userService) {

        activate();

        function activate(){
            onChangePath();
            
            //Реакция на вход / выход на любой вкладке
            intercomService.on('authentication.login', _onLogin);
        }

        //Событие, если пользователь вошел в аккаунт
        function _onLogin() {
            return userService
                .loadUserProfile()
                .then(function () {
                    $rootScope.user = userService.getUserProfile();
                })

        }

        /**
         * Отслежинивае измнения текущего URL
         */
        function onChangePath(){
            $scope.$on('$routeChangeSuccess',function(){
                getCurrentPath();
            });
        }

        /**
         * Отслеживание текущего URL сайта
         */
        function getCurrentPath(){
            $rootScope.currentUrl = $location.path();
            if ($rootScope.currentUrl == '/') {
                $rootScope.isIndexPage = true;
            } else {
                $rootScope.isIndexPage = false
            }
        }
        
        
    }

})();

