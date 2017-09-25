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
            avto: {}
        };

        vm.submitResults = submitResults;
        vm.nextStep = nextStep;
        vm.clearQueue1 = clearQueue1;
        vm.clearQueue2 = clearQueue2;
        vm.clearQueue3 = clearQueue2;
        vm.clearQueue4 = clearQueue2;

        activate();
        function activate() {
            $scope.$on('cfpLoadingBar:completed',function(){
                vm.view = true;
                vm.fill.step = 1;
                getFindData();
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

        function nextStep(step) {
            if (step === 1) {
                if ($rootScope.currentUser) {
                    vm.fill.step++
                } else {
                    vm.regNow = true;
                }
            } else if (step === 2) {
                
            }

        }

        /**
         * Go to the next step in filling
         */
        /*function nextStep() {
            vm.fill.step++
        }*/

        /**
         * Post results for create policy
         */
        function submitResults() {
            
        }

        
        //---------------------------------------------------- UPLOADER -----------------------------------------/

        /**
         * Создание настроек для загрузки файлов
         */
        $scope.$on('user',function(){
            vm.uploaderOptions = {
                url: config.api + 'storage/upload',
                method: 'post',
                formData: [{
                    token: $rootScope.currentToken,
                    category_id: 27,
                    owner_id: '',
                    user_phone: '',
                    user_email: ''
                }],
                autoUpload : true,
                withCredentials: false
            };

            vm.uploader1 = new FileUploader(vm.uploaderOptions);
            vm.uploader2 = new FileUploader(vm.uploaderOptions);
            vm.uploader3 = new FileUploader(vm.uploaderOptions);
            vm.uploader4 = new FileUploader(vm.uploaderOptions);

            vm.uploader1.onAfterAddingAll = function(res){
                console.log('onCompleteAll',vm.uploader1.queue[0]._file);
                //TODO здесь должен быть переход на следующий слайд при успешной загрузке картинки
            };

            vm.uploader2.onAfterAddingAll = function(res){
                console.log('onCompleteAll',vm.uploader2.queue[0]._file);
                //TODO здесь должен быть переход на следующий слайд при успешной загрузке картинки
            };

            vm.uploader3.onAfterAddingAll = function(res){
                console.log('onCompleteAll',vm.uploader3.queue[0]._file);
                //TODO здесь должен быть переход на следующий слайд при успешной загрузке картинки
            };

            vm.uploader3.onAfterAddingAll = function(res){
                console.log('onCompleteAll',vm.uploader3.queue[0]._file);
                //TODO здесь должен быть переход на следующий слайд при успешной загрузке картинки
            };
        });

        /**
         * Удаление изображения из очереди
         */
        function clearQueue1() {
            vm.uploader1.destroy();
            vm.uploader1 = new FileUploader(vm.uploaderOptions);
        }

        /**
         * Удаление изображения из очереди
         */
        function clearQueue2() {
            vm.uploader2.destroy();
            vm.uploader2 = new FileUploader(vm.uploaderOptions);
        }

        /**
         * Удаление изображения из очереди
         */
        function clearQueue3() {
            vm.uploader3.destroy();
            vm.uploader3 = new FileUploader(vm.uploaderOptions);
        }

        /**
         * Удаление изображения из очереди
         */
        function clearQueue4() {
            vm.uploader4.destroy();
            vm.uploader4 = new FileUploader(vm.uploaderOptions);
        }


    }
})();