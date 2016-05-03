/**
 * Created by Dude on 27.4.2016 г..
 */

app.controller('LoginController',
    function ($scope, $rootScope, $location, authService, notifyService, baseServiceUrl) {
        $scope.login = function(userData) {
            authService.login(userData,
                function success() {
                    notifyService.showInfo("Login successful");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("Login failed", error);
                }
            );
        };

        $scope.logout = function () {
            authService.logout()
                .then(
                    function success() {
                        notifyService.showInfo("Logout successful")
                    },
                    function error(err) {
                        notifyService.showError("could not logout", err)
                    })
        }
    }
);

