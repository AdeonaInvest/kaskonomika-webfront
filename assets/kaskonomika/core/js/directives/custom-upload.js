/**
 * Created by Ravy on 22.09.2017.
 * Attributes:
 * multi - параметр, при котором возможен вывод нескольких фотографий
 */
(function() {
    'use strict';

    angular
        .module('kaskonomika')
        .directive('customUpload', [customUpload]);

    function customUpload() {
        return {
            template: function(elem, attr) {
                let index = attr.index;
                if (attr.multi === '1') {
                    return '<div class="custom-upload">' +
                        '<div>' +
                        '<label class="animated zoomIn">' +
                        '<input type="file" accept="image/jpeg,image/png,image/gif" nv-file-select uploader="vm.uploader'+attr.index+'" multiple required/>' +
                        '<span class="btn btn-primary btn-upload">'+attr.doc+'</span>' +
                        '</label>' +
                        '</div>' +
                        '</div>';
                } else {
                    return '<div class="custom-upload">' +
                        '<div ng-if="vm.uploader'+attr.index+'.queue.length == 0">' +
                        '<label class="animated zoomIn">' +
                        '<input type="file" accept="image/jpeg,image/png,image/gif" nv-file-select uploader="vm.uploader'+attr.index+'" required/>' +
                        '<span class="btn btn-primary btn-upload">'+attr.doc+'</span>' +
                        '</label>' +
                        '</div>' +
                        '<div ng-if="vm.uploader'+attr.index+'.queue.length > 0">' +
                        '<div class="btn-group animated zoomIn">' +
                        '<a type="button" class="btn btn-success" disabled="disabled">Скан прикреплен</a>' +
                        '<a type="button" class="btn btn-danger" ng-click="vm.clearQueue('+attr.index+')" uib-tooltip="Удалить">' +
                        '<i class="fa fa-trash-o"></i>' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
            }
        };
    }
})();
