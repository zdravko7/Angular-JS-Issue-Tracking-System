/**
 * Created by Dude on 27.4.2016 г..
 */

app.controller('LoginController',
    function($scope, $location, authService, notifyService) {

        notifyService.showInfo("Login successful");
        $location.path("/");
    },
    function error(err) {
        notifyService.showError("Cannot login", err)
    }
);