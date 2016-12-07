var employee = angular.module('mdlEmployee', []);
employee.controller('EmployeeCtrl', ['$scope', 'model', function ($scope, model) {
    $scope.model = model;
    $scope.initial = angular.copy($scope.model);    

    $scope.$evalAsync(function ($scope) {
        $scope.setCollapse();        
    })
}]), 
employee.controller('ActionEmployeeCtrl', [
        '$scope',
        '$http',
        '$stateParams',
        '$state',
        'model',
        'EmployeeService',
        function ($scope, $http, $stateParams, $state, model, EmployeeService) {
            $scope.submitForm = function () {
                EmployeeService.actionEmployee($scope.model.EmployeeBag).then(
                function (response) {
                    /*$scope.model.EmployeeBag = response.data;*/
                    $scope.model = angular.copy($scope.initial);
                    $scope.model.Employees.push(response.data)



                    $scope.successNonBlockMessage('Funcionário "'+ response.data.Name +'" salvo com sucesso.')
                }
                , function (response) {
                    $scope.handleStatusResponse(response, $scope.frmEmployee)
                });                
            }

            $scope.Phone = {
                add: function (newPhone) {
                    $scope.model.EmployeeBag.Phones.push(newPhone);
                    $scope.model.PhoneBag = {}
                }
                , remove: function (index) {
                    $scope.model.EmployeeBag.Phones.splice(index, 1);
                }
            }

            $scope.Address = {
                add: function (newAddress) {
                    $scope.model.EmployeeBag.Addresses.push(newAddress);
                    $scope.model.AddressBag = {}
                }
                , remove: function (index) {
                    $scope.model.EmployeeBag.Addresses.splice(index, 1);
                }
            }
        }
]),
employee.service('EmployeeService', function ($http, apiConfig) {
    var service = {
        getModel: function () {            
            return $http.get(apiConfig.apiUrl + 'employee/', { cache: true }).then(function (resp) {
                return resp.data;
            });
        },
        getEmployee: function (id) {
            return $http.get(apiConfig.apiUrl + 'employee/' + id, { cache: false }).then(function (resp) {
                return resp.data;
            });
        },
        actionEmployee: function (model) {
            var method = (model.MongoID) ? $http.put : $http.post;
            return method(apiConfig.apiUrl + 'employee/', model, {bypassErrorsInterceptor:true})
        }
    }
    return service;
}),
employee.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('employee', {
                url: '/employee'
                , templateUrl: '/Employee'
                , resolve: {
                    model: ['EmployeeService', function (EmployeeService) {
                        return EmployeeService.getModel();
                    }]
                    /*, lazyLoad: function ($ocLazyLoad) {
                        return $ocLazyLoad.load('lzyDataTable');
                    }*/
                }
                , controller: 'EmployeeCtrl'
            }).state('employee.new', {
                url: '/new',
                templateUrl: '/Employee/Action',
                controller: 'ActionEmployeeCtrl'
            }).state('employee.edit', {
                url: '/edit/:employeeId',
                templateUrl: '/Employee/Action/',
                controller: 'ActionEmployeeCtrl'
            })
        }
]);