(function () {
    'use strict';

    angular.module('kaskonomika')
        .controller('headerController', headerController);

    headerController.$inject = [];

    function headerController() {
        var vm = this;
        vm.openOverlay = false;

        activate();
        /////////////////////
        function activate() {

        }

    }
})();

