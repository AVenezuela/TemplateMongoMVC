/*
PARAMETROS DE COMO USAR O PLUGIN ACIMA
Name	        type	            default	                        description
title	        string | function	'Are you sure?'	                default content value if title attribute isn't present.
singleton	    boolean	            false	                        Set true to allow only one confirmation to show at a time.
When the newest confirmation element is clicked, the older ones will disappear.
popout	        boolean	            false	                        Set true to hide the confirmation when user clicks outside of it.
This will affect all confirmations that use same selector.
btnOkClass	    string	            'btn-xs btn-primary'	        Class of the "Ok" button.
btnOkIcon	    string	            'glyphicon glyphicon-ok'	    Icon class of the "Ok" button.
btnOkLabel	    string	            'Yes'	                        Label of the "Ok" button.
btnCancelClass	string	            'btn-xs btn-default'	        Class of the "Cancel" button.
btnCancelIcon	string	            'glyphicon glyphicon-remove'    Icon class of the "Cancel" button.
btnCancelLabel	string	            'No'	                        Label of the "Cancel" button.
onConfirm	    function	        $.noop	                        Callback called when the "Ok" button is clicked.
In data-on-confirm you can give the name of a function like myConfirm or myObject.confirm.
onCancel	    function	        $.noop	                        Callback called when the "Cancel" button is clicked.
In data-on-cancel you can give the name of a function like myCancel or myObject.cancel.
*/
(function ($) {
    'use strict';

    // Confirmation extends popover.js
    if (!$.fn.popover) throw new Error('Confirmation requires popover.js');

    // CONFIRMATION PUBLIC CLASS DEFINITION
    // ===============================
    var Confirmation = function (element, options) {
        this.init('confirmation', element, options);

        var that = this;

        if (!this.options.selector) {
            // get existing href and target
            if (this.$element.attr('href')) {
                this.options.href = this.$element.attr('href');
                this.$element.removeAttr('href');
                if (this.$element.attr('target')) {
                    this.options.target = this.$element.attr('target');
                }
            }

            // cancel original event
            this.$element.on(that.options.trigger, function (e, ack) {                
                if (!ack) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            });

            // trigger original event on confirm
            this.$element.on('confirmed.bs.confirmation', function (e) {
                $(this).trigger(that.options.trigger, [true]);
            });

            // manage singleton
            this.$element.on('show.bs.confirmation', function (e) {
                if (that.options.singleton) {
                    // close all other popover already initialized
                    $(that.options._selector).not($(this)).filter(function () {                        
                        return $(this).data('bs.confirmation') !== undefined;
                    }).confirmation('hide');
                }
            });
        }

        if (!this.options._isDelegate) {
            // manage popout
            this.eventBody = false;
            this.uid = this.$element[0].id || this.getUID('group_');

            this.$element.on('shown.bs.confirmation', function (e) {
                if (that.options.popout && !that.eventBody) {
                    var $this = $(this);
                    that.eventBody = $('body').on('click.bs.confirmation.' + that.uid, function (e) {
                        if ($(that.options._selector).is(e.target)) {
                            return;
                        }

                        // close all popover already initialized
                        $(that.options._selector).filter(function () {
                            return $(this).data('bs.confirmation') !== undefined;
                        }).confirmation('hide');

                        $('body').off('click.bs.' + that.uid);
                        that.eventBody = false;
                    });
                }
            });
        }
    };

    Confirmation.DEFAULTS = $.extend({}, $.fn.popover.Constructor.DEFAULTS, {
        placement: 'top',
        title: 'Remover?',
        html: true,
        href: false,
        popout: false,
        singleton: false,
        target: '_self',
        onConfirm: $.noop,
        onCancel: $.noop,
        btnOkClass: 'btn-xs btn-primary',
        btnOkIcon: 'glyphicon glyphicon-ok',
        btnOkLabel: 'Yes',
        btnCancelClass: 'btn-xs btn-default',
        btnCancelIcon: 'glyphicon glyphicon-remove',
        btnCancelLabel: 'No',
        template:
      '<div class="popover confirmation"><div class="arrow"></div>' +
        '<div class="popover-head"><h3 class="popover-title"></h3></div>' +
        '<div class="popover-content text-center">' +
          '<div class="btn-group">' +
            '<a class="btn btn-xs" data-apply="confirmation"></a>' +
            '<a class="btn btn-xs" data-dismiss="confirmation"></a>' +
          '</div>' +
        '</div>' +
      '</div>'
    });

    Confirmation.prototype = $.extend({}, $.fn.popover.Constructor.prototype);

    Confirmation.prototype.constructor = Confirmation;

    Confirmation.prototype.getDefaults = function () {
        return Confirmation.DEFAULTS;
    };

    // custom init keeping trace of selectors
    Confirmation.prototype.init = function (type, element, options) {
        $.fn.popover.Constructor.prototype.init.call(this, type, element, options);

        this.options._isDelegate = false;
        if (options.selector) { // container of buttons
            this.options._selector = this._options._selector = options._root_selector + ' ' + options.selector;
        }
        else if (options._selector) { // children of container
            this.options._selector = options._selector;
            this.options._isDelegate = true;
        }
        else { // standalone
            this.options._selector = options._root_selector;
        }
    };

    Confirmation.prototype.setContent = function () {
        var that = this,
        $tip = this.tip(),
        o = this.options;

        $tip.find('.popover-title')[o.html ? 'html' : 'text'](this.getTitle());

        // configure 'ok' button
        $tip.find('[data-apply="confirmation"]')
      .addClass(o.btnOkClass)
      .html(o.btnOkLabel)
      .prepend($('<span></span>').addClass(o.btnOkIcon).addClass('white'), ' ')
      .off('click')
      .one('click', function (e) {
          var args = that.getArguments();
          that.$element.data('args', args);
          that.getOnConfirm.apply(that).apply(that.$element, [args]);
          that.$element.trigger('confirmed.bs.confirmation');
          that.$element.confirmation('hide');
      });

        // add href to confirm button if needed
        if (o.href && o.href != "#") {
            $tip.find('[data-apply="confirmation"]').attr({
                href: o.href,
                target: o.target
            });
        }

        // configure 'cancel' button
        $tip.find('[data-dismiss="confirmation"]')
      .addClass(o.btnCancelClass)
      .html(o.btnCancelLabel)
      .prepend($('<span></span>').addClass(o.btnCancelIcon).addClass('white'), ' ')
      .off('click')
      .one('click', function (e) {
          var args = that.getArguments();
          that.$element.data('args', args);
          that.getOnCancel.call(that).call(that.$element, [args]);
          that.$element.trigger('canceled.bs.confirmation');
          that.$element.confirmation('hide');
          that.$element.trigger(that.options.trigger, [true]);
      });

        $tip.removeClass('fade top bottom left right in');

        // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
        // this manually by checking the contents.
        if (!$tip.find('.popover-title').html()) {
            $tip.find('.popover-title').hide();
        }
    };

    Confirmation.prototype.getArguments = function () {
        var args = new Object();
        var data = null;
        for (data in this.$element.data()) {
            if (data.indexOf('parameter') >= 0) {
                var name = data.replace('parameter', '');
                args[name] = this.$element.data(data);
            }
        }
        args["element"] = this.$element;
        return args;
    };

    Confirmation.prototype.getOnConfirm = function () {
        if (this.$element.attr('data-on-confirm')) {
            return getFunctionFromString(this.$element.attr('data-on-confirm'));
        }
        else {
            return this.options.onConfirm;
        }
    };

    Confirmation.prototype.getOnCancel = function () {
        if (this.$element.attr('data-on-cancel')) {
            return getFunctionFromString(this.$element.attr('data-on-cancel'));
        }
        else {
            return this.options.onCancel;
        }
    };

    /*
    * Generates an anonymous function from a function name
    * function name may contain dots (.) to navigate through objects
    * root context is window
    */
    function getFunctionFromString(functionName) {
        var context = window,
        namespaces = functionName.split('.'),
        func = namespaces.pop();

        for (var i = 0, l = namespaces.length; i < l; i++) {
            context = context[namespaces[i]];
        }

        return function () {
            context[func].call(this);
        };
    }


    // CONFIRMATION PLUGIN DEFINITION
    // =========================

    var old = $.fn.confirmation;

    $.fn.confirmation = function (option) {
        var options = (typeof option == 'object' && option) || {};
        options._root_selector = this.selector;

        return this.each(function () {
            var $this = $(this),
          data = $this.data('bs.confirmation');

            if (!data && option == 'destroy') {
                return;
            }
            if (!data) {
                $this.data('bs.confirmation', (data = new Confirmation(this, options)));
            }
            if (typeof option == 'string') {
                data[option]();
            }
        });
    };

    $.fn.confirmation.Constructor = Confirmation;


    // CONFIRMATION NO CONFLICT
    // ===================

    $.fn.confirmation.noConflict = function () {
        $.fn.confirmation = old;
        return this;
    };

} (jQuery));




