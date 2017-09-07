(function () {
    'use strict';

    angular
        .module('kaskonomika', [
            'ngRoute',
            'ngAnimate',
            'ngSanitize',
            'ngCookies',
            'ui.bootstrap',
            'ksSwiper',
            'angular-loading-bar',
            'cfp.loadingBar',
            'rzModule',
            'cleave.js',
            'ngMap'
        ])
        .constant('config', {
            version: '0.0.1', //Текущая версия сайта
            template: 'kaskonomika', //Шаблон сайта
            theme: 'default', //Тема сайта
            mainUrl: window.location.protocol+ '//' + window.location.host,
            copy: 'Каскономика &copy &year',
            debug: window.location.host == 'kaskonomika.local:9360',
            api: 'https://api.kaskonomika.ru/v1/'
        })
        .config(config);

    config.$inject = ['$locationProvider','cfpLoadingBarProvider'];

    function config ($locationProvider,cfpLoadingBarProvider) {
        
        /**
         * Включение HTML5 навигации для сайта
         */
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        
        /**
         * Настройки прелоадера
         */
        cfpLoadingBarProvider.includeSpinner = false; //Включение и отключение спиннера при загрузке
        cfpLoadingBarProvider.includeBar = true; //Включение и отключение полосы загрузки
        cfpLoadingBarProvider.latencyThreshold = 500; //Длительсность отключения прелоадера
    }

})();