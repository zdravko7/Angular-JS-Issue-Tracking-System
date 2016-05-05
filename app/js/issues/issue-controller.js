angular.module('issueTrackingSystem.issues', [
        'issueTrackingSystem.issues.myIssues',
        'issueTrackingSystem.users.user',
        'issueTrackingSystem.projects.myProjects',
        'issueTrackingSystem.notifier'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/issues/:id', {
            templateUrl: 'app/issues/issue-page.html',
            controller: 'IssueController'
        });
    }])
    .controller('IssueController', [
        '$scope',
        '$routeParams',
        'issues',
        'projects',
        'user',
        'notifier',
        function IssueController($scope,$routeParams,issues,projects,user,notifier) {
            var currentId = $routeParams.id;

            $scope.showModal = false;
            $scope.toggleModal = function(){
                $scope.showModal = !$scope.showModal;
            };

            issues.getIssueById(currentId)
                .then(function(success){
                    $scope.issue = success;
                    $scope.issue.projectId=success.Project.Id;
                    $scope.issue.dueDate=new Date(success.DueDate.split('T')[0]);
                    $scope.issue.assigneeId=success.Assignee.Id;
                    $scope.issue.priorityId=success.Priority.Id;

                    projects.getProjectById($scope.issue.projectId)
                        .then(function (projects) {
                            $scope.priorities = projects.Priorities;
                        },function (error){
                            console.log(error);
                        });
                },function(error){
                    console.log(error);
                });

            $scope.addComment = function(comment){
                issues.addComment(currentId,comment)
                    .then(function(success){
                        $scope.comments = success;
                    },function(error){
                        console.log(error);
                    })
            };

            issues.getIssueComments(currentId)
                .then(function(success){
                    $scope.comments = success;
                },function(error){
                    console.log(error);
                });

            $scope.editIssue = function(issue){
                issues.editIssue(currentId, issue)
                    .then(function(success){
                        $scope.issue = success;
                        $scope.issue.projectId=success.Project.Id;
                        notifier.notify("Issue has been edited.",'success');
                    },function(error){
                        console.log(error);
                    });
            };

            $scope.updateStatus = function(statusId){
                issues.updateStatus(currentId, statusId)
                    .then(function(success){
                        $scope.issue.availableStatuses = success;
                        notifier.notify("Issue's status has been updated.",'success');
                    },function(error){
                        console.log(error);
                    });
            };

            user.getAllUsers()
                .then(function (success) {
                    $scope.users = success;
                }, function (error) {

                });

            $scope.isAssignee = function(){
                if($scope.issue) {
                    return $scope.issue.Assignee.Id === sessionStorage.userId;
                }
            };

            $scope.isLeader = function(){
                if($scope.issue) {
                    return $scope.issue.Author.Id === sessionStorage.userId;
                }
            };

    }]);
