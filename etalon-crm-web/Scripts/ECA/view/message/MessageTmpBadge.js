Ext.define('ECA.view.message.MessageTmpBadge', {
    extend: 'Ext.window.Window',
    id: 'messageTmpBadge',
    maximizable: true,
    title: 'Шаблон - пропуск',
    renderTo: Ext.getCmp('mainForm'),
    height: 600,
    width: 950,
    resizable: false,
    layout: {
        type: 'vbox',
        align: 'stretch'  // Child items are stretched to full width
    },
    items: [
        {
            xtype: 'panel',
            layout: 'hbox',
            items: [
                {
                    xtype: 'datefield',
                    id: 'periodStart',
                    value: new Date(),
                    labelWidth: 110,
                    fieldLabel: 'Период, начало',
                    format: 'd.m.Y',
                    altFormats: 'm/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j|c',
                    margin: '5 10 5 5'
                },
                {
                    xtype: 'datefield',
                    id: 'periodEnd',
                    value: new Date(),  
                    labelWidth: 125,
                    fieldLabel: 'Период, конец',
                    format: 'd.m.Y',
                    altFormats: 'm/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j|c',
                    margin: '5 10 5 5'
                }
            ]
        },
        {
            xtype: 'panel',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    id: 'textSurname',
                    fieldLabel: 'Фамилия',
                    labelWidth: 60,
                    margin: '5 10 5 0'
                }, {
                    xtype: 'textfield',
                    id: 'textName',
                    fieldLabel: 'Имя',
                    labelWidth: 30,
                    margin: '5 10 5 0'
                }, {
                    xtype: 'textfield',
                    id: 'textMiddlename',
                    fieldLabel: 'Отчество',
                    labelWidth: 65,
                    margin: '5 10 5 0'
                }
            ],
            height: 40
        }, {
            xtype: 'grid',
            id: 'fioGrid',
            tbar: [
                {
                    xtype: 'button',
                    scale: 'medium',
                    text: 'Добавить',
                    handler: function() {
                        var surname = Ext.getCmp('textSurname');
                        var name = Ext.getCmp('textName');
                        var middlename = Ext.getCmp('textMiddlename');
                        var rec = Ext.create('ECA.model.TmpBadgeFio');
                        rec.set('Surname', surname.value);
                        rec.set('Name', name.value);
                        rec.set('MiddleName', middlename.value);
                        this.up('grid').store.add(rec);

                        surname.setValue("");
                        name.setValue("");
                        middlename.setValue("");
                    }
                }, {
                    xtype: 'button',
                    scale: 'medium',
                    text: 'Удалить',
                    handler: function() {
                        var grid = this.up('grid');
                        var rec = grid.getSelectionModel().getSelection()[0];
                        grid.store.remove(rec);
                    }
                }
            ],
            columns: [
                {
                    text: 'Фамилия',
                    dataIndex: 'Surname',
                    flex: 1
                }, {
                    text: 'Имя',
                    dataIndex: 'Name',
                    flex: 1
                }, {
                    text: 'Отчество',
                    dataIndex: 'MiddleName',
                    flex: 1
                }
            ],
            store: {
                xtype: 'store',
                model: 'ECA.model.TmpBadgeFio'
            },
            flex: 3
        },
        {
            xtype: 'panel',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Марка',
                    id: 'textMark',
                    labelWidth: 45,
                    margin: '5 10 5 0'
                }, {
                    xtype: 'textfield',
                    id: 'textModel',
                    fieldLabel: 'Модель',
                    labelWidth: 50,
                    margin: '5 10 5 0'
                }, {
                    xtype: 'textfield',
                    id: 'textNumber',
                    fieldLabel: 'Гос. номер',
                    labelWidth: 75,
                    margin: '5 10 5 0'
                }
            ],
            height: 40
        }, {
            xtype: 'grid',
            id: 'autoGrid',
            tbar: [
                {
                    xtype: 'button',
                    scale: 'medium',
                    text: 'Добавить',
                    handler: function() {
                        var mark = Ext.getCmp('textMark');
                        var model = Ext.getCmp('textModel');
                        var number = Ext.getCmp('textNumber');
                        var rec = Ext.create('ECA.model.TmpBadgeFio');
                        rec.set('Mark', mark.value);
                        rec.set('Model', model.value);
                        rec.set('Number', number.value);
                        this.up('grid').store.add(rec);

                        mark.setValue("");
                        model.setValue("");
                        number.setValue("");
                    }
                }, {
                    xtype: 'button',
                    scale: 'medium',
                    text: 'Удалить',
                    handler: function () {
                        var grid = this.up('grid');
                        var rec = grid.getSelectionModel().getSelection()[0];
                        grid.store.remove(rec);
                    }
                }
            ],
            columns: [
                {
                    text: 'Марка',
                    dataIndex: 'Mark',
                    flex: 1
                }, {
                    text: 'Модель',
                    dataIndex: 'Model',
                    flex: 1
                }, {
                    text: 'Номер',
                    dataIndex: 'Number',
                    flex: 1
                }
            ],
            store: {
                xtype: 'store',
                model: 'ECA.model.TmpBadgeAuto'
            },
            flex: 3
        }, {
            xtype: 'textarea',
            id: 'comment',
            fieldLabel: 'Общий комментарий',
            flex: 2
        }, {
            xtype: 'panel',
            height: 45,
            buttons: [
                {
                    text: 'Oк',
                    scale: 'medium',
                    handler: function() {
                        var newWnd = Ext.create('ECA.view.message.MessageEdit');

                        var tagField = newWnd.down('tagfield');
                        //var store = tagField.store;
                        //var xxx;
                        //store.each(function (record) {
                        //    console.log(1);
                        //    console.log(record.get('Name'));
                        //    xxx = record.get('Name');
                        //});
                        tagField.setValue(['B999C3EB-CB74-4AE8-B01F-0F6C121385A9']); // Ohrana hardcode

                        var fioStore = Ext.getCmp('fioGrid').store;
                        if (fioStore.getCount() === 0)
                            return;

                        var html = '';
                        html += '<h3>Прошу выдать пропуск за период с ' 
                            + Ext.Date.format(Ext.getCmp('periodStart').value, "d.m.Y") + ' по '
                            + Ext.Date.format(Ext.getCmp('periodEnd').value, "d.m.Y") + '</h3>';
                        html += '<p>Список лиц:</p>';
                        html += '<ol>';
                        fioStore.each(function(record) {
                            html += '<li>'
                                + record.get('Surname') + ' '
                                + record.get('Name') + ' '
                                + record.get('MiddleName')
                                + '</li>';
                        });
                        html += '</ol></ br></ br>';

                        var autoStore = Ext.getCmp('autoGrid').store;
                        if (autoStore.getCount() > 0) {
                            html += '<p>Список авто (марка, модель, гос. номер):</p>';
                            html += '<ol>';
                            autoStore.each(function (record) {
                                html += '<li>'
                                    + record.get('Mark') + ' '
                                    + record.get('Model') + ' '
                                    + record.get('Number')
                                    + '</li>';
                            });
                            html += '</ol></ br></ br>';
                        }

                        if (Ext.getCmp('comment').value != "")
                            html += "Комментарий: " + Ext.getCmp('comment').value;
                        
                        var htmlField = newWnd.down('htmleditor');
                        htmlField.setValue(html);

                        var xx = newWnd.down('form').getForm().findField("Subject");
                        xx.setValue('Заявление на выдачу пропуска');

                        newWnd.show();
                        this.up('window').close();
                    }
                }, {
                    text: 'Отмена',
                    scale: 'medium',
                    handler: function() {
                        this.up('window').close();
                    }
                }
            ]
        }
    ]
        
});