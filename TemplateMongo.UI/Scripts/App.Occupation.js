/// <reference path="jquery-3.1.1.js" />
/// <reference path="bootstrap.min.js" />
/// <reference path="App.js" />
App.Occupation =
{
	btnCreateOccupation: $('#btnCreateOccupation'),
	init: function () {
		this.addCreateAction();
	},
	addCreateAction: function () {
        this.btnCreateOccupation.on("click", function (e) {
            e.preventDefault()
            var me = App.Occupation;
            App.openModal({ remote: "/Occupation/Action/", OnConfirm: me.submitForm }).on('loaded.bs.modal', function () {
                me.addManagementAction();
            });
        })
    },
	 addManagementAction: function () {
     
	 },
	 submitForm: function () {
	     $("#frmOccupation").submit()
	 }
};

$(function () {
	App.Occupation.init();
});