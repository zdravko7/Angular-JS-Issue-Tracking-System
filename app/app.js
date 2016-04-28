'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('issueTrackingSystem', [
  'ngRoute',
  'issueTrackingSystem.view1',
  'issueTrackingSystem.view2',
  'issueTrackingSystem.version'
]);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when("/", {
      templateUrl: 'templates/home.html',
      controller: 'HomeController'
  });

  $routeProvider.when("/login", {
    templatesUrl: 'templates/login.html',
    controller: 'LoginController'
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);

app.constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net');