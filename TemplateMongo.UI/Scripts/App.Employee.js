/// <reference path="jquery-3.1.1.js" />
/// <reference path="bootstrap.min.js" />
/// <reference path="App.js" />
App.Employee =
{
    btnCreateEmployee: $("#btnCreateEmployee"),
    lblListEmployees: $('#lblListEmployees'),
    init: function () {
        App.addActionFilter();
        this.addCreateAction();
        this.addListActions();
    },
    addCreateAction: function () {
        this.btnCreateEmployee.on("click", function (e) {
            e.preventDefault()
            var me = App.Employee;
            App.openModal({ remote: "/Employee/Action/", OnConfirm: me.submitForm, size: 'modal-wide' }).on('loaded.bs.modal', function () {
                me.addManagementAction();
            });
        })
    },
    addListActions: function () {
        this.lblListEmployees.bind('DOMSubtreeModified', function (a) {
            var me = App.Employee
            var $this = me.lblListEmployees
            //execs only one time
            if ((!$this.data('loaded')) || (a.target.id == a.currentTarget.id)) {
                me.addEditAction();
                $this.data('loaded', true);
            }
        })
    },
    addManagementAction: function () {
        var me = App.Employee;
        me.managePhone();
        me.manageAddress();
    },
    submitForm: function () {
        $("#frmEmployee").submit()
    },
    managePhone: function () {
        var btnAddPhone = $('#btnAddPhoneBag')
        var lstPhone = $('#lstPhoneBag')
        App.addComponentAction(btnAddPhone, '#frmEmployee', 'PhoneBag', lstPhone, 'li', '/Employee/AddPhone/')
    },
    manageAddress: function () {
        var btnAdd = $('#btnAddAddressBag')
        var lst = $('#lstAddressBag')
        App.addComponentAction(btnAdd, '#frmEmployee', 'AddressBag', lst, 'li', '/Employee/AddAddress/')
    },
    addEditAction: function () {
        $('#lstEmployees').find('[title=Edit]').on('click', function (e) {
            var $this = $(this)
            if ($this.is('a')) e.preventDefault()
            var me = App.Employee;
            App.openModal({ remote: $this.attr('href'), OnConfirm: me.submitForm }).on('loaded.bs.modal', function () {
                me.addManagementAction();
            });
        })
    },
    emptyFunction: function () { }
};

$(function () {
    App.Employee.init();
});