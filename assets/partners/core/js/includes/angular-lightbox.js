/**
 * Simple lightbox
 * Author: Alexandre Bodelot <alexandre.bodelot@gmail.com>
 * Usage:
 * <ANY lightbox="imageUrlArray">
 *   <ANY href="imageUrl" class="lightbox-trigger"></ANY>
 * </ANY>
 */
angular.module('angular-lightbox', [])
    .directive('lightbox', function() {
        return{
            restrict: 'A',
            scope: {
                images: '=lightbox'
            },
            link: function(scope, element, attrs) {
                $(element).on('click', '.lightbox-trigger', function(event) {
                    // If ctrl key or middle button pressed
                    if (event.ctrlKey || event.which == 2) {
                        // Open image in new tab
                        window.open(this.href, '_blank');
                    }
                    else {
                        // Build DOM
                        let dom = $(
                            '<div class="angular-lightbox-overlay" style="display: none">' +
                            '<a href class="previous" title="Назад"><i class="fa fa-angle-left"></i></a>' +
                            '<span class="angular-lightbox-inner">' +
                            '<img src="" />' +
                            '<a href class="close" title="Закрыть">закрыть</a>' +
                            '</span>' +
                            '<a href class="next" title="Вперед"><i class="fa fa-angle-right"></i></a>' +
                            '</div>'
                        );
                        scope.dom = dom;
                        scope.image = dom.find('img')[0];
                        dom.appendTo(document.body);

                        let index = scope.images.indexOf($(this).attr('href'));

                        scope.loadImageAt(index);

                        // Previous image button
                        dom.on('click', 'a.previous', function() {
                            scope.showPrevious();
                            return false;
                        });

                        // Next image button
                        dom.on('click', 'a.next', function() {
                            scope.showNext();
                            return false;
                        });

                        // Close button
                        dom.on('click', 'a.close', function() {
                            dom.remove();
                            return false;
                        });

                        // Handle keyboard shortcuts
                        $(document).keydown(function(e) {
                            switch (e.which) {
                                case 37: // Left arrow
                                    scope.showPrevious();
                                    break;
                                case 39: // Right arow
                                    scope.showNext();
                                    break;
                                case 36: // Home
                                    scope.loadImageAt(0);
                                    break;
                                case 35: // End
                                    scope.loadImageAt(scope.images.length - 1);
                                    break;
                                case 27: // Escape
                                    dom.remove();
                                    break;
                            }
                        });
                    }
                    return false;
                });

                /**
                 * Load image at given index
                 */
                scope.loadImageAt = function(index) {
                    scope.path = scope.images[index];
                    let img = new Image();
                    let inner = scope.dom.find('.angular-lightbox-inner');
                    let text = scope.dom.find('.angular-lightbox-inner').find('.img-title');
                    img.onload = function() {
                        inner[0].replaceChild(this, scope.image);
                        scope.image = this;
                        scope.dom.show();
                    };
                    img.onerror = function() {
                        inner[0].replaceChild(this, scope.image);
                        scope.image = this;
                        scope.dom.show();
                    };
                    img.title = (index + 1) + '/' + scope.images.length;
                    img.src = scope.path; // Trigger image loading
                    img.alt = scope.path;
                    text.html(scope.images[index].text);
                };

                /**
                 * Display previous image in scope.images
                 */
                scope.showPrevious = function() {
                    let index = scope.images.indexOf(scope.path) - 1;
                    scope.loadImageAt(index == -1 ? scope.images.length - 1 : index);
                };

                /**
                 * Display next image in scope.images
                 */
                scope.showNext = function() {
                    let index = scope.images.indexOf(scope.path) + 1;
                    scope.loadImageAt(index == scope.images.length ? 0 : index);
                };
            }
        };
    });