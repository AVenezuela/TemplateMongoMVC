/// <reference path="jquery.min.js" />
/// <reference path="jquery-x.js" />
/// <reference path="bootstrap.min.js" />
/// <reference path="CapturaLimitada.js" />

(function ($) {

    $.fn.timepicker = function (options) {

        var defaults = {
            format_output: function (tim, mini, meri) {
                if (settings.show_meridian) {
                    return tim + ":" + mini + " " + meri;
                } else {
                    return tim + ":" + mini;
                }
            },
            mode: 'strict', // modo de operacao, pode ser open = aceita qualquer hora no formato 99:99, ou strict = aceita horário de 00:00 até as 23:59
            increase_direction: 'up',
            custom_classes: '',
            min_hour_value: 0,
            max_hour_value: 23,
            min_min_value: 0,
            max_min_value: 59,
            show_meridian: false,
            step_size_hours: '1',
            step_size_minutes: '1',
            overflow_minutes: false,
            disable_keyboard_mobile: false,
            reset: false,
            regex: /^([0-9]{2}):([0-9]{2})\s?(AM|PM)?/,
            regexstrict: /^((?:\d|[01]\d|2[0-3])):([0-5]\d)\s?(AM|PM)?/
        };

        var settings = $.extend({}, defaults, options);

        return this.each(function () {
            var ele = $(this);
            var ele_hei = ele.outerHeight();
            ele_hei += 10;
            $(ele).wrap("<div class='time_pick'>");
            var ele_par = $(this).parents(".time_pick");
            var cssMeridian = ""
            if (!settings.show_meridian) cssMeridian = " hide"
            var new_ele = $(
				"<div class='timepicker_wrap text-center " + settings.custom_classes + "'><table>" +
					"<thead class='timepicker-header'><tr><th colspan=3>Escolha o horário</th></tr></thead><tbody class='timepicker-body'>" +
					"<tr>" +
						"<td class='time'><div class='glyphicon glyphicon-chevron-up action-next' id='upHour'></div></td>" +
                        "<td class='mins'><div class='glyphicon glyphicon-chevron-up action-next' id='upMinute'></div></td>" +
                        "<td class='meridian" + cssMeridian + "'><div class='glyphicon glyphicon-chevron-up action-next' id='upMeridian'></div></td>" +
					"</tr>" +
                    "<tr>" +
                        "<td class='time'><input type='text' maxlength=2 id='lblHour' class='form-control input-xs'" + (settings.disable_keyboard_mobile ? "readonly" : "") + "></td>" +
                        "<td class='mins'><input type='text' maxlength=2 id='lblMinute' class='form-control input-xs'" + (settings.disable_keyboard_mobile ? "readonly" : "") + "></td>" +
                        "<td class='meridian" + cssMeridian + "'><input type='text' maxlength=2 id='lblMeridian' class='form-control input-xs' readonly></td>" +
                    "</tr>" +
					"<tr>" +
						"<td class='time'><div class='glyphicon glyphicon-chevron-down action-prev' id='downHour'></div></td>" +
						"<td class='mins'><div class='glyphicon glyphicon-chevron-down action-prev' id='downMinute'></div></td>" +
                        "<td class='meridian" + cssMeridian + "'><div class='glyphicon glyphicon-chevron-down action-prev' id='downMeridian'></div></td>" +
					"</tr>" + ((settings.reset) ? "<tr><td colspan=3><a href='#' class='reset_time'>Reset</a></td></tr>" : "") +
                    "</tbody></table>");

            new_ele.css('top', ele_hei)
            ele_par.append(new_ele);
            var ele_next = $(this).next(".timepicker_wrap");
            var ele_next_all_child = ele_next.find("div");
            var inputs = ele_par.find('input');

            $('.reset_time').on("click", function (event) {
                ele.val("");
                close_timepicker();
            });
            $(".timepicker-input").keydown(function (keyevent) {
                var len = $(this).val().length;

                // Allow: backspace, delete, tab, escape, enter and .
                if ($.inArray(keyevent.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A
					    (keyevent.keyCode == 65 && keyevent.ctrlKey === true) ||
                // Allow: home, end, left, right
					    (keyevent.keyCode >= 35 && keyevent.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((keyevent.shiftKey || (keyevent.keyCode < 48 || keyevent.keyCode > 57)) &&
					(keyevent.keyCode < 96 || keyevent.keyCode > 105) || len == 2) {
                    keyevent.preventDefault();
                }

            });

            // open or close time picker when clicking
            $(document).on("click", function (event) {
                if (!$(event.target).is(ele_next) && ele_next.css("display") == "block" && !$(event.target).is($('.reset_time'))) {
                    if (!$(event.target).is(ele)) {
                        set_value(event, !is_element_in_timepicker($(event.target)));
                    } else {
                        var ele_lef = 0;

                        ele_next.css({
                            "top": ele_hei + "px",
                            "left": ele_lef + "px"
                        });
                        open_timepicker();
                    }
                }
            });

            // open the modal when the user focuses on the input
            ele.on('focus', open_timepicker);

            // select all text in input when user focuses on it
            inputs.on('focus', function () {
                var input = $(this);
                if (!input.is(ele)) {
                    input.select();
                }
            });

            // allow user to increase and decrease numbers using arrow keys
            inputs.on('keydown', function (e) {
                var direction, input = $(this);

                // UP
                if (e.which === 38) {
                    if (settings.increase_direction === 'down') {
                        direction = 'prev';
                    } else {
                        direction = 'next';
                    }
                    // DOWN
                } else if (e.which === 40) {
                    if (settings.increase_direction === 'down') {
                        direction = 'next';
                    } else {
                        direction = 'prev';
                    }
                }

                if (input.closest('.timepicker_wrap .time').length) {
                    change_time(null, direction);
                } else if (input.closest('.timepicker_wrap .mins').length) {
                    change_mins(null, direction);
                } else if (input.closest('.timepicker_wrap .meridian').length && settings.show_meridian) {
                    change_meri(null, direction);
                }
            });

            // close the modal when the time picker loses keyboard focus
            inputs.on('blur', function () {
                setTimeout(function () {
                    var focused_element = $(document.activeElement);
                    if (focused_element.is(':input') && !is_element_in_timepicker(focused_element)) {
                        set_value();
                        close_timepicker();
                    }
                }, 0);
            });

            function is_element_in_timepicker(jquery_element) {
                return $.contains(ele_par[0], jquery_element[0]) || ele_par.is(jquery_element);
            }

            function set_value(event, close) {
                // use input values to set the time
                var tim = ele_next.find("#lblHour").val();
                var mini = ele_next.find("#lblMinute").val();
                var meri = "";
                if (settings.show_meridian) {
                    meri = ele_next.find("#lblMeridian").val();
                }

                if (tim.length !== 0 && mini.length !== 0 && (!settings.show_meridian || meri.length !== 0)) {
                    if (validValue(settings.format_output(tim, mini, meri))) {
                        var ele_st = Number(settings.min_hour_value);
                        var ele_en = Number(settings.max_hour_value);

                        if (tim < ele_st || tim > ele_en)
                            tim = 0

                        ele_st = Number(settings.min_min_value);
                        ele_en = Number(settings.max_min_value);

                        if (mini < ele_st || mini > ele_en)
                            mini = 0

                        tim = tim.toString().lpad('0', 2);
                        mini = mini.toString().lpad('0', 2);

                        // store the value so we can set the initial value
                        // next time the picker is opened
                        ele.attr('data-timepicker-tim', tim);
                        ele.attr('data-timepicker-mini', mini);

                        if (settings.show_meridian) {
                            ele.attr('data-timepicker-meri', meri);
                            // set the formatted value
                            ele.val(settings.format_output(tim, mini, meri));
                        } else {
                            ele.val(settings.format_output(tim, mini));
                        }
                    } else {
                        ele.val('');
                    }
                }

                ele_next.find("#lblHour").val(tim);
                ele_next.find("#lblMinute").val(mini);

                if (close) {
                    close_timepicker();
                }
            }

            function set_initials() {
                var propMode = ele.prop('data-timepicker-mode');                
                settings.mode = propMode || settings.mode;
                ele.prop('data-timepicker-mode', settings.mode)                
                switch (settings.mode) {
                    case "open":
                        settings.max_hour_value = 99;
                        break;
                    case "strict":
                        settings.max_hour_value = 23;
                        break;
                    default:
                        throw new Error('Timepicker mode invalid or not informed.');
                        break;
                }
            }

            function open_timepicker() {
                set_initials();
                set_date(settings.start_time);
                ele_next.fadeIn();
                // focus on the first input and select its contents
                var first_input = ele_next.find('input:visible').first();
                first_input.focus();
                // if the user presses shift+tab while on the first input,
                // they mean to exit the time picker and go to the previous field
                var first_input_exit_handler = function (e) {
                    if (e.which === 9 && e.shiftKey) {
                        first_input.off('keydown', first_input_exit_handler);
                        var all_form_elements = $(':input:visible:not(.timepicker-input)');
                        var index_of_timepicker_input = all_form_elements.index(ele);
                        var previous_form_element = all_form_elements.get(index_of_timepicker_input - 1);
                        previous_form_element.focus();
                    }
                };
                first_input.on('keydown', first_input_exit_handler);
            }

            function close_timepicker() {
                ele_next.fadeOut();
            }

            function validValue(str) {
                return ((settings.regex.exec(str)) !== null);
            }

            function getValueFromElement() {
                var ret = { "ti": null, "mi": null, "mer": null };
                var m;
                var str = ele.val();
                if ((m = settings.regex.exec(str)) !== null) {
                    if (m.index === settings.regex.lastIndex) {
                        settings.regex.lastIndex++;
                    }
                    ret.ti = m[1];
                    ret.mi = m[2];
                    ret.mer = m[3];
                } else {
                    var d = new Date();


                    ret.ti = d.getHours();
                    ret.mi = d.getMinutes();
                    ret.mer = "AM";
                    if (12 < ret.ti && settings.show_meridian) {
                        ret.ti -= 12;
                        ret.mer = "PM";
                    }
                }
                return ret;
            }

            function set_date(start_time) {
                var d, ti, mi, mer;
                if (ele.val() != '') {
                    var ret = getValueFromElement();
                    ti = ret.ti;
                    mi = ret.mi;
                    if (settings.show_meridian) {
                        mer = ret.mer;
                    }
                } else {
                    // if a value was already picked we will remember that value
                    if (ele.is('[data-timepicker-tim]')) {
                        ti = Number(ele.attr('data-timepicker-tim'));
                        mi = Number(ele.attr('data-timepicker-mini'));
                        if (settings.show_meridian) {
                            mer = ele.attr('data-timepicker-meri');
                        }
                        // developer can specify a custom starting value
                    } else if (typeof start_time === 'object') {
                        ti = Number(start_time[0]);
                        mi = Number(start_time[1]);
                        if (settings.show_meridian) {
                            mer = start_time[2];
                        }
                        // default is we will use the current time
                    } else {
                        d = new Date();
                        ti = d.getHours();
                        mi = d.getMinutes();
                        mer = "AM";
                        if (12 < ti && settings.show_meridian) {
                            ti -= 12;
                            mer = "PM";
                        }
                    }
                }
                ele_next.find("#lblHour").val(ti.toString().lpad('0', 2));

                ele_next.find("#lblMinute").val(mi.toString().lpad('0', 2));

                if (settings.show_meridian) {
                    ele_next.find("#lblMeridian").val(mer);
                }
            }

            function change_time(cur_ele, direction) {
                var cur_cli = "time";
                var cur_time = Number(ele_next.find("." + cur_cli + " #lblHour").val());
                var ele_st = Number(settings.min_hour_value);
                var ele_en = Number(settings.max_hour_value);
                var step_size = Number(settings.step_size_hours);
                if ((cur_ele && cur_ele.hasClass('action-next')) || direction === 'next') {
                    if (cur_time + step_size > ele_en) {
                        var min_value = ele_st;
                        ele_next.find("." + cur_cli + " #lblHour").val(min_value.toString().lpad('0', 2));
                    } else {
                        cur_time = cur_time + step_size;
                        ele_next.find("." + cur_cli + " #lblHour").val(cur_time.toString().lpad('0', 2));
                    }
                } else if ((cur_ele && cur_ele.hasClass('action-prev')) || direction === 'prev') {
                    if (cur_time - step_size < 0) {
                        var max_value = ele_en;
                        ele_next.find("." + cur_cli + " #lblHour").val(max_value.toString().lpad('0', 2));
                    } else {
                        cur_time = cur_time - step_size;
                        ele_next.find("." + cur_cli + " #lblHour").val(cur_time.toString().lpad('0', 2));
                    }
                }
            }

            function change_mins(cur_ele, direction) {
                var cur_cli = "mins";
                var cur_mins = Number(ele_next.find("." + cur_cli + " #lblMinute").val());
                var ele_st = 0;
                var ele_en = 59;
                var step_size = Number(settings.step_size_minutes);
                if ((cur_ele && cur_ele.hasClass('action-next')) || direction === 'next') {
                    if (cur_mins + step_size > ele_en) {
                        ele_next.find("." + cur_cli + " #lblMinute").val("00");
                        if (settings.overflow_minutes) {
                            change_time(null, 'next');
                        }
                    } else {
                        cur_mins = cur_mins + step_size;
                        ele_next.find("." + cur_cli + " #lblMinute").val(cur_mins.toString().lpad('0', 2));
                    }
                } else if ((cur_ele && cur_ele.hasClass('action-prev')) || direction === 'prev') {
                    if (cur_mins - step_size <= -1) {
                        ele_next.find("." + cur_cli + " #lblMinute").val(ele_en + 1 - step_size);
                        if (settings.overflow_minutes) {
                            change_time(null, 'prev');
                        }
                    } else {
                        cur_mins = cur_mins - step_size;
                        ele_next.find("." + cur_cli + " #lblMinute").val(cur_mins.toString().lpad('0', 2));
                    }
                }
            }

            function change_meri(cur_ele, direction) {
                var cur_cli = "meridian";
                var ele_st = 0;
                var ele_en = 1;
                var cur_mer = null;
                cur_mer = ele_next.find("." + cur_cli + " #lblMeridian").val();
                if ((cur_ele && cur_ele.hasClass('action-next')) || direction === 'next') {
                    if (cur_mer == "AM") {
                        ele_next.find("." + cur_cli + " #lblMeridian").val("PM");
                    } else {
                        ele_next.find("." + cur_cli + " #lblMeridian").val("AM");
                    }
                } else if ((cur_ele && cur_ele.hasClass('action-prev')) || direction === 'prev') {
                    if (cur_mer == "AM") {
                        ele_next.find("." + cur_cli + " #lblMeridian").val("PM");
                    } else {
                        ele_next.find("." + cur_cli + " #lblMeridian").val("AM");
                    }
                }
            }

            // handle clicking on the arrow icons            
            var cur_next = ele_next.find("#upHour");
            var cur_prev = ele_next.find("#downHour");
            $(cur_prev).add(cur_next).on("click", function () {
                var cur_ele = $(this);
                change_time(cur_ele);
            });

            cur_next = ele_next.find("#upMinute");
            cur_prev = ele_next.find("#downMinute");
            $(cur_prev).add(cur_next).on("click", function () {
                var cur_ele = $(this);
                change_mins(cur_ele);
            });

            if (settings.show_meridian) {
                cur_next = ele_next.find("#upMeridian");
                cur_prev = ele_next.find("#downMeridian");
                $(cur_prev).add(cur_next).on("click", function () {
                    var cur_ele = $(this);
                    if (settings.show_meridian) {
                        change_meri(cur_ele);
                    }
                });
            }
        });
    };

} (jQuery));