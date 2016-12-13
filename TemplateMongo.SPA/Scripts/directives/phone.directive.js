﻿(function () {
    "use strict";

    var KEY = {
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        HOME: 36,
        END: 35,
        BACKSPACE: 8,
        DELETE: 46,
        COMMAND: 91,

        MAP: {
            91: "COMMAND", 8: "BACKSPACE", 9: "TAB", 13: "ENTER", 16: "SHIFT", 17: "CTRL", 18: "ALT", 19: "PAUSEBREAK", 20: "CAPSLOCK", 27: "ESC", 32: "SPACE", 33: "PAGE_UP", 34: "PAGE_DOWN", 35: "END", 36: "HOME", 37: "LEFT", 38: "UP", 39: "RIGHT", 40: "DOWN", 43: "+", 44: "PRINTSCREEN", 45: "INSERT", 46: "DELETE", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 59: ";", 61: "=", 65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H", 73: "I", 74: "J", 75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R", 83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X", 89: "Y", 90: "Z", 96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111: "/", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NUMLOCK", 145: "SCROLLLOCK", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'"
        },

        isControl: function (e) {
            var k = e.which;
            switch (k) {
                case KEY.COMMAND:
                case KEY.SHIFT:
                case KEY.CTRL:
                case KEY.ALT:
                    return true;
            }

            if (e.metaKey || e.ctrlKey || e.altKey) return true;

            return false;
        },
        isFunctionKey: function (k) {
            k = k.which ? k.which : k;
            return k >= 112 && k <= 123;
        },
        isVerticalMovement: function (k) {
            return ~[KEY.UP, KEY.DOWN].indexOf(k);
        },
        isHorizontalMovement: function (k) {
            return ~[KEY.LEFT, KEY.RIGHT, KEY.BACKSPACE, KEY.DELETE].indexOf(k);
        },
        toSeparator: function (k) {
            var sep = { ENTER: "\n", TAB: "\t", SPACE: " " }[k];
            if (sep) return sep;
            // return undefined for special keys other than enter, tab or space.
            // no way to use them to cut strings.
            return KEY[k] ? undefined : k;
        }
    };

    var ngPhone = angular.module('ngPhone', [])
    .constant('ngPhoneConfig', {
        isDisable: false
    });
    ngPhone.controller('phonePanelCtrl', ['$scope', '$element', 'ngPhoneConfig', '$parse', '$injector', '$window',
    function ($scope, $element, ngPhoneConfig, $parse, $injector, $window) {
        var ctrl = this;
        ctrl.$element = $element;
        ctrl.phoneInput = $element.querySelectorAll('input.form-control');

        ctrl.phoneInput.on('keydown', function (e) {
            var key = e.which;
            if (~[KEY.ENTER].indexOf(key)) {
                ctrl.addPhone($scope.PhoneBag);
                e.preventDefault();
                e.stopPropagation();
                $scope.$apply();
            }
        })

        ctrl.addPhone = function (phoneBag) {
            if ($scope.frmPhones.$valid) {
                $scope.Phones.push(phoneBag);
                $scope.PhoneBag = {}                
            }            
        }

        ctrl.removePhone = function (index) {
            $scope.Phones.splice(index, 1);
        }
    }]);

    ngPhone.directive('phonePanel',
  ['$document', 'ngPhoneConfig', '$compile', '$parse', '$timeout',
  function ($document, ngPhoneConfig, $compile, $parse, $timeout) {
      return {
          restrict: 'E',
          templateUrl: '/Partial/Phone/',
          replace: true,
          require: ['phonePanel', '?ngModel'],
          scope: {
              Phones: '=phones'
          },
          controller: 'phonePanelCtrl',
          controllerAs: '$phonepanel',
          compile: function (tElement, tAttrs) {
              return function (scope, element, attrs, ctrls) {
                  var $phonepanel = ctrls[0];
                  var ngModel = ctrls[1];
                  $phonepanel.subTitle = attrs.title || 'Inserir Telefone';
                  //$phonepanel.Phones = scope[attrs.ngModel];
                  $phonepanel.ngModel = ngModel;
              };
          }
      };
  }]);
}());