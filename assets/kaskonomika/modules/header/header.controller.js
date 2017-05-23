(function () {
    'use strict';

    angular.module('kaskonomika')
        .controller('headerController', headerController);

    headerController.$inject = [];

    function headerController() {
        var vm = this;
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

    }
})();

