(function (angular, undefined) {
    "use strict";
    angular
        .module('MainApp', ['ui.router', 'oc.lazyLoad', 'datatables'])                
        .constant('apiConfig', {
            apiUrl: 'http://localhost:2713/api/'
            , baseUrl: '/'
            , enableDebug: true
        })
        .run(['$rootScope', function ($rootScope) {
            $rootScope.closeDialog = function () {
                
            };

            $rootScope.toastMessage = function (message) {
                
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
                $rootScope.toastMessage(message);
            }
        }]);
        /*.config(['$ocLazyLoadProvider', lazyLoad])*/
    /*.directive('dhxTemplate', templateDirective)
    setDirectives(app);*/
})(angular);