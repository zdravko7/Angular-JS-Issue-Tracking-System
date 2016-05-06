"use strict";

angular.module("issueTracker.controllers")
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            title: 'Home',
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        });
    }])
    .controller('HomeController', ['$scope',
        '$rootScope',
        '$location',
        'authorizationService',
        'identityService',
        'notifyService',
        'projectsService',
        'issuesService',
        'separatorImage',
        function ($scope,
                  $location,
                  $rootScope,
                  authorizationService,
                  identityService,
                  notifyService,
                  projectsService,
                  issuesService,
                  separatorImage) {

            $scope.projectsLoading = true;
            $scope.issuesLoading = true;

            $scope.projectParams = {
                pageNumber: 1,
                pageSize: 10
            };

            $scope.issuesParams = {
                pageNumber: 1,
                pageSize: 12
            };

            $scope.reloadProjects = function () {
                $scope.projectsLoading = true;
                projectsService.getMyProjects($scope.projectParams).then(
                    function success(data) {
                        $scope.myProjects = data;
                        $scope.projectsLoading = false;
                    }, function error(err) {
                        notifyService.showError("Error: Could not access Projects on the server!", err);
                    }
                );
            };

            $scope.reloadIssues = function () {
                $scope.issuesLoading = true;
                issuesService.getMyIssues($scope.issuesParams).then(
                    function success(data) {
                        $scope.myIssues = data;
                        $scope.issuesLoading = false;
                    }, function error(err) {
                        notifyService.showError("Error: Could not access Issues on the server!", err);
                    }
                );
            };

            // new load checks here
            if (identityService.isLogged()) {
                $rootScope.$broadcast("pageChanged", "Dashboard");
                $scope.reloadIssues();
                $scope.reloadProjects();
            }

            $scope.separatorImage = separatorImage;

            $scope.identityService = identityService;

            $scope.login = function (user) {
                authorizationService.login(user)
                    .then(function success() {
                        notifyService.showInfo("Logged in successfully!");
                        $scope.reloadIssues();
                        $scope.reloadProjects();
                    }, function error(err) {
                        notifyService.showError("Could not log in:", err);
                    })
            };

            $scope.logout = function () {
                authorizationService.logout()
                    .then(function success() {
                        notifyService.showInfo("Logged out successfully");
                        $location.path('/');
                    }, function error(err) {
                        notifyService.showError("Could not log out:", err);
                    })
            };

            $scope.register = function (user) {
                authorizationService.register(user)
                    .then(function success() {
                        $scope.reloadIssues();
                        $scope.reloadProjects();
                        notifyService.showInfo("Registered successfully!");
                    }, function error(err) {
                        notifyService.showError("Could not register:", err);
                    })
            };


        }]);