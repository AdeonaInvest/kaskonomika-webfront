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
                path: '/pso'/*,
                child: [
                    {
                        name: 'Список заявок',
                        icon: 'fa-list',
                        path: '/pso'
                    },
                    {
                        name: 'Просмотр заявки',
                        icon: 'fa-file-text-o',
                        path: '/pso/look-item'
                    }
                ]*/
            },
            {
                name: 'Убытки',
                icon: 'fa-rub',
                path: '/losses'
            }
        ];
               

        activate();
        /////////////////////
        function activate() {

        }

        

    }
})();

