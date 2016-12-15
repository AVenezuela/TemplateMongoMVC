(function () {
    "use strict";

    var ngSimpleRegister = angular.module('ngSimpleRegister', [])
    .constant('ngSimpleRegisterConfig', {
        isDisable: false
    });
    ngSimpleRegister.controller('simpleregisterPanelCtrl',
        ['$scope', '$element', 'ngSimpleRegisterConfig', '$parse', '$injector', '$window', 'DTOptionsBuilder', '$q',
    function ($scope, $element, ngSimpleRegisterConfig, $parse, $injector, $window, DTOptionsBuilder, $q) {
        var ctrl = this;        
        ctrl.initialModel = {};

        $scope.callFunction = function (name) {
            if (angular.isFunction($scope[name])) { $scope[name](); return; }
            if (angular.isFunction($scope.$parent[name])) { $scope.$parent[name](); return; }
        }

        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            var defer = $q.defer();
            $scope.$parent.service.getViewModel().then(function (result) {
                $scope.viewModel = result;
                ctrl.initialModel = angular.copy($scope.viewModel.ModelBag);
                defer.resolve(result.ListModel);
            });
            return defer.promise;
        }).withPaginationType('full_numbers');        

        $scope.addModel = function (modelBag) {
                $scope.viewModel.ListModel.push(modelBag);
                $scope.viewModel.ModelBag = angular.copy(ctrl.initialModel);
                $scope.$parent.apply();                
        }

        $scope.removeModel = function (index) {
            $scope.viewModel.ListModel.splice(index, 1);
        }
    }]);

    ngSimpleRegister.directive('simpleregisterPanel',
  ['$document', 'ngSimpleRegisterConfig', '$compile',
  function ($document, ngSimpleRegisterConfig, $compile) {
      return {
          restrict: 'E',
          templateUrl: '/Partial/SimpleRegister/',
          replace: true,
          require: ['simpleregisterPanel', '?ngModel'],
          scope: {
              dtColumns: '=dtColumns'
          },
          controller: 'simpleregisterPanelCtrl',
          controllerAs: '$registerpanel',
          compile: function (tElement, tAttrs) {
              return function (scope, element, attrs, ctrls) {
                  var $simpleregisterpanel = ctrls[0];
                  var ngModel = ctrls[1];

                  $simpleregisterpanel.subTitle = attrs.subTitle || 'Manuteção';
                  $simpleregisterpanel.baseTitle = attrs.baseTitle || 'Formulário';
                  $simpleregisterpanel.ngModel = ngModel;
              };
          }
      };
  }]);
}());