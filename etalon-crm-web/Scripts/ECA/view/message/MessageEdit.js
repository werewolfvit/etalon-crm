Ext.define('ECA.view.message.MessageEdit', {
    extend: 'Ext.window.Window',
    alias: 'MessageEdit',
    //requires: ['Ext.form.Panel', 'ECA.store.Rents'],
    //stores: ['ECA.store.Rents'],
    id: 'messageEdit',
    maximizable: true,
    title: 'Сообщение',
    renderTo: Ext.getCmp('mainForm'),
    height: 600,
    width: 950,
    resizable: false,
    layout: 'fit',
    items: [{
        xtype: 'form',
        layout: 'border',
        items: [{
            region: 'north',
            xtype: 'panel',
            layout: 'vbox',
            items: [{
                flex: 1,
                layout: 'fit',
                xtype: 'tagfield',
                labelWidth: 200,
                width: 850,
                name: 'Recepients',
                id: 'addressTagField',
                fieldLabel: 'Выберите получателей:',
                store: {
                    xtype: 'store',
                    model: 'ECA.model.Recepient',
                    autoLoad: true,
                    proxy: {
                        type: 'ajax',
                        url: '/API/Messages/GetRecepientList',
                        reader: {
                            type: 'json',
                            rootProperty: 'data'
                        }
                    }
                },
                displayField: 'Recepient',
                valueField: 'IdRecord',
                queryMode: 'local',
                filterPickList: true
            }, {
                flex: 1,
                xtype: 'textfield',
                name: 'Subject',
                labelWidth: 200,
                width: 850,
                fieldLabel: 'Заголовок письма:'
            }]
        }, {
            region: 'center',
            xtype: 'htmleditor',
            name: 'Text',
            layout: 'fit'
        }, {
            region: 'south',
            xtype: 'panel',
            title: '',
            buttons: [{
                xtype: 'button',
                scale: 'medium',
                text: 'Отправить',
                handler: function () {
                    var form = this.up('form').getForm();
                    Ext.Ajax.request({
                        url: "API/Messages/SendMessage",
                        method: "POST",
                        jsonData: form.getValues(),
                        success: function (response, opts) {
                            var obj = Ext.decode(response.responseText);
                            if (!obj.success) {
                                Ext.Msg.alert('Отправка', '<b>Сообщение не удалось отправить</b>', Ext.emptyFn);
                            } else {
                                Ext.Msg.alert('Отправка', '<b>Сообщение отправлено</b>', Ext.emptyFn);
                                var wnd = btn.up('window');
                                wnd.close();

                                Ext.create("MainMenuForm");
                            }
                        },
                        failure: function () {
                            Ext.Msg.alert('Сервер недоступен', 'Сервер не отвечает, обратитесь к администратору.', Ext.emptyFn);
                        }
                    });
                }
            }, {
                xtype: 'button',
                scale: 'medium',
                text: 'Отменить',
                handler: function () {
                    this.up("window").close();
                }
            }]
        }]
    }]
});