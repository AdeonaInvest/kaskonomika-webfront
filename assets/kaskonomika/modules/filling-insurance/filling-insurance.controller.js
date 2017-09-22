(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('fillingInsuranceController', fillingInsuranceController);

    fillingInsuranceController.$inject = ['$rootScope','$scope','$http','$location','FileUploader','config'];

    function fillingInsuranceController($rootScope,$scope,$http,$location,FileUploader,config) {
        ///////////////////
        var vm = this;
        vm.view = false; //Статус готовности отображения
        vm.fill = {
            avto: {},
            passport: {
                img: new FileUploader()
            }
        };


        vm.fill.passport.img.onCompleteAll(function(){

        })

        vm.nextStep = nextStep;
        vm.submitResults = submitResults;
        vm.checkStep1Correct = checkStep1Correct;

        activate();
        function activate() {
            $scope.$on('cfpLoadingBar:completed',function(){
                vm.view = true;
                vm.fill.step = 2;
                getFindData();
            });

            /**
             * Создание файла настроек для загрузки файлов
             */
            $scope.$on('user',function(){
                vm.uploadOptions = {
                    url: config.api + 'storage/upload',
                    method: 'post',
                    formData: [{
                        token: $rootScope.currentToken,
                        category_id: 27,
                        owner_id: '',
                        user_phone: '',
                        user_email: ''
                    }
                    ],
                    autoUpload : true,
                    withCredentials: false
                }
            });
        }


        //////////////////

        /**
         * Get findData from localStorage
         */
        function getFindData() {
            $rootScope.findData = JSON.parse(localStorage.getItem('findData'));// -> All data for search
            if ($rootScope.findData) {
                $rootScope.findData.step = 11; // Установка дефолтного шага.
                xlog('findData',$rootScope.findData);
            } else {
                $location.path('/')
            }
        }

        /**
         * Go to the next step in filling
         */
        function nextStep() {
            vm.fill.step++
        }

        /**
         * Post results for create policy
         */
        function submitResults() {
            
        }

        function checkStep1Correct() {
            if (vm.fill.holder.firstName &&
                vm.fill.holder.name &&
                vm.fill.holder.secondName &&
                vm.fill.holder.sex &&
                vm.fill.holder.birthday) {

            }
        }
        
    }
})();