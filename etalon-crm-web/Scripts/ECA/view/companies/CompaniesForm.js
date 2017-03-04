Ext.require(["ECA.store.Companies"]);
Ext.define('ECA.view.companies.CompaniesForm',
{
    extend: 'Ext.window.Window',
    alias: 'CompaniesForm',
    id: 'companiesForm',
    maximized: false,
    requires: ['Ext.form.Panel', 'ECA.store.Companies'],
    stores: ['ECA.store.Companies'],
    title: 'Редактирование компаний',
    maximizable: true,
    renderTo: Ext.getCmp('mainForm'),
    height: 400,
    width: 700,
    layout: 'fit',
    items: [{
            xtype: 'grid',
            title: '',
            store: 'ECA.store.Companies',
            layout: 'fit',

            columns: [
                { text: 'Наименование компании', dataIndex: 'Name', flex: 1 },
                
            ],
            tbar: [{
                scale: 'medium', text: 'Создать', handler: function () {
                    var compEdit = Ext.create('ECA.view.companies.CompanyEdit');
                    compEdit.showModalDialog(null, function (modalResult, data) {
                        if (modalResult) {
                            var newComp = Ext.create('ECA.model.Company');
                            newComp.set(data);
                            var store = Ext.getCmp('companiesForm').down('grid').store;
                            store.add(newComp);
                        }
                    });
                }
                }, {
                    scale: 'medium', text: 'Редактировать', handler: function () {
                        var currModel = Ext.getCmp('companiesForm').down('grid').getSelectionModel().getSelection()[0];
                        if (currModel !== null) {
                            var compEdit = Ext.create('ECA.view.companies.CompanyEdit');
                            compEdit.showModalDialog(currModel, function (modalResult, data) {
                                if (modalResult) {
                                    currModel.set(data);
                                    //currModel.update();
                                    //compEdit.down('form').updateRecord();
                                }
                            });
                        }
                        

                        //Ext.MessageBox.prompt('Наименование', 'Введите название компании:', function (btn, text) {
                        //    if (btn === 'ok' && text !== Ext.emptyString) {
                        //        var currModel = Ext.getCmp('companiesForm').down('grid').getSelectionModel().getSelection()[0];
                        //        currModel.set('Name', text);
                        //        currModel.update();
                        //    }
                        //});
                    }
                }, {
                    scale: 'medium', text: 'Удалить', handler: function () {
                        Ext.MessageBox.show({
                            title: 'Удаление компании',
                            msg: 'Вы уверены, что хотите удалить эту компанию? Все связанные с ней данные могут быть удалены.',
                            buttons: Ext.Msg.OKCANCEL,
                            fn: function (btn) {
                                if (btn === 'ok') {
                                    var currModel = Ext.getCmp('companiesForm').down('grid').getSelectionModel().getSelection()[0];
                                    currModel.drop();
                                }
                            }
                        });
                    }
            }],
            listeners: {
                itemdblclick: function (view, rec, node, index, e, options) {
                        
                    //var wnd = Ext.create('ECA.view.users.UserEdit');
                    //var frm = wnd.down('form');
                    //wnd.setStore(this.store);
                    //frm.loadRecord(rec);
                    //wnd.initImage();
                    //wnd.show();
                },
                render: function (grid) {
                    var store = grid.getStore();
                    store.load();
                }
            }
        }
    ]
});