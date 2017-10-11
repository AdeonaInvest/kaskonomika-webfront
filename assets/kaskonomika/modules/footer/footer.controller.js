(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('footerController', footerController);

    footerController.$inject = [];

    function footerController() {
        let vm = this;
        
        activate();
        ///////////////////
        function activate() {
            getCurrentYear();
        }

        /**
         * Get current full Year -> 2017
         */
        function getCurrentYear() {
            let date = new Date();
            vm.currentYear = date.getFullYear();
        }
    }
})();

