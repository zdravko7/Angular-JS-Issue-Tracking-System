angular.module('issueTrackingSystem.issues.add', [
    'issueTrackingSystem.users.user',
    'issueTrackingSystem.projects.myProjects',
    'issueTrackingSystem.issues.myIssues',
    'issueTrackingSystem.notifier'
])

        .controller('AddIssueController', [
        '$scope',
        'user',
        '$routeParams',
        'projects',
        'issues',
        '$location',
        'notifier',
        function AddIssueController($scope,user,$routeParams,projects,issues,$location,notifier) {
            $scope.showModal = false;
            $scope.issue = {projectId:$routeParams.id}
            $scope.toggleModal = function(){
                $scope.showModal = !$scope.showModal;
            };

            $scope.issueAdd = function(issue){
                issues.addIssue(issue)
                    .then(function(success){
                        notifier.notify("Issue has been added.",'success');
                        $location.path("/issues/"+success.Id);
                    },function(error){

                    });
            };

            user.getAllUsers()
                .then(function (success) {
                    $scope.users = success;
                }, function (error) {

                });

            projects.getProjectById($routeParams.id)
                .then(function (success) {
                    $scope.priorities = success.Priorities;
                    $scope.issue.leadId = success.Lead.Id;
                },function (error){
                    console.log(error);
                });

            $scope.lead = function(){
                return $scope.issue.leadId === sessionStorage.userId;
            }
        }]);

