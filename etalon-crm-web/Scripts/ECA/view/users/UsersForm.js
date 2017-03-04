Ext.require(["ECA.view.users.UserEdit"]);
Ext.define('ECA.view.users.UsersForm',
    {
        extend: 'Ext.window.Window',
        alias: 'UsersForm',
        maximized: true,
        requires: ['Ext.form.Panel', 'ECA.store.Users', 'ECA.view.users.UserEdit'],
        stores: ['ECA.store.Users'],
        title: 'Управление пользователями',
        //modal: true,
        //minimizable: true, //show the minimize button
        maximizable: true,
        renderTo: Ext.getCmp('mainForm'),
        height: 400,
        width: 700,
        //autoShow: true,
        layout: 'fit',
        items: [
            {
                xtype: 'grid',
                title: '',
                store: 'ECA.store.Users',
                layout: 'fit',


                columns: [
                   // { text: 'Логин', dataIndex: 'UserName', flex: 2 },
                    { text: 'Почта', dataIndex: 'Email', flex: 2 },
                    { text: 'Должность', dataIndex: 'Position', flex: 2 },
                    { xtype: 'checkcolumn', text: 'Активна', dataIndex: 'IsActive', flex: 1, enable: false }
                ],
                tbar: [{
                        scale: 'medium', text: 'Создать', handler: function() {
                            var wnd = Ext.create('ECA.view.users.UserEdit');

                            wnd.setInsertType();
                            wnd.setStore(this.up('grid').store);
                            wnd.show();
                        }
                    }, {
                        scale: 'medium', text: 'Редактировать', handler: function () {
                            var recArr = this.up('grid').getSelection();
                            if (recArr.length == 0)
                                return;

                            var wnd = Ext.create('ECA.view.users.UserEdit');
                            wnd.setStore(this.up('grid').store);

                            var frm = wnd.down('form');
                            
                            frm.loadRecord(recArr[0]);
                            wnd.initImage();
                            wnd.setStore(this.up('grid').store);
                            wnd.show();
                        }
                    }],
                listeners: {
                    itemdblclick: function (view, rec, node, index, e, options) {
                        
                        var wnd = Ext.create('ECA.view.users.UserEdit');
                        var frm = wnd.down('form');
                        wnd.setStore(this.store);
                        frm.loadRecord(rec);
                        wnd.initImage();
                        wnd.show();
                    },
                    render: function (grid) {
                        var store = grid.getStore();
                        store.load();
                    }
                }
            }
        ]
    });