'use strict';

angular.module('issueTracker.services')
    .factory('projectsService', ['$http', '$q', 'baseUrl', 'identityService', function ($http, $q, baseUrl, identityService) {

        function getProjects(id) {
            var defered = $q.defer();
            var url = baseUrl + 'projects/' + id;
            $http.get(url)
                .success(function success(data) {
                    defered.resolve(data);
                })
                .error(function error(err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        function getAll() {
            return getProjects("");
        }

        function getById(id) {
            return getProjects(id)
        }

        function getMyProjects(requestParams) {
            var pageSize = requestParams.pageSize || 10;
            var pageNumber = requestParams.pageNumber || 1;

            var defered = $q.defer();

            var id = identityService.getId();

            var url = baseUrl + 'projects?' + 'filter=LeadId=\"' + id + '\"' + ' or Issues.Any(AssigneeId==\"' + id + '\")' + '&pageSize=' + pageSize + '&pageNumber=' + pageNumber;
            $http.get(url)
                .success(function success(data) {
                    defered.resolve(data);
                })
                .error(function error(err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        function getByQuery(query, requestParams) {
            var pageSize = requestParams.pageSize || 10;
            var pageNumber = requestParams.pageNumber || 1;

            var defered = $q.defer();

            var url = baseUrl + 'projects?' + 'filter=' + query + '&pageSize=' + pageSize + '&pageNumber=' + pageNumber;
            $http.get(url)
                .success(function success(data) {
                    defered.resolve(data);
                })
                .error(function error(err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        function postProject(project) {
            var defered = $q.defer();
            var url = baseUrl + 'projects';
            $http.post(url, project)
                .success(function success(data) {
                    defered.resolve();
                })
                .error(function error(err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        function updateProject(id, project) {
            var defered = $q.defer();
            var url = baseUrl + 'projects/' + id;
            $http.put(url, project)
                .success(function success(data) {
                    defered.resolve();
                })
                .error(function error(err) {
                    defered.reject(err);
                });

            return defered.promise;
        }

        return {
            getAll: getAll,
            getById: getById,
            getByQuery: getByQuery,
            getMyProjects:getMyProjects,
            postProject: postProject,
            updateProject: updateProject
        }
    }]);
