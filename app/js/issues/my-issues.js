angular.module('issueTrackingSystem.issues.myIssues',[])
    .factory('issues',[
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){
            function getMyIssues(pageSize, pageNumber, orderBy){
                var pageSize = pageSize || 10;
                var pageNumber = pageNumber || 1;
                var orderBy = orderBy || 'DueDate';

                var deferred = $q.defer();

                $http.get(BASE_URL + 'issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber+'&orderBy=' + orderBy)
                    .then(function (success) {
                        deferred.resolve(success.data.Issues);
                    },function (error) {
                        deferred.reject(error);
                });

                return deferred.promise;
            };

            function addIssue(issue){
                var deferred = $q.defer();

                $http.post(BASE_URL+'issues',issue)
                    .then(function(success){
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            };
            function editIssue(id,issue){
                var deferred = $q.defer();

                $http.put(BASE_URL+'issues/'+id, issue)
                    .then(function(success){
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            };

            function updateStatus(id,statusId){
                var deferred = $q.defer();

                $http.put(BASE_URL+'Issues/'+id+'/changestatus?statusid='+statusId)
                    .then(function(success){
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            };

            function getIssueById(id){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'issues/'+id)
                    .then(function (success) {
                        deferred.resolve(success.data);
                    },function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            };

            function getIssueComments(id){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'issues/'+id+'/comments')
                    .then(function (success) {
                        deferred.resolve(success.data);
                    },function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            };

            function addComment(id,comment){
                var deferred = $q.defer();

                $http.post(BASE_URL + 'issues/'+id+'/comments',comment)
                    .then(function (success) {
                        deferred.resolve(success.data);
                    },function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            };

            return {
                getMyIssues: getMyIssues,
                addIssue:addIssue,
                getIssueById:getIssueById,
                getIssueComments:getIssueComments,
                addComment:addComment,
                editIssue:editIssue,
                updateStatus:updateStatus
            }
    }]);