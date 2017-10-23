(function () {
    'use strict';

    angular.module('kaskonomika')
        .controller('headerController', headerController);

    headerController.$inject = ['$rootScope','$scope','$window','$timeout','$location','$http','config'];

    function headerController($rootScope,$scope,$window,$timeout,$location,$http,config) {
        let vm = this;
        vm.openOverlay = false; //Состояние оверлея. false - закрыт
        vm.mainMenu = [
            {
                text: 'Умное страхование',
                url: '/'
            },
            {
                text: 'Как это работает',
                url: '/how-it-work'
            },
            {
                text: 'Вопросы и ответы',
                url: '/faq'
            },
            {
                text: 'Скачать приложение',
                url: '/download'
            }
        ]; //Пункты главного меню
        vm.subMenu = [
            {
                text: 'Реквизиты',
                url: '/requisites'
            },
            {
                text: 'Оплата и доставка',
                url: '/payment-and-delivery'
            },
            {
                text: 'Политика конфиденциальности',
                url: '/privacy-policy'
            }/*,
            {
                text: 'Контакты',
                url: '/contacts'
            }*/
        ]; //Пункты меню оверлея
        $rootScope.showCalc = false;

        $rootScope.scrollFromTop = false; //Состояние скролла - отодвинут ли скролл сверху.
        
        vm.goToRegistration = goToRegistration;
        vm.login = login;
        vm.logOut = logOut;

        ///////////////////
        activate();
        function activate() {
            documentReady(); //Событие при загрузке страницы
        }
        ///////////////////

        /**
         * Событие при загрузке страницы
         */
        function documentReady() {
            $scope.$on('cfpLoadingBar:completed',function(){
                vm.view = true;
            });

            getCarsList();

            $timeout(function(){
                vm.view = true;
            },3000);
        }
        
        /**
         * Отслеживание прокрутки скролла документа
         */
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset > 0) {
                $rootScope.scrollFromTop = true;
            } else {
                $rootScope.scrollFromTop = false;
            }
            $scope.$apply();
        });

        /**
         * Переход на страницу регистрации
         */
        function goToRegistration() {
            vm.authOpen = false;
            $location.path('/registration')
        }
        
        /**
         * Событие входа
         */
        function login() {
            vm.waitLogin = true;
            let data = {
                username: vm.userLoginInput,
                password: vm.userPassInput
            };
            vm.LoginError = false;
            $http.post(config.api + 'authorization', data)
                .then(function(_res){
                    if (_res.data.result) {
                        vm.authOpen = false; //Закрытие окна входа
                        vm.waitLogin = false;
                        $rootScope.currentUser = _res.data.response;
                        localStorage.setItem('currentToken', _res.data.token);
                        localStorage.setItem('currentUser', JSON.stringify(_res.data.response));
                        xlog('MODULE : HEADER : USER ->', $rootScope.currentUser);
                        $rootScope.$broadcast('user');
                        getCarsList(); //Получение списка авто
                    } else {
                        vm.waitLogin = false;
                        vm.LoginError = true;
                        vm.userPassInput = '';
                        xlog('MODULE : HEADER : LOGIN -> Login error', _res.data);
                    }
                })

        }

        /**
         * Выход из системы и удаление всей информации о польователе.
         */
        function logOut() {
            $rootScope.currentUser = undefined;
            localStorage.removeItem('currentToken');
            localStorage.removeItem('currentUser');
            $location.path('/');
            xlog('MODULE : HEADER : LOGOUT -> Logout success. Data cleaned');
        }


        /**
         * Получение списка авто
         */
        function getCarsList() {
            let token = function(){
                return localStorage.getItem('currentToken');
            };
            $http.get(config.api + 'policies/vehicles?token=' + token())
                .then(function(res){
                    if (res.data.result) {
                        if (res.data.response.length > 0 ) {
                            $rootScope.is_cars = true;
                        }
                    }
                })
        }
    }
})();

