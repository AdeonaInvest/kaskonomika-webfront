(function () {
    'use strict';

    angular
        .module('kaskonomika', [
            'ngRoute',
            'ngSanitize',
            'ngCookies'
        ])
        .constant('config', {
            version: '0.0.1', //Текущая версия сайта
            template: 'lada-landing', //Шаблон сайта
            theme: 'default', //Тема сайта
            mainUrl: window.location.protocol+ '//' + window.location.host,
            copy: 'Каскономика &copy &year',
            debug: window.location.host == 'kaskonomika.local:9360'
        })
        .config(config);

    config.$inject = ['$locationProvider'];

    function config ($locationProvider) {
        $locationProvider.html5Mode(true);
    }




    
})();