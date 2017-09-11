(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('dashboardMainController', dashboardMainController);

    dashboardMainController.$inject = ['NgMap'];

    function dashboardMainController(NgMap) {
        var vm = this;
        vm.user = true; // Delete after test
        vm.dashboard = {
            scoring: 20, // Scoring data
            milage: {
                val: 3245, // Milage distance
                raw: 70 // Milage percent
            }  
        };


        activate();
        ///////////////////
        function activate() {
            // Work with map
            NgMap.getMap().then(function(map) {
                console.log(map.getCenter());
                console.log('markers', map.markers);
                console.log('shapes', map.shapes);
            });


        }

        function isUser() {
            if (vm.user) {

            } else {
                $location.path('/')
            }
        }
        
    }
})();