/**
 * Created by Ravy on 22.03.2017.
 */
(function () {
    'use strict';

    angular.module('partners')
        .controller('headerController', headerController);

    headerController.$inject = ['$rootScope'];

    function headerController($rootScope) {
        var vm = this;

        vm.toggleSideBar = toggleSideBar;

        function toggleSideBar() {

            //Enable sidebar push menu
            if ($(window).width() > (767)) {
                if ($("body").hasClass('sidebar-collapse')) {
                    $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                } else {
                    $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                }
            }
            //Handle sidebar push menu for small screens
            else {
                if ($("body").hasClass('sidebar-open')) {
                    $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                } else {
                    $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
                }
            }
            if ( $('body').hasClass('fixed') && $('body').hasClass('sidebar-mini') && $('body').hasClass('sidebar-collapse')) {
                $('.sidebar').css("overflow","visible");
                $('.main-sidebar').find(".slimScrollDiv").css("overflow","visible");
            }
            if ($('body').hasClass('only-sidebar')) {
                $('.sidebar').css("overflow","visible");
                $('.main-sidebar').find(".slimScrollDiv").css("overflow","visible");
            };
        }

    }
})();

