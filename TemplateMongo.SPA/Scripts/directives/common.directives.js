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
}]),
dentAppDir.directive('dateInput', ['dateFilter', function (dateFilter) {
    function link($scope, element, attrs, ngModel) {
        var el = $(element)
        el.daterangepicker({
            singleDatePicker: true,
            calender_style: "picker_1"
        }, function (dateSelected) {
            ngModel.$setViewValue(dateSelected._d.getDate())
            //var value = dateFilter(new Date(dateSelected._d.getFullYear(), dateSelected._d.getMonth(), dateSelected._d.getDay()), $scope.dateformat)
            //el.val(value)
            el.trigger('input');
        })
    }
    return {
        require: '?ngModel',
        link: link
    };
}]),
dentAppDir.directive('cleanViewValue', [
    function () {
        return {
            restrict: 'A',
            priority: 500,
            require: 'ngModel',
            link: function (scope, element, attrs, controller) {
                var parser;
                if (controller === void 0) {
                    return;
                }
                parser = function (text) {
                    var ret;
                    if (controller === void 0) {
                        return text;
                    }
                    ret = text;
                    if (text !== controller.$viewValue) {
                        ret = controller.$viewValue;
                    }
                    return ret.replace(/_/g, '');
                };
                controller.$parsers.push(parser);
            }
        };
    }
]);