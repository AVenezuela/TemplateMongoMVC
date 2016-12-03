angular.module('MainApp').config(['$stateProvider', function routerConfig($stateProvider) {
    var states = [
        {
            name: 'employee'
         , body: {
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
             , controller: 'EmployeeController'
             , onEnter: function () {
                 NProgress.done();
             }
         }
        },
        {
            name: 'customer'
            , body: {
                url: '/customer'
                , template: '<h1>About</h1>'
            }
        },
        {
            name: 'occupation'
            , body: {
                url: '/occupation'
                , template: '<h1>Occupation</h1>'
            }
        }
    ]

    states.forEach(function (state) {
        $stateProvider.state(state.name, state.body);
    });
}]);