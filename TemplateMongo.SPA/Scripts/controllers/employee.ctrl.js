angular.module('MainApp').controller('EmployeeController', function ($scope, model) {
    $scope.model = model;
    
    $scope.$evalAsync(function ($scope) {        
        $scope.setCollapse();
        $(":input").inputmask();
        $('#inpBirthdate').daterangepicker({
            singleDatePicker: true,
            calender_style: "picker_1"
        }, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
    });

    $scope.submitForm = function () {
        alert($scope.frmEmployee.$valid)
    }

    $scope.formEmployeeInValid = function () {
        return !$scope.frmEmployee.$valid;
    }
    $scope.formPhoneInValid = function () {
        return !$scope.frmPhone.$valid;
    }
    $scope.formAddressInValid = function () {
        return !$scope.frmAddress.$valid;
    }
})