/**
 * Created by Dude on 27.4.2016 г..
 */

app.controller('UserController',
    function($scope, $location, authService, notifyService) {

        $scope.isAuthenticated = function() {
            return userService.isAuthenticated();
        }

    }
);