/*
AQUI COMEÇA OUTRA OPÇÃO DE CONFIRM MODAL
(function ($) {
$.fn.confirmModal = function (opts) {
var body = $('body');
var defaultOptions = {
confirmTitle: 'Favor confirmar',
confirmMessage: 'Tem certeza que deseja realizar essa ação ?',
confirmOk: 'Sim',
confirmCancel: 'Cancelar',
confirmDirection: 'rtl',
confirmStyle: 'primary',
confirmCallback: defaultCallback
};
var options = $.extend(defaultOptions, opts);
var time = Date;

var headModalTemplate =
'<div class="modal" id="#modalId#" tabindex="-1" role="dialog" aria-labelledby="#AriaLabel#" aria-hidden="true"><div class="modal-dialog" style="background-color:white">' +
'<div class="modal-header">' +
'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
'<h3>#Heading#</h3>' +
'</div>' +
'<div class="modal-body">' +
'<p>#Body#</p>' +
'</div>' +
'<div class="modal-footer">' +
'#buttonTemplate#' +
'</div></div>' +
'</div>'
;

return this.each(function (index) {
var confirmLink = $(this);
var targetData = confirmLink.data();

var currentOptions = $.extend(options, targetData);
var getOnConfirm = function () {
return getFunctionFromString(options.confirmCallback);
};
var modalId = "confirmModal" + parseInt(time + index);
var modalTemplate = headModalTemplate;
var buttonTemplate =
'<button class="btn" data-dismiss="modal" aria-hidden="true">#Cancel#</button>' +
'<button class="btn btn-#Style#" data-dismiss="ok" data-href="' + confirmLink.attr('href') + '">#Ok#</button>'
;

if (options.confirmDirection == 'ltr') {
buttonTemplate =
'<button class="btn btn-#Style#" data-dismiss="ok" data-href="' + confirmLink.attr('href') + '">#Ok#</button>' +
'<button class="btn" data-dismiss="modal" aria-hidden="true">#Cancel#</button>'
;
}

modalTemplate = modalTemplate.
replace('#buttonTemplate#', buttonTemplate).
replace('#modalId#', modalId).
replace('#AriaLabel#', options.confirmTitle).
replace('#Heading#', options.confirmTitle).
replace('#Body#', options.confirmMessage).
replace('#Ok#', options.confirmOk).
replace('#Cancel#', options.confirmCancel).
replace('#Style#', options.confirmStyle)
;

body.append(modalTemplate);

var confirmModal = $('#' + modalId);

confirmLink.on('click', function (modalEvent) {
modalEvent.preventDefault();
confirmModal.modal('show');

$('button[data-dismiss="ok"]', confirmModal).on('click', function (event) {
confirmModal.modal('hide');
options.confirmCallback(confirmLink);
});
});


});

function defaultCallback(target) {
window.location = $(target).attr('href');
}
};

function getFunctionFromString(functionName) {
var context = window,
namespaces = functionName.split('.'),
func = namespaces.pop();

for (var i = 0, l = namespaces.length; i < l; i++) {
context = context[namespaces[i]];
}

return function () {
context[func].call(this);
};
};

})(jQuery);
/*
Name	type	default	description
data-confirm-title	string	Please confirm	Title of the confirm modal.
data-confirm-message	string	Are you sure you want to perform this action ?	Message of the confirm modal.
data-confirm-ok	string	Yes	Validation button's message.
data-confirm-cancel	string	Cancel	Cancelling button's message.
data-confirm-direction	string	rtl	Direction for showing buttons, starting with the validation button.
data-confirm-style	string	primary	Style of the validation button.
data-confirm-callback	string	defaultCallback	Function to execute when validate modal..
data-confirm-dismiss	boolean	true	If modal is dismiss when confirm.
data-confirm-auto-open	boolean	false	If modal is automatically open when created.
*/