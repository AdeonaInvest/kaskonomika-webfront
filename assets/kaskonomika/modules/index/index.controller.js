(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('indexController', indexController);

    indexController.$inject = [];

    function indexController() {
        var vm = this;
        
        activate();
        ///////////////////
        function activate() {
            
        }

        vm.templates =[
            { name: 'section1.html', url: 'section1.html'},
            { name: 'section2.html', url: 'section2.html'}
        ];
        vm.template = vm.templates[0];
        
    }
})();