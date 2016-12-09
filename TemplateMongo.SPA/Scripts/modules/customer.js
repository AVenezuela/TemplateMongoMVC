var customer = angular.module('mdlCustomer', []);
customer.controller('CustomerCtrl', ['$scope', '$state', 'customerModel', 'hotkeys', function ($scope, $state, model, hotkeys) {
    $scope.model = model;
    $scope.initial = angular.copy(model);

    hotkeys.add({
        combo: 'n+c',
        description: 'Inserir Cliente',
        callback: function () {
            $state.go('customer.new')
        }
    });
}]),
actionCustomer = function ($scope, $stateParams, $state, model, CustomerService, GeneralService) {    
    GeneralService.getDocumentType().then(function (response) {
        $scope.model.DocumentTypes = response
    })

    $scope.submitForm = function () {
        CustomerService.actionCustomer($scope.model.CustomerBag).then(
        function (response) {
            switch($state.$current.name) {
                case 'customer.new':
                    model.Customers.push(response.data)
                    break;
                case 'customer.edit':
                    model.Customers.splice($stateParams.index, 1, response.data)
                    break;
                default:
                    return
                    break;
            } 

            model.CustomerBag = $scope.model.CustomerBag = {}
            $scope.successNonBlockMessage('Funcionário "' + response.data.Name + '" salvo com sucesso.')            
        }
        , function (response) {
            $scope.handleStatusResponse(response, $scope.frmCustomer)
        });
    }

    $scope.cancelForm = function () {
        model = $scope.model = angular.copy($scope.initial);
        $state.go('customer')
    }

    $scope.Phone = {
        add: function (newPhone) {
            $scope.model.CustomerBag.Phones.push(newPhone);
            $scope.model.PhoneBag = {}
        }
        , remove: function (index) {
            $scope.model.CustomerBag.Phones.splice(index, 1);
        }
    }

    $scope.Address = {
        add: function (newAddress) {
            $scope.model.CustomerBag.Addresses.push(newAddress);
            $scope.model.AddressBag = {}
        }
        , remove: function (index) {
            $scope.model.CustomerBag.Addresses.splice(index, 1);
        }
    }
},
customer.controller('NewCustomerCtrl', [
        '$scope',        
        '$stateParams',
        '$state',
        'customerModel',
        'CustomerService',
        'GeneralService',
        function ($scope, $stateParams, $state, model, CustomerService, GeneralService) {
            $scope.model = $scope.initial
            actionCustomer($scope, $stateParams, $state, model, CustomerService, GeneralService)
        }
]),
customer.controller('EditCustomerCtrl', [
        '$scope',        
        '$stateParams',
        '$state',
        'customerModel',
        'CustomerService',
        'GeneralService',
        'selected',
        function ($scope, $stateParams, $state, model, CustomerService, GeneralService, selected) {
            $scope.model.CustomerBag = selected.CustomerBag
            actionCustomer($scope,  $stateParams, $state, model, CustomerService)
        }
]),
customer.service('CustomerService', ['$http', 'apiConfig', function ($http, apiConfig) {
    var service = {
        initial: null
        , getModel: function () {
            return $http.get(apiConfig.apiUrl + 'customer/', { cache: true }).then(function (resp) {
                service.initial = angular.copy(resp.data)
                return resp.data;
            });
        },
        getCustomer: function (id) {
            return $http.get(apiConfig.apiUrl + 'customer/' + id, { cache: false }).then(function (resp) {
                return resp.data;
            });
        },
        actionCustomer: function (model) {
            var method = (model.MongoID) ? $http.put : $http.post;
            return method(apiConfig.apiUrl + 'customer/', model, { bypassErrorsInterceptor: true })
        }
    }
    return service;
}]),
customer.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('customer', {
                url: '/customer'
                , templateUrl: '/Customer'
                , resolve: {
                    customerModel: ['CustomerService', function (CustomerService) {
                        return CustomerService.getModel();
                    }]
                    /*, lazyLoad: function ($ocLazyLoad) {
                        return $ocLazyLoad.load('lzyDataTable');
                    }*/
                }
                , controller: 'CustomerCtrl'
            }).state('customer.new', {
                url: '/new'
                , templateUrl: '/Customer/Action',
                controller: 'NewCustomerCtrl'
            }).state('customer.edit', {
                url: '/edit/{customerId}?index',
                resolve: {
                    selected: ['CustomerService', '$stateParams', function (CustomerService, $stateParams) {
                        return CustomerService.getCustomer($stateParams.customerId);
                    }]
                    /*, lazyLoad: function ($ocLazyLoad) {
                        return $ocLazyLoad.load('lzyDataTable');
                    }*/
                },
                templateUrl: '/Customer/Action/',
                controller: 'EditCustomerCtrl'
            })
        }
]);