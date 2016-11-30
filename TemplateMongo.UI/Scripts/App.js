/// <reference path="jquery-3.1.1.js" />
/// <reference path="jquery.validate.min.js" />
/// <reference path="bootstrap.min.js" />
/// <reference path="actionModal.js" />
App = {
    modal: $('#myModal'),
    modalOptions: {
        url: null,
        size: null,
        confirmAction: null
    },
    init: function () {
        this.addActionTotalRecordsCombo();
    },
    openModal: function (customOpts) {
        return $('#myModal').modal(customOpts)
    },
    addActionTotalRecordsCombo: function () {
        $('[data-toggle=combopagination]').on("change", function (e) {
            e.stopPropagation();
            var formId = $(this).attr('data-form');
            $('#' + formId).submit();
        })
    },
    addActionFilter: function () {
        //actionmodal.setActionModal({ botao: $('#btnRetornaCarga'), target: $('#lblRetornaCarga') });
        $('[data-toggle=actionFilter]').each(function (a, icone) {
            var $this = $(icone);
            var formId = $this.data('form');
            var guid = $this.data("guid")
            var $target = $('#lblFilter' + guid)
            actionmodal.setActionModal({ botao: $this, target: $target });

            $target.find('[data-selector=btnClear]').on('click', function () {
                $('#' + formId)[0].reset();
            })
        })
    },
    addComponentAction: function (addActionElement, formID, objectFilter, listElement, itemParentElement, url) {
        addActionElement.off('click').on('click', function () {
            var objJSON = $(formID).serializeJSON({ containsInName: objectFilter, checkboxUncheckedValue: false });
            var htmlPrefix = listElement.attr('data-prefix')
            listElement.loadAndAppend(url + '?prefix=' + htmlPrefix, objJSON, function () {
                App.addRemoveAction(listElement, itemParentElement);
            })
        })
        App.addRemoveAction(listElement, itemParentElement);
    },
    addRemoveAction: function (listElement, itemParentElement) {
        listElement.find('[data-remove]').off('click').on('click', function () {
            var $this = $(this);
            $this.parent(itemParentElement).remove();
        })
    },
    SubmitFail: function () {

    }
};
$(function () {
    App.init();
});