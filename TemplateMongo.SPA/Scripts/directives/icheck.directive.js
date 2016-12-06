dentAppDir.directive('icheck', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ngModel) {
                $timeout(function () {
                    var value = attr.value;

                    function update(checked) {
                        if (attr.type === 'radio') {
                            ngModel.$setViewValue(value);
                        } else {
                            ngModel.$setViewValue(checked);
                        }
                    }

                    $(element).iCheck({
                        checkboxClass: attr.checkboxClass || 'icheckbox_flat-green',
                        radioClass: attr.radioClass || 'iradio_flat-green'
                    }).on('ifChanged', function (e) {
                        scope.$apply(function () {
                            update(e.target.checked);
                        });
                    });

                    scope.$watch(attr.ngChecked, function (checked) {
                        if (typeof checked === 'undefined') checked = !!ngModel.$viewValue;
                        update(checked)
                    }, true);

                    scope.$watch(attr.ngModel, function (model) {
                        $(element).iCheck('update');
                    }, true);

                })
            }
        }
    }])