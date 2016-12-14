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
        ctrl.$element = $element;
        ctrl.actionButton = $element.querySelectorAll('button.form-control');

        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            var defer = $q.defer();
            $scope.$parent.service.getViewModel().then(function (result) {
                $scope.viewModel = result;
                defer.resolve(result.ListModel);
            });
            return defer.promise;
        }).withPaginationType('full_numbers');

        ctrl.addModel = function (modelBag) {
            if ($scope.frm.$valid) {
                $scope.viewModel.ListModel.push(modelBag);
                $scope.viewModel.ModelBag = {}
            }
        }

        ctrl.removeModel = function (index) {
            $scope.viewModel.ListModel.splice(index, 1);
        }
    }]);

    ngSimpleRegister.directive('simpleregisterPanel',
  ['$document', 'ngSimpleRegisterConfig', '$compile', '$parse', '$timeout',
  function ($document, ngSimpleRegisterConfig, $compile, $parse, $timeout) {
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