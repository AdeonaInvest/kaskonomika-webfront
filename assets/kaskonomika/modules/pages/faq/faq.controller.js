(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('faqController', faqController);

    faqController.$inject = ['$scope','$http'];

    function faqController($scope,$http) {
        ///////////////////
        var vm = this;
        vm.view = false; //Статус готовности отображения
        activate();
        function activate() {
            $scope.$on('cfpLoadingBar:completed',function(){
                vm.view = true;
            });
            getQuestions(); //Получение вопросов
        }
        //////////////////
        vm.accordeonClose = true;

        /**
         * Получение вопросов из JSON файла. Расположение: /src/common/json
         */
        function getQuestions() {
            $http.get('https://sitelaravel.kaskonomika.ru/faq/section/list')
                .then(function(response){
                    vm.questionsResp = response.data;
                })
        }
        
    }
})();