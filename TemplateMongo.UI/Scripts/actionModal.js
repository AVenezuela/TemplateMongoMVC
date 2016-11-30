/// <reference path="CapturaLimitada.js" />
/// <reference path="CapturaLimitada.VO.js" />
/// <reference path="jquery.min.js" />
/// <reference path="bootstrap.min.js" />
actionmodal =
{
    botao: null
    , target: null
    , divWrap: null
    , setActionModal: function (elements) {
        this.botao = elements.botao;
        this.target = elements.target;
        this.addAcao();
    },
    addAcao: function () {
        var that = this
        that.botao.on('click', function (e) {
            e.stopPropagation();
            var show = that.botao.prop('disabled') || "true"
            
            if (show == "true") {
                if (that.botao.is('input')) that.botao.prop('disabled', true);
                var lblOffeSet = that.botao.offset();
                var height = that.botao.outerHeight(), width = that.botao.outerWidth();
                var offLeft = that.botao[0].offsetLeft, offTop = that.botao[0].offsetTop
                var lblheight = that.target.outerHeight(), lblwidth = that.target.outerWidth();
                //that.target.css('top', ((offTop - lblheight) + height)).css('left', ((offLeft - lblwidth) + width))

                that.divWrap =
                    $(document.createElement('div')).css({
                        width: lblwidth
                        , height: lblheight
                    }).addClass('divWrap')

                that.botao.parent().append(that.divWrap)
                that.divWrap.show("fast", function () {
                    that.botao.toggle("transfer", { to: that.divWrap }, 500,
                    function () {
                        that.divWrap.append(that.target);
                        that.target.toggle("fade", function () {
                            that.target.find('input[type=text],textarea,select').filter(':visible:first').focus();
                            that.target.find('#btnClose').one('click', function () {
                                that.hideTarget()
                            });
                        });
                        $(document).one('click', function () { that.hideTarget() })
                    });
                });
                that.target.click(function (e) {
                    e.stopPropagation();
                });
            }
        })
    },
    hideTarget: function () {
        var that = this;
        that.botao.fadeIn("fast");
        that.target.fadeOut("fast", function () {
            that.divWrap.css('left', 0)
            that.botao.prop('disabled', false)
        });
    }
}

/*
#####################
OLD
#####################
actionmodal =
{
botao: null
, target: null
, setActionModal: function (elements) {
this.botao = elements.botao;
this.target = elements.target;
this.addAcao();
},
addAcao: function () {
var that = this
that.botao.on('click', function (e) {
e.stopPropagation();
that.botao.prop('disabled', true);
var lblOffeSet = that.botao.offset();
var height = that.botao.outerHeight(), width = that.botao.outerWidth();
var offLeft = that.botao[0].offsetLeft, offTop = that.botao[0].offsetTop
var lblheight = that.target.outerHeight(), lblwidth = that.target.outerWidth();
that.target.css('top', ((offTop - lblheight) + height)).css('left', ((offLeft - lblwidth) + width))
that.target.click(function (e) {
e.stopPropagation();
});
that.target.effect("bounce", { times: 2 }, "slow", function () {
that.target.find('input[type=text],textarea,select').filter(':visible:first').focus();
$(this).find('#closeRetornaCarga').one('click', function () {
that.hideTarget()
});
$(document).one('click', function () { that.hideTarget() })
});
})
},
hideTarget: function () {
this.target.fadeOut();
this.botao.prop('disabled', false);
}
}
*/