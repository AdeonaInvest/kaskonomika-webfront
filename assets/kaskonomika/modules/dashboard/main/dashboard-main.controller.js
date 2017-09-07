(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('dashboardMainController', dashboardMainController);

    dashboardMainController.$inject = ['NgMap'];

    function dashboardMainController(NgMap) {
        var vm = this;


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
        
    }
})();