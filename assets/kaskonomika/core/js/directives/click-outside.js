// Отработка событий по клику вне объекта
(function() {
    'use strict';

    angular
        .module('angular-click-outside', [])
        .directive('clickOutside', [
            '$document', '$parse', '$timeout',
            clickOutside
        ]);

    function clickOutside($document, $parse, $timeout) {
        return {
            restrict: 'A',
            link: function($scope, elem, attr) {

                $timeout(function() {
                    let classList = (attr.outsideIfNot !== undefined) ? attr.outsideIfNot.split(/[ ,]+/) : [],
                        fn;

                    function eventHandler(e) {
                        let i,
                            element,
                            r,
                            id,
                            classNames,
                            l;

                        if (angular.element(elem).hasClass("ng-hide")) {
                            return;
                        }

                        if (!e || !e.target) {
                            return;
                        }

                        for (element = e.target; element; element = element.parentNode) {
                            if (element === elem[0]) {
                                return;
                            }
                            id = element.id,
                                classNames = element.className,
                                l = classList.length;


                            if (classNames && classNames.baseVal !== undefined) {
                                classNames = classNames.baseVal;
                            }

                            if (classNames || id) {
                                for (i = 0; i < l; i++) {
                                    r = new RegExp('\\b' + classList[i] + '\\b');
                                    if ((id !== undefined && id === classList[i]) || (classNames && r.test(classNames))) {
                                        return;
                                    }
                                }
                            }
                        }
                        $timeout(function() {
                            fn = $parse(attr['clickOutside']);
                            fn($scope, { event: e });
                        });
                    }

                    if (_hasTouch()) {
                        $document.on('touchstart', eventHandler);
                    }

                    $document.on('click', eventHandler);

                    $scope.$on('$destroy', function() {
                        if (_hasTouch()) {
                            $document.off('touchstart', eventHandler);
                        }

                        $document.off('click', eventHandler);
                    });

                    function _hasTouch() {
                        // works on most browsers, IE10/11 and Surface
                        return 'ontouchstart' in window || navigator.maxTouchPoints;
                    }
                });
            }
        };
    }
})();