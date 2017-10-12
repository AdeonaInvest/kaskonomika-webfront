(function () {
    'use strict';

    angular
        .module('kaskonomika')
        .controller('fillingInsuranceController', fillingInsuranceController);

    fillingInsuranceController.$inject = ['$rootScope','$scope','$http','$location','FileUploader','config','$window'];

    function fillingInsuranceController($rootScope,$scope,$http,$location,FileUploader,config,$window) {
        ///////////////////
        let vm = this;
        vm.view = false; //Статус готовности отображения
        vm.fill = {
            avto: {}, //Data for avto query
            issueList: [], //Tabs array for sidebar
            issueArray: [], //Array all issues from server
            currentTab: 0, //Start tab in sidaber
            response: {}, //Data from $http.posts
            step: 1, //Start step
            risks: [], //Array of risks from Execution -> Results
            holder: {},
            drivers: []
        };

        vm.nextStep = nextStep;
        vm.setNewCurrentIssue = setNewCurrentIssue;
        vm.clearQueue = clearQueue;
        vm.backStep = backStep;

        activate();
        function activate() {
            vm.view = true;
            $scope.$on('$includeContentLoaded', function () {
                $rootScope.findData.step = 11; // Установка дефолтного шага.
            });
            checkUser();
        }
        
        //////////////////

        /**
         * Проверка залогенного пользователя
         */
        function checkUser() {
            vm.user = JSON.parse(localStorage.getItem('currentUser'));
            vm.token = localStorage.getItem('currentToken');
            if (vm.user) {
                vm.fill.holder.phone = vm.user.phone;
                vm.fill.holder.email = vm.user.email;
            }

            xlog('vm.user',vm.user)

            getFindData(); //Get findData from localStorage()
        }

        /**
         * Get findData from localStorage
         */
        function getFindData() {
            vm.findData = JSON.parse(localStorage.getItem('findData'));// -> All data for search
            if (vm.findData) {
                xlog('MODULE : FILLING -> FindData received',vm.findData);
                getExecute();
            } else {
                $location.path('/')
            }
        }


        //Go to the next step with any properties
        function nextStep(step) {
            if (step === 1) {
                if ($rootScope.currentUser) {
                    $rootScope.$broadcast('user'); //send all modules that user is login
                    vm.fill.step++;
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
                                        birth_date: (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())+'.'+((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1))+'.'+date.getFullYear(),
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
                step2ConstructorIsExists().then(function(res){
                        if (res.data.result) {
                            step2ContractorCreate(res).then(function(res){
                                    if (res.data.result) {
                                        step2ContractorDocsCreate(res).then(function(res){
                                                if (res.data.result) {
                                                    step2ContractorPhoneCreate(res).then(function(res){
                                                            if (res.data.result) {
                                                                step2ContractorEmailCreate(res).then(function(res){
                                                                        if (res.data.result) {
                                                                            step2ContractorFinallyStep(res);
                                                                        } else breakFilling();
                                                                    })
                                                            } else breakFilling();
                                                        })
                                                } else breakFilling();
                                            })
                                    } else breakFilling();
                                })
                        } else breakFilling();
                    });
            }
            else if (step === 3) {
                if (vm.overlap) {
                    vm.fill.step++; //Go to the next step
                    getExecute();
                } else {
                    step3ConstructorIsExists()
                        .then(function(res){
                            if (res.data.result) {
                                step3ContractorCreate(res)
                                    .then(function(res){
                                        if (res.data.result) {
                                            step3ContractorDocsCreate(res)
                                                .then(function(res){
                                                    if (res.data.result) {
                                                        step3ContractorPhoneCreate(res)
                                                            .then(function(res){
                                                                if (res.data.result) {
                                                                    step3ContractorEmailCreate(res)
                                                                        .then(function(res){
                                                                            if (res.data.result) {
                                                                                step3ContractorFinallyStep(res);
                                                                            } else breakFilling();
                                                                        })
                                                                } else breakFilling();
                                                            })
                                                    } else breakFilling();
                                                })
                                        } else breakFilling();
                                    })
                            } else breakFilling();
                        })
                }
            }
            else if (step === 4) {
                step4CheckByVin()
                    .then(function(res){
                        if (res.data.result) {
                            step4AttachToUser(res)
                                .then(function(res){
                                    if (res.data.result) {
                                        step4ObjectCreate(res)
                                            .then(function(res){
                                                if (res.data.result) {
                                                    step4CreatePolicy(res)
                                                } else breakFilling();
                                            })
                                    } else breakFilling();
                                })
                        } else breakFilling();
                    })
            }
            else if (step === 5) {
                if (vm.findData.filter.drivers.length > 1) {
                    vm.findData.filter.drivers.forEach(function(f){
                        let date = new Date(f.age),
                            data = {
                            token: vm.token,
                            is_juridical: 0,
                            birth_date: ((date.getDate() < 10 ? '0'+date.getDate() : date.getDate())+'.'+((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1))+'.'+date.getFullYear()),
                            is_primary: 1,
                            sex: f.sex,
                            name: f.firstName + ' ' + f.name + ' ' + f.secondName
                        };
                        $http.post(config.api + 'contractors/create', data)
                            .then(function(res){
                                if (res.data.result) {
                                    let data = {
                                        token: vm.token,
                                        name: f.name,
                                        middle_name: f.firstName,
                                        last_name: f.secondName,
                                        full_name: f.firstName + ' ' + f.name + ' ' + f.secondName,
                                        series: f.series.split(' ')[0],
                                        number: f.series.split(' ')[1],
                                        document_type_id: 3,
                                        issued: '',
                                        issued_date: "01.01.2017",
                                        expiration_date: '12.12.2020',
                                        content: ''
                                    };
                                    $http.post(config.api + 'contractors/'+ res.data.response + '/documents/create',data)
                                        .then(function(res){
                                            if (res.data.result) {
                                                vm.fill.step++; //Go to the next step
                                            }
                                        })
                                }

                            })
                    })
                } else {
                    let data = {
                        token: vm.token,
                        name: vm.findData.filter.drivers[0].name,
                        middle_name: vm.findData.filter.drivers[0].firstName,
                        last_name: vm.findData.filter.drivers[0].secondName,
                        full_name: vm.findData.filter.drivers[0].firstName + ' ' + vm.findData.filter.drivers[0].name + ' ' + vm.findData.filter.drivers[0].secondName,
                        series: vm.findData.filter.drivers[0].series.split(' ')[0],
                        number: vm.findData.filter.drivers[0].series.split(' ')[1],
                        document_type_id: 3,
                        issued: '',
                        issued_date: "01.01.2017",
                        expiration_date: '12.12.2020',
                        content: ''
                    };
                    $http.post(config.api + 'contractors/'+ vm.fill.response.contractor_id + '/documents/create',data)
                        .then(function(res){
                            if (res.data.result) {
                                vm.fill.step++; //Go to the next step
                            }
                        })
                }
            }
        }

        /**
         * Get execute for issues ids list
         */
        function getExecute() {
            xlog('vm.findData',vm.findData)

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
                birthday: date ? ((date.getDate() < 10 ? '0'+date.getDate() : date.getDate())+'.'+((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1))+'.'+date.getFullYear()) : null,
                phone: vm.fill.holder ? vm.fill.holder.phone : null,
                email: vm.fill.holder ? vm.fill.holder.email : null,
                docNumber: vm.fill.passport ? vm.fill.passport.serial : null,
                docDate: docDate ? ((docDate.getDate() < 10 ? '0'+docDate.getDate() : docDate.getDate())+'.'+((docDate.getMonth()+1) < 10 ? '0'+(docDate.getMonth()+1) : (docDate.getMonth()+1))+'.'+docDate.getFullYear()) : null,
                docWho: vm.fill.passport ? vm.fill.passport.owner : null,
                benLastName: vm.fill.beneficiary ? vm.fill.beneficiary.firstName : null,
                benFirstName: vm.fill.beneficiary ? vm.fill.beneficiary.name : null,
                benMiddleName: vm.fill.beneficiary ? vm.fill.beneficiary.secondName : null,
                benSex: vm.fill.beneficiary ? vm.fill.beneficiary.sex : null,
                benBirtday: benDate ? ((benDate.getDate() < 10 ? '0'+benDate.getDate() : benDate.getDate())+'.'+((benDate.getMonth()+1) < 10 ? '0'+(benDate.getMonth()+1) : (benDate.getMonth()+1))+'.'+benDate.getFullYear()) : null,
                benPhone: vm.fill.beneficiary ? vm.fill.beneficiary.phone : null,
                benEmail: vm.fill.beneficiary ? vm.fill.beneficiary.email : null,
                benDocNumber: vm.fill.beneficiary ? vm.fill.beneficiary.passport.serial : null,
                benDocDate: benDocDate ? ((benDocDate.getDate() < 10 ? '0'+benDocDate.getDate() : benDocDate.getDate())+'.'+((benDocDate.getMonth()+1) < 10 ? '0'+(benDocDate.getMonth()+1) : (benDocDate.getMonth()+1))+'.'+benDocDate.getFullYear()) : null,
                benDocIssue: vm.fill.beneficiary ? vm.fill.beneficiary.passport.owner : null,
                ptsNumber: vm.fill.avto.pts ? vm.fill.avto.pts.serial : null,
                ptsDate: ptsDate ? ((ptsDate.getDate() < 10 ? '0'+ptsDate.getDate() : ptsDate.getDate())+'.'+((ptsDate.getMonth()+1) < 10 ? '0'+(ptsDate.getMonth()+1) : (ptsDate.getMonth()+1))+'.'+ptsDate.getFullYear()) : null,
                stsNumber: vm.fill.avto.sts ? vm.fill.avto.sts.serial : null,
                stsDate: stsDate ? ((stsDate.getDate() < 10 ? '0'+stsDate.getDate() : stsDate.getDate())+'.'+((stsDate.getMonth()+1) < 10 ? '0'+(stsDate.getMonth()+1) : (stsDate.getMonth()+1))+'.'+stsDate.getFullYear()) : null,
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
                                            if (res.data.response.insurance_company_id === vm.findData.insurance_company_id) {
                                                res.data.response.active = true; //Set active status for current Issue to display active tab in sidebar
                                                vm.findData.calculation_id = res.data.response.calculation_id;
                                                xlog('MODULE : FILLING -> Current calculator:', vm.findData.calculation_id);
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

        function backStep() {
            vm.fill.step--;
        }


        /**
         * Set new current Tab
         * @param issue - Obj
         * @param key
         */
        function setNewCurrentIssue(issue, key){
            vm.fill.activeIssue = issue;
            vm.fill.currentTab = key;
        }

        //---------------------------------------------------- STEPS FUNCTIONS ----------------------------------/
        //--------------- STEP 2 --------------//

        /**
         * Check user for construct
         * @returns {*} - @promise
         */
        function step2ConstructorIsExists() {
            vm.waiter = true;
            let data = {
                token: $rootScope.currentToken,
                is_juridical: 0,
                name: vm.fill.holder.name,
                middle_name: vm.fill.holder.firstName,
                last_name: vm.fill.holder.secondName,
                series: vm.fill.passport.serial.toString().substring(0,4),
                number: vm.fill.passport.serial.toString().substring(4,10),
                document_type_id: 1
            };
            return $http.post(config.api + 'contractors/isExists',data)
        }

        /**
         * Create contractor from user Data
         * @returns {*} - @promise
         */
        function step2ContractorCreate() {
            let date = new Date(vm.fill.holder.birthday),
                data = {
                    token: $rootScope.currentToken,
                    is_juridical: 0,
                    birth_date: (date.getDate()<10?'0'+date.getDate():date.getDate())+'.'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1))+'.'+date.getFullYear(),
                    is_primary: 1,
                    sex: vm.fill.holder.sex,
                    name: vm.fill.holder.firstName + ' ' + vm.fill.holder.name + ' ' + vm.fill.holder.secondName
                };
            return $http.post(config.api + 'contractors/create',data)
        }

        /**
         * Add documents to constructor
         * @param res - response from step2ContractorCreate()
         * @returns {*} - @promise
         */
        function step2ContractorDocsCreate(res) {
            vm.fill.response.contractor_id = res.data.response; //step1 cont_id
            let date = new Date(vm.fill.passport.date),
                data = {
                    token: $rootScope.currentToken,
                    name: vm.fill.holder.name,
                    middle_name: vm.fill.holder.firstName,
                    last_name: vm.fill.holder.secondName,
                    series: vm.fill.passport.serial.toString().substring(0,4),
                    number: vm.fill.passport.serial.toString().substring(4,10),
                    document_type_id: 1,
                    issued: vm.fill.passport.owner,
                    issued_date: (date.getDate()<10?'0'+date.getDate():date.getDate())+'.'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1))+'.'+date.getFullYear(),
                    expiration_date: '01.01.2100',
                    contractor_id: vm.fill.response.contractor_id
                };
            return $http.post(config.api + 'contractors/' + vm.fill.response.contractor_id + '/documents/create',data)
        }

        /**
         * Add phone number to constructor
         * @param res - response from step2ContractorDocsCreate()
         * @returns {*} - @promise
         */
        function step2ContractorPhoneCreate(res) {
            vm.fill.response.contractor_documents_id = res.data.response; //step1 doc_id
            let data = {
                token: $rootScope.currentToken,
                contact_type_id: 1,
                content: vm.fill.holder.phone,
                is_primary: 1
            };
            return $http.post(config.api + 'contractors/' + vm.fill.response.contractor_id + '/contacts/create',data)
        }

        /**
         * Add email number to constructor
         * @param res - response from step2ContractorPhoneCreate()
         * @returns {*} - @promise
         */
        function step2ContractorEmailCreate(res) {
            vm.fill.response.contractor_phone_id = res.data.response; //step1 phone_id
            let data = {
                token: $rootScope.currentToken,
                contact_type_id: 2,
                content: vm.fill.holder.email,
                is_primary: 1
            };
            return $http.post(config.api + 'contractors/' + vm.fill.response.contractor_id + '/contacts/create',data)
        }

        /**
         * Finally step after complete step 2
         * @param res - response from step2ContractorEmailCreate()
         * @returns {*} - @promise
         */
        function step2ContractorFinallyStep(res) {
            vm.fill.response.contractor_email_id = res.data.response; //step1 email_id
            vm.uploader1.queue[0].formData = [{
                token: $rootScope.currentToken,
                category_id: 27,
                owner_id: vm.fill.response.contractor_documents_id,
                user_phone: vm.fill.response.contractor_phone_id,
                user_email: vm.fill.response.contractor_email_id
            }];
            vm.uploader1.uploadAll();
            vm.uploader1.onCompleteItem  = function(){


                vm.uploader5.queue[0].formData = [{
                    token: $rootScope.currentToken,
                    category_id: 27,
                    owner_id: vm.fill.response.contractor_documents_id,
                    user_phone: vm.fill.response.contractor_phone_id,
                    user_email: vm.fill.response.contractor_email_id
                }];
                vm.uploader5.uploadAll();
                vm.uploader5.onCompleteItem  = function(){
                    vm.fill.step++; //Go to the next step
                    vm.waiter = false;
                    getExecute();
                };
            };

        }

        //--------------- STEP 3 --------------//

        /**
         * Check user for construct
         * @returns {*} - @promise
         */
        function step3ConstructorIsExists() {
            vm.waiter = true;
            let data = {
                token: $rootScope.currentToken,
                is_juridical: 0,
                name: vm.fill.beneficiary.name,
                middle_name: vm.fill.beneficiary.firstName,
                last_name: vm.fill.beneficiary.secondName,
                series: vm.fill.beneficiary.passport.serial.toString().substring(0,4),
                number: vm.fill.beneficiary.passport.serial.toString().substring(4,10),
                document_type_id: 1
            };
            return $http.post(config.api + 'contractors/isExists',data)
        }

        /**
         * Create contractor from user Data
         * @returns {*} - @promise
         */
        function step3ContractorCreate (){
            let date = new Date(vm.fill.beneficiary.birthday),
                data = {
                    token: $rootScope.currentToken,
                    is_juridical: 0,
                    birth_date: (date.getDate()<10?'0'+date.getDate():date.getDate())+'.'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1))+'.'+date.getFullYear(),
                    is_primary: 1,
                    sex: vm.fill.beneficiary.sex,
                    name: vm.fill.beneficiary.firstName + ' ' + vm.fill.beneficiary.name + ' ' + vm.fill.beneficiary.secondName
                };
            return $http.post(config.api + 'contractors/create',data)
        }

        /**
         * Add documents to constructor
         * @param res - response from step2ContractorCreate()
         * @returns {*} - @promise
         */
        function step3ContractorDocsCreate(res){
            vm.fill.response.beneficiary_id = res.data.response; //step2 id
            let date = new Date(vm.fill.beneficiary.passport.date),
                data = {
                    token: $rootScope.currentToken,
                    name: vm.fill.beneficiary.name,
                    middle_name: vm.fill.beneficiary.firstName,
                    last_name: vm.fill.beneficiary.secondName,
                    series: vm.fill.beneficiary.passport.serial.toString().substring(0,4),
                    number: vm.fill.beneficiary.passport.serial.toString().substring(4,10),
                    document_type_id: 1,
                    issued: vm.fill.beneficiary.passport.owner,
                    issued_date: (date.getDate()<10?'0'+date.getDate():date.getDate())+'.'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1))+'.'+date.getFullYear(),
                    expiration_date: '01.01.2100',
                    contractor_id: vm.fill.response.beneficiary_id
                };
            return $http.post(config.api + 'contractors/' + vm.fill.response.beneficiary_id + '/documents/create',data)
        }

        /**
         * Add phone number to constructor
         * @param res - response from step2ContractorDocsCreate()
         * @returns {*} - @promise
         */
        function step3ContractorPhoneCreate(res){
            vm.fill.response.beneficiary_documents_id = res.data.response; //step1 doc_id
            let data = {
                token: $rootScope.currentToken,
                contact_type_id: 1,
                content: vm.fill.beneficiary.phone,
                is_primary: 1
            };
            return $http.post(config.api + 'contractors/' + vm.fill.response.beneficiary_id + '/contacts/create',data)
        }

        /**
         * Add email number to constructor
         * @param res - response from step2ContractorPhoneCreate()
         * @returns {*} - @promise
         */
        function step3ContractorEmailCreate(res) {
            vm.fill.response.beneficiary_phone_id = res.data.response; //step1 phone_id
            let data = {
                token: $rootScope.currentToken,
                contact_type_id: 2,
                content: vm.fill.beneficiary.email,
                is_primary: 1
            };
            return $http.post(config.api + 'contractors/' + vm.fill.response.beneficiary_id + '/contacts/create',data)
        }

        /**
         * Finally step after complete step 2
         * @param res - response from step2ContractorEmailCreate()
         * @returns {*} - @promise
         */
        function step3ContractorFinallyStep(res) {
            vm.fill.response.beneficiary_email_id = res.data.response; //step2 email_id
            vm.uploader2.queue[0].formData = [{
                token: $rootScope.currentToken,
                category_id: 27,
                owner_id: vm.fill.response.beneficiary_documents_id,
                user_phone: vm.fill.response.beneficiary_phone_id,
                user_email: vm.fill.response.beneficiary_email_id
            }];
            vm.uploader2.uploadAll();
            vm.uploader2.onCompleteItem  = function(){
                vm.uploader6.queue[0].formData = [{
                    token: $rootScope.currentToken,
                    category_id: 27,
                    owner_id: vm.fill.response.beneficiary_documents_id,
                    user_phone: vm.fill.response.beneficiary_phone_id,
                    user_email: vm.fill.response.beneficiary_email_id
                }];
                vm.uploader6.uploadAll();
                vm.uploader6.onCompleteItem  = function(){
                    vm.fill.step++; //Go to the next step
                    vm.waiter = false;
                    getExecute();
                };
            };
        }

        //--------------- STEP 3 --------------//

        /**
         * Check avto by vin
         * @returns {*} - @promise
         */
        function step4CheckByVin() {
            vm.waiter = true;
            return $http.get(config.api + 'policies/vehicles/checkByVin/' + vm.fill.avto.vin + '?token=' + $rootScope.currentToken)
        }

        /**
         * Attach documents to created user
         * @returns {*} - @promise
         */
        function step4AttachToUser() {
            let data = {
                token: $rootScope.currentToken,
                mark_model_id: vm.findData.mod.id,
                vin: vm.fill.avto.vin,
                year: vm.findData.year,
                number: vm.fill.avto.gosNumber
            };
            return $http.post(config.api + 'policies/vehicles/attachToUser', data)
        }

        /**
         * Create policy object
         * @param res - response from step4AttachToUser()
         * @returns {*} - @promise
         */
        function step4ObjectCreate(res) {
            vm.fill.response.policy_object_id = res.data.response; //step3 ID
            let ptsDate = new Date(vm.fill.avto.pts.date),
                stsDate = new Date(vm.fill.avto.sts.date),
                data = {
                    token: $rootScope.currentToken,
                    policy_object_id: vm.fill.response.policy_object_id,
                    policy_object_document_type_id: 1,
                    series: vm.fill.avto.pts.serial.toString().substring(0,4),
                    number: vm.fill.avto.pts.serial.toString().substring(4,10),
                    issued_date: (ptsDate.getDate()<10?'0'+ptsDate.getDate():ptsDate.getDate())+'.'+((ptsDate.getMonth()+1)<10?'0'+(ptsDate.getMonth()+1):(ptsDate.getMonth()+1))+'.'+ptsDate.getFullYear(),
                    sts_series: vm.fill.avto.sts.serial.toString().substring(0,4),
                    sts_number: vm.fill.avto.sts.serial.toString().substring(4,10),
                    issued_sts_date: (stsDate.getDate()<10?'0'+stsDate.getDate():stsDate.getDate())+'.'+((stsDate.getMonth()+1)<10?'0'+(stsDate.getMonth()+1):(stsDate.getMonth()+1))+'.'+stsDate.getFullYear(),
                    expiration_date: '01.01.2100',
                    value: vm.findData.filter.sum
                };
            return $http.post(config.api + 'policies/objects/documents/create',data)
        }

        /**
         * Create policy on server
         * @param res - response from step4ObjectCreate()
         * @returns {*} - @promise
         */
        function step4CreatePolicy(res) {
            vm.fill.response.owner_id = res.data.response; //step3 owner_id
            vm.uploader3.queue[0].formData = [{
                token: $rootScope.currentToken,
                category_id: 24,
                owner_id:  vm.fill.response.owner_id
            }];
            vm.uploader3.uploadAll();
            vm.uploader3.onCompleteAll = function(){
                vm.uploader4.queue[0].formData = [{
                    token: $rootScope.currentToken,
                    category_id: 24,
                    owner_id:  vm.fill.response.owner_id
                }];
                vm.uploader4.uploadAll();
                vm.uploader4.onCompleteAll = function(){
                    vm.fill.activeIssue.results.forEach(function(f){
                        vm.fill.risks.push({
                            policies_objects_type_id: 1,
                            policies_object_id: vm.fill.response.policy_object_id,
                            insurance_companies_risk_id: f.calculations_risk_id
                        })
                    });
                    let currentDate = new Date(),
                        data = {
                            token: $rootScope.currentToken,
                            begin_date: (currentDate.getDate()<10?'0'+currentDate.getDate():currentDate.getDate())+'.'+((currentDate.getMonth()+1)<10?'0'+(currentDate.getMonth()+1):(currentDate.getMonth()+1))+'.'+currentDate.getFullYear(),
                            begin_time: (currentDate.getHours()<10?'0'+currentDate.getHours():currentDate.getHours())+':'+(currentDate.getMinutes()<10?'0'+currentDate.getMinutes():currentDate.getMinutes()),
                            end_date: (currentDate.getDate()<10?'0'+currentDate.getDate():currentDate.getDate())+'.'+((currentDate.getMonth()+1)<10?'0'+(currentDate.getMonth()+1):(currentDate.getMonth()+1))+'.'+(currentDate.getFullYear()+1),
                            contractor_insurer_id: vm.fill.response.contractor_id,
                            contractor_beneficiary_id: vm.fill.response.beneficiary_id ? vm.fill.response.beneficiary_id : null,
                            insurance_company_id: vm.findData.insurance_company_id,
                            product_id: 1,
                            policies_type_id: 1,
                            insurance_company_calculation_id: vm.findData.calculation_id,
                            policy_payment_order_id: 1,
                            objects: vm.fill.risks
                        };
                    $http.post(config.api + 'policies/create',data)
                        .then(function(res){
                            if (res.data.result) {
                                vm.fill.step++; //Go to the next step
                                getExecute();
                                vm.waiter = false;
                                console.log('ВСЕ ЗБС!!!!!!!!!!!!!!!!!!!!!')
                            }
                            else if (res.data.response.code === '400.20.8') {
                                breakFilling('Полис по этому предложению уже создан')
                            }
                            else {
                                breakFilling('Возникла ошибка. Обратитесь в службу поддержки')
                            }
                        })
                };
            };
        }

        //--------------- ERROR --------------//

        /**
         * Stop filling process and show some error
         * @param text - sample text to show in error area
         */
        function breakFilling(text) {
            if (text) {
                vm.breakFilling = text;
            } else {
                vm.breakFilling = 'Возникла ошибка. Обратитесь в службу поддержки.'
            }
        }
        
        //---------------------------------------------------- UPLOADER -----------------------------------------/

        /**
         * Создание настроек для загрузки файлов
         */
        $scope.$on('user',function(){
            // Uploader for slide one - Contractor create
            vm.uploaderOptions = {
                url: config.api + 'storage/upload',
                method: 'post',
                autoUpload : false,
                withCredentials: false
            };

            for (let i = 1; i <= 15; i++) {
                vm['uploader'+i] = new FileUploader(vm.uploaderOptions);

                vm['uploader'+i].onAfterAddingAll = function(){
                    xlog('MODULE : FILLING : FILE-UPLOADER : File added ->',vm['uploader'+i].queue[0]._file);
                };
            }
        });

        /**
         * Удаление изображения из очереди
         */
        function clearQueue(index) {
            vm['uploader'+index].destroy();
            vm['uploader'+index] = new FileUploader(vm.uploaderOptions);
        }

        //----------------------------------------------- TEST ----------------------------------------//
        $window.test = test;
        function test() {
            $scope.$apply(function(){
                vm.fill.holder = {
                    phone: '+79850846060',
                    email: 'aaaa@aaaaaaaa.aaaaa',
                    name: 'Игорь',
                    firstName: 'Привет',
                    secondName: 'Пока',
                    sex: '1'
                };
                vm.fill.passport = {
                    serial: '1234567890',
                    owner: 'Управление всеми делами президента'
                };
                vm.fill.avto = {
                    pts: {
                        serial: '1234567890'
                    },
                    sts: {
                        serial: '1234567890'
                    },
                    gosNumber: 'A123BC456',
                    vin: '99999999999999999'
                }
            })
        }

        $scope.$watch('vm.fill',function(){
            xlog('vm.fill change', vm.fill);
        })


    }
})();