Ext.define('ECA.view.room.RoomEdit',
{
    extend: 'Ext.window.Window',
    alias: 'RoomEdit',
    id: 'roomEdit',
    maximizable: true,
    title: 'Характеристики помещения',
    renderTo: Ext.getCmp('mainForm'),
    height: 250,
    width: 520,
    modal: true,
    resizable: false,
    layout: 'fit',
    items: [{
            xtype: 'form',
            layout: 'vbox',
            items: [
                {
                    xtype: 'textfield',
                    name: 'Number',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'Номер офиса:',
                }, {
                    xtype: 'numberfield',
                    name: 'Square',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'Площадь, кв. м.:',
                }, {
                    xtype: 'numberfield',
                    name: 'MeterPrice',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'Цена за метр:'
                }, {
                    xtype: 'combobox',
                    name: 'CompanyId',
                    displayField: 'Name',
                    editable: true,
                    forceSelection: true,
                    mode: 'local',
                    store: getCompaniesStore(),
                    triggerAction: 'all',
                    valueField: 'IdRecord',
                    fieldLabel: 'Арендующая компания:',
                    allowBlank: false,
                    labelWidth: 150,
                    width: 500,
                }
            ],
            buttons: [
                {
                    text: 'Сохранить',
                    handler: function () {
                        var wnd = this.up('window');
                        var frm = wnd.down('form');
                        if (frm.isValid()) {
                            wnd.callBackFunction(true, frm.getForm().getValues());
                            wnd.close();
                        }
                    },
                    scale: 'medium'
                }, {
                    text: 'Отмена',
                    handler: function () {
                        var wnd = this.up('window');
                        wnd.callBackFunction(false, null);
                        wnd.close();
                    },
                    scale: 'medium'
                }
            ]
        }
    ],
    callBackFunction: null,
    showModalDialog: function (model, cbFunc) {
        if (model !== null)
            this.down('form').loadRecord(model);
        this.show();
        this.callBackFunction = cbFunc;
    }
});