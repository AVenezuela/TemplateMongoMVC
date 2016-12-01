angular.module('MainApp').controller('EmployeeController', function ($scope, model) {
    $scope.model = model;

    
    $scope.$evalAsync(function ($scope) {
        $scope.setCollapse();
        $('#inpBirthdate').daterangepicker({
            singleDatePicker: true,
            calender_style: "picker_1"
        }, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });

    $scope.toggleGreeting = function () {
        this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello'
    }
})