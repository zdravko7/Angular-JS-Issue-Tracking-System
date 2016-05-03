angular.module('issueTrackingSystem.users.identity',[])
    .factory('identity',[
        function identity(){
            return {
                isAuthenticated: function isAuthenticated(){
                    var accessToken = localStorage["userAuth"];
                    return accessToken;
                },
                isAdmin: function isAdmin(){
                    var isAdmin = sessionStorage["isAdmin"];
                    return isAdmin;
                }
        };
    }]);