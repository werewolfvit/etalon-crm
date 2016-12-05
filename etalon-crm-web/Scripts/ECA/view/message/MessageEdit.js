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
                name: 'addressSelector',
                id: 'addressTagField',
                fieldLabel: 'Выберите получателей:',
                store: {
                    xtype: 'store',
                    fields: ['id', 'show'],
                    data: [{
                        id: 0,
                        show: 'Бухгалтерия'
                    }, {
                        id: 1,
                        show: 'Охрана'
                    }, {
                        id: 2,
                        show: 'Завхоз'
                    }, {
                        id: 3,
                        show: 'Директор'
                    }]
                },
                displayField: 'show',
                valueField: 'show',
                queryMode: 'local',
                filterPickList: true
            }, {
                flex: 1,
                xtype: 'textfield',
                labelWidth: 200,
                width: 850,
                fieldLabel: 'Заголовок письма:'
            }]
        }, {
            region: 'center',
            xtype: 'htmleditor',
            layout: 'fit'
        }, {
            region: 'south',
            xtype: 'form',
            title: '',
            buttons: [{
                xtype: 'button',
                scale: 'medium',
                text: 'Отправить',
                handler: function () {
                    Ext.Msg.show({
                        title: 'Сообщение',
                        msg: 'Успешно отправлено'
                    });
                    this.up("window").close();
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