/**
 * Created by Ravy on 31.03.2017.
 */
(function () {
    'use strict';

    angular
        .module('partners')
        .service('breadcrumbs', userService);

    userService.$inject = [];

    function userService() {
        this.dictionary = [
            {
                link: '/dashboard',
                name: 'Панель управления',
                icon: 'fa-dashboard'
            },
            {
                link: '/pso',
                name: 'ПСО',
                icon: 'fa-car'
            },
            {
                link: '/pso/item',
                name: 'Заявка на псо',
                icon: 'fa-car',
                parent:{
                    link: '/pso',
                    name: 'ПСО',
                    icon: 'fa-car'}
            },
            {
                link: '/losses',
                name: 'Убытки',
                icon: 'fa-rub'
            }
        ]
    }
})();