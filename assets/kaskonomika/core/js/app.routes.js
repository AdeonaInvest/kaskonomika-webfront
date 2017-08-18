(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .config(config);

    config.$inject = ['$routeProvider'];
    
    function config ($routeProvider) {
        $routeProvider
            .when ('/', {
                templateUrl: '/pages/index/index.html',
                controller: 'indexController',
                controllerAs: 'vm'
            })
            .when ('/how-it-work', {
                templateUrl: '/pages/how-it-work/how-it-work.html',
                controller: 'howItWorkController',
                controllerAs: 'vm'
            })
            .when ('/faq', {
                templateUrl: '/pages/faq/faq.html',
                controller: 'faqController',
                controllerAs: 'vm'
            })
            .when ('/download', {
                templateUrl: '/pages/download/download.html',
                controller: 'downloadController',
                controllerAs: 'vm'
            })
            .when ('/requisites', {
                templateUrl: '/pages/requisites/requisites.html',
                controller: 'requisitesController',
                controllerAs: 'vm'
            })
            .when ('/payment-and-delivery', {
                templateUrl: '/pages/payment-and-delivery/payment-and-delivery.html',
                controller: 'paymentAndDeliveryController',
                controllerAs: 'vm'
            })
            .when ('/privacy-policy', {
                templateUrl: '/pages/private-policy/private-policy.html',
                controller: 'privatePolicyController',
                controllerAs: 'vm'
            })
            /*.when ('/contacts', {
                templateUrl: '/pages/contacts/contacts.html',
                controller: 'contactsController',
                controllerAs: 'vm'
            })*/
            .when ('/result-page', {
                templateUrl: '/pages/result-page/result-page.html',
                controller: 'resultPageController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();