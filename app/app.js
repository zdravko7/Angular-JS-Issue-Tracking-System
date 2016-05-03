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
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when("/register", {
    templateUrl: 'templates/register.html',
    controller: 'RegisterController'
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);

app.run( function($rootScope, $location) {

  // register listener to watch route changes
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    if (!localStorage['userAuth']) {
      // if the user is not logged in, redirect to login page
      if ( next.templateUrl == "templates/login.html" ) {
      } else {
        $location.path( "/" );
      }
    }
  });
});

app.constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net/');