angular.module('MainApp').config(['$stateProvider', function routerConfig($stateProvider) {
    var states = [
        {
            name: 'occupation'
            , body: {
                url: '/occupation'
                , template: '<h1>Occupation</h1>'
            }
        },
        {
            name: 'dashboard'
            , body: {
                url: '/dashboard'
                , templateUrl: '/Home/DashBoard'
            }
        }
    ]

    states.forEach(function (state) {
        $stateProvider.state(state.name, state.body);
    });
}]);