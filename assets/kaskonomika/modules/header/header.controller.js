(function () {
    'use strict';

    angular.module('kaskonomika')
        .controller('headerController', headerController);

    headerController.$inject = ['$scope','$window'];

    function headerController($scope,$window) {
        var vm = this;
        vm.scrollFromTop = false;
        vm.openOverlay = false;
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
        ];

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
        ];

        activate();
        /////////////////////
        function activate() {

        }

        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset > 0) {
                vm.scrollFromTop = true;
                console.log('Scrolled below header.');
            } else {
                vm.scrollFromTop = false;
                console.log('Header is in view.');
            }
            $scope.$apply();
        });
    }
})();

