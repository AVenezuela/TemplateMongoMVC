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

    $scope.dtOptions = {
        data: model.Employees
        , paginationPageSizes: [10, 20, 30]
        , paginationPageSize: 10
        , enableRowSelection: true
        , multiSelect: false
        , enableRowHeaderSelection: false
        , enableHidingColumn: false
        , enableFullRowSelection: false
        , enableHorizontalScrollbar: 0
        , enableVerticalScrollbar: 0
        , columnDefs: [
             { name: 'Nome', field: 'Name' }
           , { name: 'Nascimento', field: 'BirthDate', maxWidth: 110, minWidth: 110 }
           , { name: 'Telefone', field: 'PhonePrincipal', maxWidth: 120, minWidth: 120 }
           , { name: 'E-mail', field: 'Email' }
           , { name: '#', maxWidth: 40, minWidth: 40, cellTemplate: '<div class="ui-grid-cell-contents"><i class="fa fa-edit action-ico" ng-click="grid.appScope.rowSelect(row, rowRenderIndex)"></i></div>', enableSorting: false, enableHiding: false }
        ]
    }

    $scope.rowSelect = function (row, index) {
        $scope.gridApi.selection.selectRow(row.entity);
        $scope.model.EmployeeBag = angular.copy(row.entity)
        $state.go('employee.edit', { employeeId:row.entity.MongoID })
    }

    $scope.dtOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
    };

    $scope.$on("$destroy", function () {
        $scope.model.EmployeeBag = $scope.initial.EmployeeBag
    });
}]),
actionEmployee = function ($scope, $http, $stateParams, $state, model, EmployeeService, uiGridConstants) {
    $scope.submitForm = function () {
        EmployeeService.actionEmployee($scope.model.EmployeeBag).then(
        function (response) {
            switch ($state.$current.name) {
                case 'employee.new':
                    model.Employees.push(response.data)
                    break;
                case 'employee.edit':
                    var entity = $scope.gridApi.grid.selection.lastSelectedRow.entity
                    $scope.gridApi.grid.selection.lastSelectedRow.entity = angular.extend(entity, response.data);
                    //model.Employees.splice($stateParams.index, 1, entity)
                    break;
                default:
                    break;
            }

            $scope.gridApi.selection.clearSelectedRows();
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
        $scope.gridApi.selection.clearSelectedRows();
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
        'uiGridConstants',
        function ($scope, $http, $stateParams, $state, model, EmployeeService, uiGridConstants) {            
            actionEmployee($scope, $http, $stateParams, $state, model, EmployeeService, uiGridConstants)
        }
]),
employee.controller('EditEmployeeCtrl', [
        '$scope',
        '$http',
        '$stateParams',
        '$state',        
        'employeeModel',
        'EmployeeService',
        'uiGridConstants',
        function ($scope, $http, $stateParams, $state, model, EmployeeService, uiGridConstants) {            
            actionEmployee($scope, $http, $stateParams, $state, model, EmployeeService, uiGridConstants)            
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
                url: '/edit/{employeeId}',
                templateUrl: '/Employee/Action/',
                controller: 'EditEmployeeCtrl'
            })
        }
]);