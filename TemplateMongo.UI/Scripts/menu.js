/// <reference path="jquery.min.js" />
/// <reference path="bootstrap.min.js" />

(function ($) {
    'use strict';
    if (!jQuery) throw new Error('menu requires jquery');

    var Menu = function (element, options) {
        this.$element = $(element)
        this.options = options
        this.$menuHandler = null
        this.init('menu');
    }

    Menu.DEFAULTS = {
        isOpen: true
        , iconOpen: 'glyphicon glyphicon-triangle-left'
        , iconClose: 'glyphicon glyphicon-triangle-right'
        , relativeTo: $('.navbar')
        , $i: $(document.createElement('i'))
        , leftMargin: 0
        , $container: null
    }

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.menu')
            var options = $.extend({}, Menu.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data('bs.menu', (data = new Menu(this, options)))
            if (typeof option == 'number') data.to(option)
        })
    }

    Menu.prototype.init = function (type) {
        var that = this, opts = that.options
        opts.leftMargin = that.$element.outerWidth();
        var topMargin = (!opts.relativeTo) ? that.$element.offset().top : opts.relativeTo.outerHeight()
        opts.$i = $(document.createElement('i'))
        opts.$container = $('#mainContainer');

        opts.isOpen = true; //that.getMenuState();

        that.$menuHandler =
                $(document.createElement('div')).css({
                    top: topMargin
                , left: that.options.leftMargin
                }).addClass('menuHandler')
                .append(opts.$i)

        that.$menuHandler.data('topPos', topMargin)

        that.setTitle();

        that.$menuHandler.on('click', function () {
            opts.isOpen = (!opts.isOpen)
            that.toggleMenu()
            document.cookie = "menuState=" + opts.isOpen
        })

        that.toggleMenu()
        $(window).scroll(function () { that.fixMenuHandler(that.$menuHandler) });
        $(window).on("resize", function () { that.hideHandler(this) });
        $('body').append(that.$menuHandler)
        that.hideHandler($(window))
    };

    Menu.prototype.toggleMenu = function () {
        var that = this, opts = that.options
        that.$menuHandler.animate({ left: (opts.isOpen) ? opts.leftMargin : 0 })
        that.$element.animate({ left: (opts.isOpen) ? 0 : (opts.leftMargin * -1) }, function () {
            that.setTitle()
        });
        opts.$container.prop('class', (opts.isOpen) ? 'col-sm-8 col-sm-offset-3 col-md-10 col-md-offset-2 main' : 'col-sm-8 col-md-10 mainWide')
    }

    Menu.prototype.fixMenuHandler = function (element) {
        element.css({ 'position': 'fixed', 'top': element.data('topPos') });
    }

    Menu.prototype.hideHandler = function (window) {
        if ($(window).width() <= 768) {
            this.$menuHandler.hide();
        } else {
            this.$menuHandler.show();
        }
    }

    Menu.prototype.getMenuState = function () {
        var that = this
        var ret = null
        if (document.cookie != "") {
            ret = (document.cookie.replace(/(?:(?:^|.*;\s*)menuState\s*\=\s*([^;]*).*$)|^.*$/, "$1") == "true")
        } else {
            ret = that.options.isOpen
        }
        return ret
    }

    Menu.prototype.setTitle = function () {
        var that = this, opts = that.options
        that.$menuHandler.prop('title', (opts.isOpen) ? 'fechar menu' : 'abrir menu');
        opts.$i.removeProp('class');
        var css = (opts.isOpen) ? opts.iconOpen : opts.iconClose;
        opts.$i.addClass(css);
    }

    var old = $.fn.menu

    $.fn.menu = Plugin
    $.fn.menu.Constructor = Menu

    $.fn.menu.noConflict = function () {
        $.fn.menu = old
        return this
    }

} (jQuery));