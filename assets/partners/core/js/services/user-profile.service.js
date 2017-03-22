(function () {
    'use strict';

    angular
        .module('partners')
        .service('userService', userService);

    userService.$inject = ['$http', '$q'];

    function userService($http, $q) {

        var userProfile = undefined; //хранение данных текущего пользователя
        var loaderPromise = null; //Статус загрузки данных пользователя

        this.loadUserProfile = loadUserProfile;
        this.getUserProfile = getUserProfile;
        this.resetUserProfile = resetUserProfile;


        ////////////////

        // Загрузка данных пользователя
        function loadUserProfile() {
            // предотвращение параллельных запросов
            if (!loaderPromise) {
                loaderPromise = $http
                    .get('/api/profile')
                    .then(loadUserProfileComplete)
                    .catch(loadUserProfileFailed);
            }

            return loaderPromise;
        }

        function loadUserProfileComplete(response) {
            userProfile = response.data.data;
            loaderPromise = $q.when(userProfile);
            return userProfile;
        }

        function loadUserProfileFailed(error) {
            loaderPromise = null;
            return $q.reject(error);
        }

        // Обновление профайла
        function resetUserProfile() {
            userProfile = undefined;
            loaderPromise = null;
        }

        function getUserProfile() {
            return userProfile;
        }

    }

})();