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
            debug: window.location.host === 'partners.kaskonomika.local:9360'
        })
        .config(config);

    config.$inject = ['$locationProvider','$httpProvider'];

    function config ($locationProvider,$httpProvider) {
        
        //with the provider, in the app.config():
        //$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
        //or directly in the $http: this header will be used also by all calls after this one:
        //$httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
        
        $locationProvider.html5Mode(true);
    }

})();