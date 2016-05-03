'use strict';

angular.module('issueTrackingSystem.users.admin', [])

    .factory('admin',[
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q,BASE_URL){

            function makeAdmin(user){
                var deferred = $q.defer();

                $http.put(BASE_URL+'users/makeadmin',user)
                    .then(function(success){
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return{
                makeAdmin:makeAdmin
            }
        }]);


