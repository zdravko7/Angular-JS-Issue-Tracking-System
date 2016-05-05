/**
 * Created by Dude on 26.4.2016 г..
 */
app.factory('userService',
    function($http, baseServiceUrl, authService)
    {
        return {

            isAuthenticated: function isAuthenticated(){
                console.log(localStorage["userAuth"]);
                return localStorage["userAuth"];

            },
            isAdmin: function isAdmin(){
                return  sessionStorage["isAdmin"];
            }

        };
            /*
            createNewProject: function(projectData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'Projects/',
                    headers: authService.getAuthHeaders(),
                    data: projectData
                };

                $http(request).success(success).error(error);
            },

            getUserAds: function(params, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'api/user/ads',
                    headers: authService.getAuthHeaders(),
                    params: params
                };

                $http(request).success(success).error(error);
            },

            deactivateAd: function (id, success, error) {
                //TODO
            },

            publishAgainAd: function(id, success, error) {
                //TODO
            }

        }*/
    });