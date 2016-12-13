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
                , controller: 'MainCtrl'
            }
        },
        {
            name:'error'
            , body:{
                url:'/error'
                , resolve: {
                    errorObj: [function () {
                        return this.self.error;
                    }]
                },
                controller: 'ErrorCtrl'
                , templateUrl: 'error.html'
            }
        }
    ]

    states.forEach(function (state) {
        $stateProvider.state(state.name, state.body);
    });
}]);