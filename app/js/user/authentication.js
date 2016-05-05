'use strict';

angular.module('issueTrackingSystem.users.authentication', [])

    .factory('authentication',[
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q,BASE_URL){

            function registerUser(user){
                var deferred = $q.defer();

                $http.post(BASE_URL+'api/Account/Register',user)
                    .then(function(success){
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            }

            function editUser(user){
                var deferred = $q.defer();

                $http.post(BASE_URL+'api/Account/ChangePassword',user)
                    .then(function(success){
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            }

            function loginUser(user){
                var deferred = $q.defer();
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Token',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: "grant_type=password&username=" + user.email + "&password=" + user.password
                };
                $http(request)
                    .then(function(success){
                        localStorage['userAuth'] = success.data.access_token;
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            }

            function logoutUser(){
                var deferred = $q.defer();
                $http.post(BASE_URL + 'api/Account/Logout')
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            }

            return{
                registerUser:registerUser,
                loginUser:loginUser,
                logoutUser:logoutUser,
                editUser:editUser
            }
    }]);


