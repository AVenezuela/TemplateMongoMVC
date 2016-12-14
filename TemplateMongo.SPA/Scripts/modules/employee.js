var employee = angular.module('mdlEmployee', []);
employee.controller('EmployeeCtrl', ['$scope', '$state', 'employeeModel', 'hotkeys', function ($scope, $state, model, hotkeys) {
    $scope.model = model;
    $scope.initial = angular.copy(model);

    hotkeys.add({
        combo: 'n+f',
        description: 'Inserir funcionário',
        callback: function () {
            $state.go('employee.new')
        }
    });

    $scope.$on("$destroy", function () {
        $scope.model.EmployeeBag = $scope.initial.EmployeeBag
    });
}]),
actionEmployee = function ($scope, $http, $stateParams, $state, model, EmployeeService) {
    $scope.submitForm = function () {
        EmployeeService.actionEmployee($scope.model.EmployeeBag).then(
        function (response) {
            switch($state.$current.name) {
                case 'employee.new':
                    model.Employees.push(response.data)                    
                    break;
                case 'employee.edit':
                    model.Employees.splice($stateParams.index, 1, response.data)
                    break;
                default:                   
                    break;
            } 

            model.EmployeeBag = $scope.model.EmployeeBag = {}
            $scope.successNonBlockMessage('Funcionário "' + response.data.Name + '" salvo com sucesso.')
            $scope.apply()
        }
        , function (response) {
            $scope.handleStatusResponse(response, $scope.frmEmployee)
        });
    }

    $scope.cancelForm = function () {
        model.EmployeeBag = $scope.model.EmployeeBag = angular.copy($scope.initial.EmployeeBag);
        $state.go('employee')
    }
},
employee.controller('NewEmployeeCtrl', [
        '$scope',
        '$http',
        '$stateParams',
        '$state',
        'employeeModel',
        'EmployeeService',
        function ($scope, $http, $stateParams, $state, model, EmployeeService) {
            $scope.model.EmployeeBag = $scope.initial.EmployeeBag
            actionEmployee($scope, $http, $stateParams, $state, model, EmployeeService)
        }
]),
employee.controller('EditEmployeeCtrl', [
        '$scope',
        '$http',
        '$stateParams',
        '$state',
        'employeeModel',
        'EmployeeService',
        'selected',
        function ($scope, $http, $stateParams, $state, model, EmployeeService, selected) {
            $scope.model.EmployeeBag = selected.EmployeeBag
            actionEmployee($scope, $http, $stateParams, $state, model, EmployeeService)
        }
]),
employee.service('EmployeeService', ['$http', 'apiConfig', '$q', function ($http, apiConfig, $q) {
    this.employeeModel;
    var self = this;
    var service = {
        getModel: function () {
            if (angular.isDefined(self.employeeModel)) {
                return $q.when(self.employeeModel)
            }
            return $http.get(apiConfig.apiUrl + 'employee/', { cache: true }).then(function (resp) {
                self.employeeModel = resp.data;
                return resp.data;
            });
        },
        getEmployee: function (id) {
            return $http.get(apiConfig.apiUrl + 'employee/?id=' + id, { cache: false }).then(function (resp) {
                return resp.data;
            });
        },
        actionEmployee: function (model) {
            var method = (model.MongoID) ? $http.put : $http.post;
            return method(apiConfig.apiUrl + 'employee/', model, { bypassErrorsInterceptor: true })
        }
    }
    return service;
}]),
employee.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('employee', {
                url: '/employee'
                , templateUrl: '/Employee'
                , resolve: {
                    employeeModel: ['EmployeeService', function (EmployeeService) {
                        return EmployeeService.getModel();
                    }]
                    /*, lazyLoad: function ($ocLazyLoad) {
                        return $ocLazyLoad.load('lzyDataTable');
                    }*/
                }
                , controller: 'EmployeeCtrl'
            }).state('employee.new', {
                url: '/new'
                , templateUrl: '/Employee/Action',
                controller: 'NewEmployeeCtrl'
            }).state('employee.edit', {
                url: '/edit/{employeeId}?index',
                resolve: {
                    selected: ['EmployeeService', '$stateParams', function (EmployeeService, $stateParams) {
                        return EmployeeService.getEmployee($stateParams.employeeId);
                    }]
                    /*, lazyLoad: function ($ocLazyLoad) {
                        return $ocLazyLoad.load('lzyDataTable');
                    }*/
                },
                templateUrl: '/Employee/Action/',
                controller: 'EditEmployeeCtrl'
            })
        }
]);