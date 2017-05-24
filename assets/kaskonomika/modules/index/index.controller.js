(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('indexController', indexController);

    indexController.$inject = [];

    function indexController() {
        var vm = this;
        
        activate();
        ///////////////////
        function activate() {
            
        }

        // Список партнеров
        vm.partnersList = [
            {
                src: '/src/img/partners/soglasie.png',
                url: '//http://www.soglasie.ru',
                alt: 'Страховая кампания Согласие'
            },
            {
                src: '/src/img/partners/absolut.png',
                url: '//www.absolutins.ru',
                alt: 'Страховая кампания Абсолют'
            },
            {
                src: '/src/img/partners/tinkoff.png',
                url: '//www.tinkoffinsurance.ru',
                alt: 'Тинькофф страхование'
            },
            {
                src: '/src/img/partners/vsk.png',
                url: '//www.vsk.ru',
                alt: 'ВСК-групп'
            },
            {
                src: '/src/img/partners/ergo.png',
                url: '//http://ergo.ru/',
                alt: 'Страховая кампания ERGO'
            }
        ]
        vm.accordeon = true;
        vm.accordeonOpen = true;
        
    }
})();