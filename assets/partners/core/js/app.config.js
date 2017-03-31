(function () {
    'use strict';

    angular
        .module('partners', [
            'ngRoute',
            'ngSanitize',
            'ngCookies',
            'ui.bootstrap'
        ])
        .constant('config', {
            api: 'https://api.kaskonomika.ru/v1',
            version: '0.0.1', //Текущая версия сайта
            template: 'partners', //Шаблон сайта
            theme: 'default', //Тема сайта
            mainUrl: window.location.protocol+ '//' + window.location.host,
            copy: 'Каскономика &copy &year',
            debug: window.location.host === 'partners.kaskonomika.local:9360',
            dictionary: {
                httpError: '<h3><i class="fa fa-exclamation-circle color-red"></i> Ошибка получения данных</h3>'
            }
        })
        .config(config);

    config.$inject = ['$locationProvider','$httpProvider'];

    function config ($locationProvider,$httpProvider) {

        // Надстройка для отправки кроссдоменных POST запросов
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
        
        $locationProvider.html5Mode(true); //Включение HTML5 роутинга без "#"
    }

})();