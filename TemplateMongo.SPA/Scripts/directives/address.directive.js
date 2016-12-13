(function () {
    "use strict";   

    var ngAddress = angular.module('ngAddress', [])
    .constant('ngAddressConfig', {
        isDisable: false
    });
    ngAddress.controller('addressPanelCtrl', ['$scope', '$element', 'ngAddressConfig', '$parse', '$injector', '$window',
    function ($scope, $element, ngAddressConfig, $parse, $injector, $window) {
        var ctrl = this;
        ctrl.$element = $element;
        ctrl.addressInput = $element.querySelectorAll('input.form-control');       

        ctrl.addAddress = function (addressBag) {
            if ($scope.frmAddresses.$valid) {
                $scope.Addresses.push(addressBag);
                $scope.AddressBag = {}                
            }            
        }

        ctrl.removeAddress = function (index) {
            $scope.Addresses.splice(index, 1);
        }
    }]);

    ngAddress.directive('addressPanel',
  ['$document', 'ngAddressConfig', '$compile', '$parse', '$timeout',
  function ($document, ngAddressConfig, $compile, $parse, $timeout) {
      return {
          restrict: 'E',
          templateUrl: '/Partial/Address/',
          replace: true,
          require: ['addressPanel', '?ngModel'],
          scope: {
              Addresses: '=addresses'
          },
          controller: 'addressPanelCtrl',
          controllerAs: '$addresspanel',
          compile: function (tElement, tAttrs) {
              return function (scope, element, attrs, ctrls) {
                  var $addresspanel = ctrls[0];
                  var ngModel = ctrls[1];
                  $addresspanel.subTitle = attrs.title || 'Inserir Endereço';
                  $addresspanel.ngModel = ngModel;
              };
          }
      };
  }]);
}());