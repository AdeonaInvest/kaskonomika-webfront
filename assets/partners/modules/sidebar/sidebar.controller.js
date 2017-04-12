/**
 * Created by Ravy on 22.03.2017.
 */
(function () {
    'use strict';

    angular.module('partners')
        .controller('sidebarController', sidebarController);

    sidebarController.$inject = [];

    function sidebarController() {
        var vm = this;
        
        vm.menu = [
            {
                name: 'Панель управления',
                icon: 'fa-dashboard',
                path: '/dashboard'
            },
            {
                name: 'ПСО',
                icon: 'fa-car',
                path: '/pso/list',
                child: [
                    {
                        name: 'Список заявок',
                        icon: 'fa-list',
                        path: '/pso/list'
                    },
                    {
                        name: 'Поиск заявка',
                        icon: 'fa-search',
                        path: '/pso/search'
                    }
                ]
            },
            {
                name: 'Убытки',
                icon: 'fa-rub',
                path: '/losses/list',
                child: [
                    {
                        name: 'Список убытков',
                        icon: 'fa-list',
                        path: '/losses/list'
                    }
                ]
            },
            {
                name: 'Телематика',
                icon: 'fa-map-marker',
                path: '/telematics/list',
                child: [
                    {
                        name: 'Список авто',
                        icon: 'fa-list',
                        path: '/telematics/list'
                    }
                ]
            }
        ];
               

        activate();
        /////////////////////
        function activate() {

        }

        

    }
})();

