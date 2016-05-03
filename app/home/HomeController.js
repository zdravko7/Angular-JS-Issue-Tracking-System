'use strict';

angular.module('issueTrackingSystem.home', [
    'issueTrackingSystem.users.authentication',
    'issueTrackingSystem.notifier'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController'
        });
    }])
    .controller('HomeController', [
        '$scope',
        'authentication',
        'notifier',
        function HomeController($scope,authentication,notifier) {

            $scope.login = function(user){
                authentication.loginUser(user)
                    .then(function (success) {
                        notifier.notify("You have been successfully logged in.",'success');
                    },function(error){
                        console.log(error);
                        notifier.notify(error,'error');
                    });
            };

            $scope.register = function(user){
                authentication.registerUser(user)
                    .then(function (success) {
                        notifier.notify("You have successfully registered.",'success');
                        $scope.login(user);
                    },function(error){
                        notifier.notify(error,'error');
                    });
            };

            $scope.logout = function(){
                authentication.logoutUser()
                    .then(function (success) {
                        localStorage.removeItem("userAuth");
                        sessionStorage.removeItem("isAdmin");
                        notifier.notify("You have been successfully logged out.",'success');
                    },function(error){
                        notifier.notify(error,'error');
                    });
            };
    }]);
