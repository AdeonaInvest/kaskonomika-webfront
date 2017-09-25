(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('fillingInsuranceController', fillingInsuranceController);

    fillingInsuranceController.$inject = ['$rootScope','$scope','$http','$location','FileUploader','config'];

    function fillingInsuranceController($rootScope,$scope,$http,$location,FileUploader,config) {
        ///////////////////
        let vm = this;
        vm.view = false; //Статус готовности отображения
        vm.fill = {
            avto: {},
            issueList: [],
            issueArray: [],
            currentTab: 0,
            holder: {
                phone: '+79850846060',
                email: 'aaaa@aaaaaaaa.aaaaa',
                name: 'Игорь',
                firstName: 'Привет',
                secondName: 'Пока',
                sex: '1'
            }
        };

        vm.nextStep = nextStep;
        vm.clearQueue1 = clearQueue1;
        vm.clearQueue2 = clearQueue2;
        vm.clearQueue3 = clearQueue2;
        vm.clearQueue4 = clearQueue2;

        activate();
        function activate() {
            vm.view = true;
            vm.fill.step = 1;
            getFindData();
        }
        
        //////////////////

        /**
         * Get findData from localStorage
         */
        function getFindData() {
            vm.findData = JSON.parse(localStorage.getItem('findData'));// -> All data for search
            if (vm.findData) {
                vm.findData.step = 11; // Установка дефолтного шага.
                xlog('MODULE : FILLING -> Find data received',vm.findData);
                getExecute();
            } else {
                $location.path('/')
            }
        }

        //Go to the next step with any properties
        function nextStep(step) {
            if (step === 1) {
                if ($rootScope.currentUser) {
                    vm.fill.step++
                } else {
                    vm.waiter = true;
                    vm.fill.holder.phoneError = false; //reset phone error
                    vm.fill.holder.emailError = false; //reset email error
                    $http.post(config.api + 'is_confirmed', {phone: vm.fill.holder.phone, email: vm.fill.holder.email})
                        .then(function(res){
                            if (res.data.result) {
                                vm.waiter = false;
                                // If EMAIL & PHONE not used
                                if (res.data.response.phone === -1 && res.data.response.email === -1) {
                                    let date = new Date(vm.fill.holder.birthday);
                                    let data = {
                                        phone: vm.fill.holder.phone,
                                        email: vm.fill.holder.email,
                                        login: vm.fill.holder.email,
                                        birth_date: (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())+'.'+(date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth())+'.'+date.getFullYear(),
                                        name: vm.fill.holder.firstName + vm.fill.holder.name + vm.fill.holder.secondName,
                                        sex: vm.fill.holder.sex
                                    }; //Set post data for registration
                                    $http.post(config.api + 'users/registration', data)
                                        .then(function(res){
                                            if (res.data.result) { // if result === true
                                                $rootScope.currentUser = res.data.response; //Save local & rootScope user data
                                                localStorage.setItem('currentUser', JSON.stringify($rootScope.currentUser)); //Save local & rootScope user data

                                                $rootScope.currentToken = res.data.token; //Save local & rootScope token
                                                localStorage.setItem('currentToken', JSON.stringify($rootScope.currentToken)); //Save local & rootScope token

                                                $rootScope.$broadcast('user'); //send all modules that user is login

                                                vm.regNow = true; //Go to confirmation page
                                            }
                                        })
                                }
                                //If PHONE already exist
                                else if (res.data.response.phone === '1' || res.data.response.phone === '0') {
                                    vm.fill.holder.phoneError = true; //set phone error
                                }
                                //If EMAIL already exist
                                else if (res.data.response.email === '1' || res.data.response.email === '0') {
                                    vm.fill.holder.emailError = true; //set email error
                                }
                            }
                        })
                }
            }
            else if (step === 'reg') {
                let data = {
                    phone: vm.fill.holder.phone, //User phone
                    sms_verification_code: vm.fill.confirmCode //User confirmation code
                };
                //TODO Test method. delete after testing
                if (data.sms_verification_code === '16724826') {
                    vm.regNow = false; //Hide block with confirmation code
                    vm.fill.step++; //Go to the next step
                    getExecute();
                }
                //Prod method
                else {
                    $http.post(config.api + 'users/confirmPhoneByCode',data)
                        .then(function(res){
                            if (res.data.result) {
                                vm.regNow = false; //Hide block with confirmation code
                                vm.fill.step++; //Go to the next step
                                getExecute();
                            } else {
                                vm.fill.confirmCode = undefined;
                                vm.fill.confirmCodeError = true; //Show error confirmation code
                            }
                        })
                }
            }
            else if (step === 2) {

            }
        }

        /**
         * Get execute for issues ids list
         */
        function getExecute() {

            vm.ready = false; //Hide sidebar & show loader

            //Parsing Date input
            let date = vm.fill.holder.birthday ? new Date(vm.fill.holder.birthday) : undefined,
                docDate = vm.fill.passport ? new Date(vm.fill.passport.date) : undefined,
                benDate = vm.fill.beneficiary ? new Date(vm.fill.beneficiary.birthday) : undefined,
                benDocDate = vm.fill.beneficiary ? new Date(vm.fill.beneficiary.passport.date) : undefined,
                ptsDate = vm.fill.avto.pts ? new Date(vm.fill.avto.pts.date) : undefined,
                stsDate = vm.fill.avto.sts ? new Date(vm.fill.avto.sts.date) : undefined;

            //Create Obj for execute
            let data = {
                mark_id: vm.findData.mark.mark || null,
                year: vm.findData.year || null,
                model_id: vm.findData.model.model || null,
                mark_model_id: vm.findData.mod.id || null,
                drivers_option_id: vm.findData.driver.id || null,
                age: vm.findData.age || null,
                experience_start_year: vm.findData.exp || null,
                sum: vm.findData.filter.sum || null,
                promocode: null,
                repair_glass: false,
                repair_body: false,
                repair_contractor: false,
                trans_keys: false,
                trans_taxi: false,
                entity: false,
                lastName: vm.fill.holder ? vm.fill.holder.firstName : null,
                firstName: vm.fill.holder ? vm.fill.holder.name : null,
                middleName: vm.fill.holder ? vm.fill.holder.secondName : null,
                sex: vm.fill.holder ? vm.fill.holder.sex : null,
                birthday: date ? ((date.getDate() < 10 ? '0'+date.getDate() : date.getDate())+'.'+(date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth())+'.'+date.getFullYear()) : null,
                phone: vm.fill.holder ? vm.fill.holder.phone : null,
                email: vm.fill.holder ? vm.fill.holder.email : null,
                docNumber: vm.fill.passport ? vm.fill.passport.serial : null,
                docDate: docDate ? ((docDate.getDate() < 10 ? '0'+docDate.getDate() : docDate.getDate())+'.'+(docDate.getMonth() < 10 ? '0'+docDate.getMonth() : docDate.getMonth())+'.'+docDate.getFullYear()) : null,
                docWho: vm.fill.passport ? vm.fill.passport.owner : null,
                benLastName: vm.fill.beneficiary ? vm.fill.beneficiary.firstName : null,
                benFirstName: vm.fill.beneficiary ? vm.fill.beneficiary.name : null,
                benMiddleName: vm.fill.beneficiary ? vm.fill.beneficiary.secondName : null,
                benSex: vm.fill.beneficiary ? vm.fill.beneficiary.sex : null,
                benBirtday: benDate ? ((benDate.getDate() < 10 ? '0'+benDate.getDate() : benDate.getDate())+'.'+(benDate.getMonth() < 10 ? '0'+benDate.getMonth() : benDate.getMonth())+'.'+benDate.getFullYear()) : null,
                benPhone: vm.fill.beneficiary ? vm.fill.beneficiary.phone : null,
                benEmail: vm.fill.beneficiary ? vm.fill.beneficiary.email : null,
                benDocNumber: vm.fill.beneficiary ? vm.fill.beneficiary.passport.serial : null,
                benDocDate: benDocDate ? ((benDocDate.getDate() < 10 ? '0'+benDocDate.getDate() : benDocDate.getDate())+'.'+(benDocDate.getMonth() < 10 ? '0'+benDocDate.getMonth() : benDocDate.getMonth())+'.'+benDocDate.getFullYear()) : null,
                benDocIssue: vm.fill.beneficiary ? vm.fill.beneficiary.passport.owner : null,
                ptsNumber: vm.fill.avto.pts ? vm.fill.avto.pts.serial : null,
                ptsDate: ptsDate ? ((ptsDate.getDate() < 10 ? '0'+ptsDate.getDate() : ptsDate.getDate())+'.'+(ptsDate.getMonth() < 10 ? '0'+ptsDate.getMonth() : ptsDate.getMonth())+'.'+ptsDate.getFullYear()) : null,
                stsNumber: vm.fill.avto.sts ? vm.fill.avto.sts.serial : null,
                stsDate: stsDate ? ((stsDate.getDate() < 10 ? '0'+stsDate.getDate() : stsDate.getDate())+'.'+(stsDate.getMonth() < 10 ? '0'+stsDate.getMonth() : stsDate.getMonth())+'.'+stsDate.getFullYear()) : null,
                gosNumber: vm.fill.avto ? vm.fill.avto.gosNumber : null,
                autoVin: vm.fill.avto ? vm.fill.avto.vin : null,
                driverLastName: null,
                driverFirstName: null,
                driverMiddleName: null,
                driverSex: null,
                driverBirthday: null,
                driverDocNumber: null,
                driverDocDate: null,
                driverDocDateTo: null,
                "drivers[1]['age']": vm.findData.filter.drivers[1] ? vm.findData.filter.drivers[1].age : null,
                "drivers[1]['experience_start_year']": vm.findData.filter.drivers[1] ? vm.findData.filter.drivers[1].exp : null,
                "drivers[2]['age']": vm.findData.filter.drivers[2] ? vm.findData.filter.drivers[2].age : null,
                "drivers[2]['experience_start_year']": vm.findData.filter.drivers[2] ? vm.findData.filter.drivers[2].exp : null,
                "drivers[3]['age']": vm.findData.filter.drivers[3] ? vm.findData.filter.drivers[3].age : null,
                "drivers[3]['experience_start_year']": vm.findData.filter.drivers[3] ? vm.findData.filter.drivers[3].exp : null,
                "drivers[4]['age']": vm.findData.filter.drivers[4] ? vm.findData.filter.drivers[4].age : null,
                "drivers[4]['experience_start_year']": vm.findData.filter.drivers[4] ? vm.findData.filter.drivers[4].exp : null
            };

            $http.post(config.api + 'calculations/execute',data) //Post data for execute
                .then(function(res){
                    if (res.data.result) { //If result === true
                        xlog('MODULE : FILLING -> Execute successfully');
                        vm.fill.issueArray = res.data.response.outer_ids; //Array ids of issues
                        vm.fill.issueList = []; //Clear isseres list

                        vm.fill.issueArray.forEach(function(f){
                            let postData = {
                                token: $rootScope.currentToken || null, //Current token
                                id: f //Issue id
                            };

                            //Async get results from issues list
                            $http.post(config.api + 'calculations/result', postData)
                                .then(function(res){
                                    if (res.data.result) { //Check OK result
                                        if (res.data.response.is_canceled === 0 && res.data.response.is_error === 0 && res.data.response.is_success === 1) { //Check for disabled item
                                            if (res.data.response.calculations_product_id === vm.findData.calculations_product_id) {
                                                res.data.response.active = true; //Set active status for current Issue to display active tab in sidebar
                                                vm.fill.activeIssue = res.data.response; //Set active data to active issue
                                                vm.ready = true; //Hide loader & show sidebar
                                            }
                                            vm.fill.issueList.push(res.data.response); //Create sidebar issues list for sidebar
                                        }
                                    }
                                })
                        })
                    }
                })
        }

        vm.setNewCurrentIssue = setNewCurrentIssue;
        function setNewCurrentIssue(issue, key){
            vm.fill.activeIssue = issue;
            vm.fill.currentTab = key;
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