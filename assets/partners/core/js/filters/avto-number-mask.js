/**
 * Created by Ravy on 29.09.2017.
 */
(function () {
    'use strict';

    angular
        .module('partners')
        .filter('avtoNumberMask', avtoNumberMask);

    function avtoNumberMask() {
        return function (item) {
            if (item) {
                let number = {
                    one: item.substring(0,1),
                    two: item.substring(1,4),
                    three: item.substring(4,6),
                    four: item.substring(6,9)
                };
                return number.one + ' ' + number.two + ' ' + number.three + ' ' + number.four
            }
        }
    }
})();