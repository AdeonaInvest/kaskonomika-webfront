(function () {
    'use strict';

    angular.module('kaskonomika')
        .controller('headerController', headerController);

    headerController.$inject = ['$rootScope','$scope','$window','$timeout'];

    function headerController($rootScope,$scope,$window,$timeout) {
        var vm = this;
        vm.scrollFromTop = false; //Состояние скролла - отодвинут ли скролл сверху.
        vm.openOverlay = false; //Состояние оверлея. false - закрыт
        vm.mainMenu = [
            {
                text: 'Умное страхование',
                url: '/'
            },
            {
                text: 'Как это работает',
                url: '/how-it-work'
            },
            {
                text: 'Вопросы и ответы',
                url: '/faq'
            },
            {
                text: 'Скачать приложение',
                url: '/download'
            }
        ]; //Пункты главного меню
        vm.subMenu = [
            {
                text: 'Реквизиты',
                url: '/requisites'
            },
            {
                text: 'Оплата и доставка',
                url: '/shipping'
            },
            {
                text: 'Политика конфиденциальности',
                url: '/privacy_policy'
            },
            {
                text: 'Контакты',
                url: '/contacts'
            }
        ]; //Пункты меню оверлея
        vm.showCalc = $rootScope.showCalc;


        ///////////////////
        activate();
        function activate() {
            $scope.$on('cfpLoadingBar:completed',function(){
                vm.view = true;
            });

            $timeout(function(){
                vm.view = true;
            },3000)
        }
        ///////////////////

        /**
         * Отслеживание прокрутки скролла документа
         */
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset > 0) {
                vm.scrollFromTop = true;
            } else {
                vm.scrollFromTop = false;
            }
            $scope.$apply();
        });
    }
})();

