﻿"use strict";
var dentApp = angular
    .module('MainApp', [
        'ui.router'
        , 'ui.bootstrap'
        , 'ui.mask'
        , 'oc.lazyLoad'
        , 'datatables'
        , 'FBAngular'
        , 'cfp.hotkeys'
        , 'dentAppDirectives'
        ,'mdlEmployee'])
    .constant('apiConfig', {
        apiUrl: 'http://localhost:2713/api/'
        , baseUrl: '/'
        , enableDebug: true
    })
    .run(['$rootScope', function ($rootScope) {
        var objMessage = {
            type: null
            , title: null
            , message: null
        }

        function nonBlockMessage(objMessage){
            new PNotify({
                title:  objMessage.title + '!',
                type: objMessage.type,
                text: objMessage.message,
                nonblock: {
                    nonblock: true
                },
                styling: 'bootstrap3'
            })
        }

        $rootScope.successNonBlockMessage = function (message) {
            objMessage.message = message
            objMessage.title = "Sucesso"
            objMessage.type = "success"

            nonBlockMessage(objMessage)            
        }

        $rootScope.errorNonBlockMessage = function (message) {
            objMessage.message = message
            objMessage.title = "Falha"
            objMessage.type = "error"

            nonBlockMessage(objMessage)
        }

        $rootScope.infoNonBlockMessage = function (message) {
            objMessage.message = message
            objMessage.title = "Info"
            objMessage.type = "info"

            nonBlockMessage(objMessage)
        }

        $rootScope.setCollapse = function () {
            $('.collapse-link').on('click', function () {
                var $BOX_PANEL = $(this).closest('.x_panel'),
                    $ICON = $(this).find('i'),
                    $BOX_CONTENT = $BOX_PANEL.find('.x_content');

                // fix for some div with hardcoded fix class
                if ($BOX_PANEL.attr('style')) {
                    $BOX_CONTENT.slideToggle(200, function () {
                        $BOX_PANEL.removeAttr('style');
                    });
                } else {
                    $BOX_CONTENT.slideToggle(200);
                    $BOX_PANEL.css('height', 'auto');
                }

                $ICON.toggleClass('fa-chevron-up fa-chevron-down');
            });

            $('.close-link').click(function () {
                var $BOX_PANEL = $(this).closest('.x_panel');

                $BOX_PANEL.remove();
            });
        }

        $rootScope.handleStatusResponse = function (response, form) {
            var message = "";
            switch (response.status) {
                case 400:
                    form.$setSubmitted();
                    message = "Formulário inválido!";
                    break;
                case 404:
                    message = "Ação inválida!";
                    break;
                default:
                    message = "Falha não conhecida!";
                    break;
            }
            $rootScope.errorNonBlockMessage(message);
        }

        $rootScope.dateformat = 'dd/MM/yyyy';

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            NProgress.start();
            if (toState.resolve) {                
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            NProgress.done();
            if (toState.resolve) {                
            }
        });
    }]);
dentApp.controller('FooterCtrl', [
  '$scope',
  '$http',
  '$state',
  'Fullscreen',
  function ($scope, $http, $state, Fullscreen) {
      $scope.goFullscreen = function () {
          // Fullscreen
          if (Fullscreen.isEnabled())
              Fullscreen.cancel();
          else
              Fullscreen.all();
      };
  }
]),
dentApp.controller('MainCtrl', [
  '$scope',
  '$http',
  '$state',
  function ($scope, $http, $state) {}
]),
dentApp.config([
    '$stateProvider',
    '$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard'),
    $stateProvider.state('MainCtrl', {
        'abstract': !0
    })
}
])
dentApp.factory('httpErrorsInterceptor', function ($q, $rootScope, EventsDict) {

    function successHandler(response) {
        return response;
    }

    function errorHandler(response) {
        var config = response.config;
        if (config.bypassErrorInterceptor) {
            return $q.reject(response);
        }
        $rootScope.$broadcast(EventsDict.httpError, response.data.cause);
        return $q.reject(response);
    }

    return function (promise) {
        return promise.then(successHandler, errorHandler);
    };

});
/*.config(['$ocLazyLoadProvider', lazyLoad])*/
/*.directive('dhxTemplate', templateDirective)
setDirectives(app);*/
var dentAppDir = angular.module('dentAppDirectives', []);