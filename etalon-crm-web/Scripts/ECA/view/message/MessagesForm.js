Ext.define('ECA.view.message.MessagesForm', {
    extend: 'Ext.window.Window',
    alias: 'MessagesForm',
    maximized: false,
    //requires: ['Ext.form.Panel', 'ECA.view.users.UserEdit'],
    //stores: ['ECA.store.Users'],
    title: 'Сообщения',
    //modal: true,
    //minimizable: true, //show the minimize button
    maximizable: true,
    renderTo: Ext.getCmp('mainForm'),
    height: 500,
    width: 1024,
    //autoShow: true,
    layout: 'fit',
    items: [{
        xtype: 'panel',
        layout: 'border',
        tbar: [{
            text: 'Новое сообщение',

            handler: function () {
                var wnd = Ext.create('MessageEdit');
                wnd.center();
                wnd.show();
            }
        }, {
            text: 'Обновить',
            handler: function() {
                Ext.getCmp('incomeGrid').store.load();
                Ext.getCmp('outcomeGrid').store.load();
            }
        }],
        items: [{
            region: 'center',
            xtype: 'tabpanel',
            tabPosition: 'left',
            height: 360,
            width: 300,
            defaults: {
                bodyPadding: 10
            },
            items: [{
                title: 'Входящие сообщения',
                
                items: [{
                    xtype: 'grid',
                    id: 'incomeGrid',
                    columns: [{
                        text: 'Тема',
                        dataIndex: 'Subject',
                        flex: 3
                    }, {
                        text: 'От',
                        dataIndex: 'TextFrom',
                        flex: 3
                    }, {
                        text: 'Дата',
                        dataIndex: 'DateCreate',
                        flex: 2,
                        renderer: function (value) {
                            var dt = Ext.Date.parse(value, "c");
                            return Ext.Date.format(dt, 'd.m.Y H:i');
                        }
                    }, {
                        xtype: 'checkcolumn',
                        text: 'Прочитано',
                        dataIndex: 'IsReaded',
                        readonly: true,
                        flex: 1,
                        listeners: {
                            beforecheckchange: function () {
                                return false; // HERE
                            }
                        }
                    }],
                    store: {
                        xtype: 'store',
                        model: 'ECA.model.UserMessage',
                        autoLoad: true,
                        sorters: [{ property: 'DateCreate', direction: 'DESC' }],
                        proxy: {
                            type: 'ajax',
                            url: '/API/Messages/GetIncomeMessagesList',
                            reader: {
                                type: 'json',
                                rootProperty: 'data'
                            }
                        }
                    },
                    listeners: {
                        itemdblclick: function (view, rec, node, index, e, options) {

                            var wnd = Ext.create('ECA.view.message.MessageRead');
                            var frm = wnd.down('form');
                            frm.loadRecord(rec);
                            rec.set('IsReaded', true);
                            var idRecord = rec.get('IdRecord');
                            Ext.Ajax.request({
                                url: 'API/Messages/SetReaded?messageId=' + idRecord,
                                method: 'POST',
                                success: function() {
                                    
                                },
                                failure: function() {
                                    //Ext.Msg.alert('Сервер недоступен', 'Сервер не отвечает, обратитесь к администратору.', Ext.emptyFn);
                                }
                            });
                            wnd.show();
                        }
                    }
                }]
            }, {
                title: 'Исходящие сообщения',
                items: [{
                    xtype: 'grid',
                    id: 'outcomeGrid',
                    columns: [
                    {
                        text: 'Тема',
                        dataIndex: 'Subject',
                        flex: 1
                    }, {
                        text: 'Адресат',
                        dataIndex: 'TextTo',
                        flex: 1
                    }, {
                        text: 'Дата',
                        dataIndex: 'DateCreate',
                        flex: 1,
                        renderer: function (value) {
                            var dt = Ext.Date.parse(value, "c");
                            return Ext.Date.format(dt, 'd.m.Y H:i');
                        }
                    }],
                    store: {
                        xtype: 'store',
                        model: 'ECA.model.UserMessage',
                        autoLoad: true,
                        sorters: [{ property: 'DateCreate', direction: 'DESC' }],
                        proxy: {
                            type: 'ajax',
                            url: '/API/Messages/GetOutcomeMessagesList',
                            reader: {
                                type: 'json',
                                rootProperty: 'data'
                            }
                        }
                    },
                    listeners: {
                        itemdblclick: function (view, rec, node, index, e, options) {

                            var wnd = Ext.create('ECA.view.message.MessageRead');
                            var frm = wnd.down('form');
                            frm.loadRecord(rec);
                            wnd.show();
                        }
                    }
                }]
            }]
        }]
    }]
});