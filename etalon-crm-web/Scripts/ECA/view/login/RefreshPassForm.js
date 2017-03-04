Ext.define('ECA.view.login.RefreshPassForm',
{
    extend: 'Ext.window.Window',
    renderTo: Ext.getBody(),
    requires: 'Ext.form.Panel',
    bodyPagging: 10,
    title: 'Etalon CRM: обновить пароль',
    closable: false,
    //autoShow: false,
    resizable: false,
    draggable: false,

    items: {
        xtype: 'form',
        items: [
            {
                xtype: 'textfield',
                name: 'email',
                fieldLabel: 'Ваша почта:',
                allowBlank: false,
                margin: "10 5 10 5",
                vtype: 'email',
                emptyText: 'example@mail.com',
            }
        ],
        buttons: [{
            text: 'Выслать письмо',
            formBind: true,
            handler: function () {
                Ext.Ajax.request({
                    url: 'API/Auth/RestorePassword',
                    method: 'POST',
                    jsonData: this.up('window').down('form').getForm().getValues(),
                    success: function() {
                        Ext.MessageBox.show({
                            title: 'Восстановление пароля',
                            msg: 'Заявка на изменение пароля направлена администратору',
                            buttons: Ext.MessageBox.OK,
                            fn: function (btn) {
                                window.location.reload();
                            }
                        });
                    }
                });
            }
        }]
    }
});