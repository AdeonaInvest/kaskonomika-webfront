(function () {
    'use strict';

    angular
        .module('streampub')
        .controller('popupRestoreController', popupRestoreController);

    popupRestoreController.$inject = ['authenticationService'];

    function popupRestoreController(authenticationService) {
        var vm = this;
        vm.step = 'form';
        vm.restorePassword = restorePassword;

        function restorePassword(email) {
            authenticationService.restorePswrd(email)
                .then(function(){
                    vm.step = 'ok';
                    vm.email = '';
                })
                .catch(function(){
                    vm.email = '';
                })
        }
    }

})();