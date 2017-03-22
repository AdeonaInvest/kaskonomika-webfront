$(function () {
    "use strict";

    /**
     * Скрытие / Отображение сайдбара
     * @type {{activate: $.pushMenu.activate}}
     */

    $(".content-wrapper").click(function () {
        //Enable hide menu when clicking on the content-wrapper on small screens
        if ($(window).width() <= (767) && $("body").hasClass("sidebar-open")) {
            $("body").removeClass('sidebar-open');
        }
    });

});