angular.module('issueTrackingSystem.dashboard',[
    'issueTrackingSystem.issues.myIssues',
    'issueTrackingSystem.projects.myProjects'
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/dashboard', {
            templateUrl:'app/dashboard/dashboard.html',
            controller: 'DashboardController'
        })
    }])
    .filter('unique',[function(){
        return function (input){
            input.filter(function(item, pos) {
                return input.indexOf(item) == pos;
            })
        }
    }])
.controller('DashboardController',[
    '$scope',
    'issues',
    'projects',
    'Pagination',
    function DashboardController($scope, issues,projects, Pagination){
        $scope.pagination = Pagination.getNew(2);
        $scope.projectPagination = Pagination.getNew(9);

        issues.getMyIssues()
            .then(function(success){
                $scope.myIssues = success;

            }, function (error) {
                console.log(error);
            });

        projects.getAllProjects()
            .then(function(success){
                var assignedProjects =  success.filter(function(project) {
                    return $scope.myIssues.containsProject(project);
                });
                var myProjects =  success.filter(function(project) {
                    return project.Lead.Id==sessionStorage['userId'];
                });
                assignedProjects.forEach(function(project){
                    projects.getAllProjectIssues(project.Id)
                        .then(function(success){
                            project.issues = success;
                        }, function (error) {
                            console.log(error);
                        });
                });
                $scope.myProjects = myProjects;
                $scope.assignedProjects =assignedProjects;
                $scope.pagination.numPages = Math.ceil($scope.assignedProjects.length/$scope.pagination.perPage);
                $scope.projectPagination.numPages = Math.ceil($scope.myProjects.length/$scope.projectPagination.perPage);
            }, function (error) {
                console.log(error);
            });

}])
.filter('assigned', function() {
    return function(input) {
        if(input){
            return input.filter(function(issue){
                return issue.Assignee.Id === sessionStorage['userId'];
            })
        }
    }
});
