angular.module('MainApp').service('EmployeeService', function ($http, apiConfig) {
    var service = {
        getModel: function () {
            NProgress.start();
            return $http.get(apiConfig.apiUrl + 'employee/', { cache: true }).then(function (resp) {
                return resp.data;
            });
        },
        getEmployee: function (id) {
            return $http.get(apiConfig.apiUrl + 'employee/'+ id, { cache: true }).then(function (resp) {
                return resp.data;
            });
        }
    }
    return service;
})