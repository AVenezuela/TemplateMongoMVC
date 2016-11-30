angular.module('MainApp').controller('EmployeeController', function ($scope, model) {
    $scope.model = model;

    
    $scope.$evalAsync(function ($scope) {
        $scope.setCollapse();
    });

    $scope.toggleGreeting = function () {
        this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello'
    }
})