Ext.define('ECA.view.companies.CompanyEdit',
{
    extend: 'Ext.window.Window',
    alias: 'CompanyEdit',
    id: 'companyEdit',
    maximizable: true,
    title: 'Компания',
    renderTo: Ext.getCmp('mainForm'),
    //height: 400,
    width: 520,
    modal: true,
    resizable: false,
    layout: 'fit',
    items: [
        {
            xtype: 'form',
            layout: 'vbox',
            items: [
                {
                    xtype: 'textfield',
                    name: 'Name',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'Краткое название:',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    name: 'FullName',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'Полное название:',
                }, {
                    xtype: 'textfield',
                    name: 'DocNum',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'Номер договора:'
                }, {
                    xtype: 'datefield',
                    name: 'DocDate',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'Дата договора:',
                    format: 'd.m.Y',
                    altFormats: 'm/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j|c',
                }, {
                    xtype: 'datefield',
                    name: 'DocExpDate',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'Срок договора, по:',
                    format: 'd.m.Y',
                    altFormats: 'm/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j|c',
                }, {
                    xtype: 'textfield',
                    name: 'Building',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'Строение:'
                }, {
                    xtype: 'textfield',
                    name: 'BTINums',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'Номер комнаты (БТИ):'
                },{
                    xtype: 'numberfield',
                    name: 'RentPayment',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'Размер АП в месяц, в руб:'
                }, {
                    xtype: 'numberfield',
                    name: 'MonthCount',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'Кол-во месяцев:'
                }, {
                    xtype: 'numberfield',
                    name: 'PayByDoc',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'По договору:'
                }, {
                    xtype: 'numberfield',
                    name: 'PayReceived',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'Перечислен:'
                }, {
                    xtype: 'numberfield',
                    name: 'ToPay',
                    labelWidth: 150,
                    width: 500,
                    fieldLabel: 'К оплате:'
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
                    handler: function() {
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