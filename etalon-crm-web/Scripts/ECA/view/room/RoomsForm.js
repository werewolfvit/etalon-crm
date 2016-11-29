Ext.define('ECA.view.room.RoomsForm', {
    extend: 'Ext.window.Window',
    alias: 'RoomsForm',
    requires: ['Ext.form.Panel', 'ECA.store.Rooms', 'ECA.store.Companies'],
    stores: ['ECA.store.Rooms', 'ECA.store.Companies'],
    id: 'roomForm',
    maximized: true,
    maximizable: true,
    title: 'Управление площадями',
    renderTo: Ext.getCmp('mainForm'),
    height: 760,
    width: 1280,
    resizable: true,
    layout: 'border',
    jcrop: null,
    setRoomCoord: function (coord) {
        var grid = this.down('grid');
        var model = grid.getSelectionModel().getSelection()[0];
        if (model == null)
            return;

        model.set('X1', coord.x);
        model.set('X2', coord.x2);
        model.set('Y1', coord.y);
        model.set('Y2', coord.y2);
        grid.store.sync();
    },
    items: [{
        region: 'center',
        xtype: 'grid',
        title: '',
        store: 'ECA.store.Rooms',
        layout: 'fit',
        columns: [{
            text: 'Номер кабинета',
            dataIndex: 'Number',
            flex: 2,
            editor: {
                allowBlank: false
            }
        }, {
            text: 'Этаж',
            dataIndex: 'FloorId',
            flex: 1
        }, {
            text: 'Площадь',
            dataIndex: 'Square',
            flex: 1,
            editor: {
                allowBlank: false
            }
        }, {
            text: 'Стоимость, в руб.',
            dataIndex: 'MeterPrice',
            flex: 2,
            editor: {
                allowBlank: false
            }
        }, {
            text: 'Организация',
            dataIndex: 'CompanyId',
            flex: 2,
            editor: new Ext.form.ComboBox({
                displayField: 'Name',
                editable: true,
                forceSelection: true,
                mode: 'local',
                store: getCompaniesStore(),
                triggerAction: 'all',
                valueField: 'IdRecord'
            }),
            renderer: function (value) {
                var str = getCompaniesStore();
                var rec = str.findRecord('IdRecord', value);

                if (rec === null) {
                    return '<span style="background-color: RGB(160, 255, 160);"><i>Свободно</i></span>';
                }
                return rec.get('Name');
            }
        }, {
            text: '№ договора',
            dataIndex: 'DocNum',
            flex: 2,
            editor: {
                xtype: 'textfield'
            }
        }, {
            text: 'Дата договора ',
            dataIndex: 'DocDate',
            flex: 2,
            editor: {
                xtype: 'datefield'
            },
            renderer: Ext.util.Format.dateRenderer('d.m.Y')
        }, {
            text: 'Строение',
            dataIndex: 'Building',
            flex: 1,
            editor: {
                xtype: 'textfield'
            }
        }, {
            text: '№ комнаты (БТИ)',
            dataIndex: 'BTINums',
            flex: 2,
            editor: {
                xtype: 'textfield'
            }
        }, {
            text: 'Срок договора, по',
            dataIndex: 'DocExpDate',
            flex: 2,
            editor: {
                xtype: 'datefield'
            },
            renderer: Ext.util.Format.dateRenderer('d.m.Y')
        }, {
            text: 'Размер а/п в месяц, в руб.',
            dataIndex: 'RentPayment',
            flex: 3,
            editor: {
                xtype: 'textfield'
            }
        }],
        listeners: {
            select: function (obj, record, eOpts) {
                var wnd = this.up('window');
                var photofloor = Ext.getCmp('floorimage');
                var floorId = record.get('FloorId');
                var store = this.up('window').down('combobox').store;
                var combo = this.up('window').down('combobox');

                var photoStore = Ext.getCmp('photoGrid').store;
                var recId = record.get('IdRecord');
                console.log('need = ' + recId);

                photoStore.clearFilter();
                photoStore.filterBy(function(rec) {
                    return (rec.get('RoomId') === recId);
                });

                var curRecord = store.getAt(store.findExact('IdRecord', floorId));
                if (curRecord == null) {
                    wnd.jcrop.disable();
                    wnd.jcrop.destroy();
                    photofloor.setConfig('src', "");
                    return;
                }

                combo.setValue(curRecord.get('Name'));
                photofloor.setConfig('src', curRecord.get('Url'));
                wnd.jcrop = $.Jcrop(photofloor.el.dom);
                var X1 = record.get('X1');
                var Y1 = record.get('Y1');
                var X2 = record.get('X2');
                var Y2 = record.get('Y2');

                if ((X1 !== null || X2 !== null || Y1 !== null || Y2 !== null) &&
                    (X1 !== 0 || X2 !== 0 || Y1 !== 0 || Y2 !== 0)) {
                    var coords = [X1, Y1, X2, Y2];
                    wnd.jcrop.setSelect(coords);
                }
            }
        },
        selType: 'rowmodel',
        plugins: [
            Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2
            })
        ],
        tbar: [{
            scale: 'medium',
            text: 'Создать',
            handler: function () {
                var rent = Ext.create('ECA.model.Room');
                rent.set('IdRecord', -1);
                rent.set('Number', 0);
                rent.set('FloorId', 1);
                rent.set('Square', 0);
                rent.set('MeterPrice', 0);
                rent.set('X1', 0);
                rent.set('X2', 0);
                rent.set('Y1', 0);
                rent.set('Y2', 0);
                rent.set('DocNum', '');
                rent.set('DocDate', new Date('2016-01-01'));
                rent.set('Building', '');
                rent.set('BTINums', '');
                rent.set('DocExpDate', new Date('2016-01-01'));
                rent.set('RentPayment', 0);

                this.up('grid').store.add(rent);
                this.up('grid').store.sync();
            }
        }, {
            scale: 'medium',
            text: 'Удалить',
            handler: function () {
                var grid = this.up('grid');
                var model = grid.getSelectionModel().getSelection()[0];
                grid.store.remove(model);
                grid.store.sync();
            }
        },
            '->', {
                scale: 'medium',
                text: 'Сохранить изменения',
                handler: function () {
                    var wnd = this.up('window');

                    var grid = this.up('grid');
                    var record = grid.getSelectionModel().getSelection()[0];
                    var coords = wnd.jcrop.tellScaled();
                    record.set('X1', coords.x);
                    record.set('Y1', coords.y);
                    record.set('X2', coords.x2);
                    record.set('Y2', coords.y2);

                    var combo = wnd.down('combobox');
                    var value = combo.getValue();
                    var floorRec = combo.findRecord(combo.valueField || combo.displayField, value);
                    record.set('FloorId', floorRec.get('IdRecord'));


                    this.up('grid').store.sync();
                }
            }
        ],
    }, {
        region: 'south',
        xtype: 'tabpanel',
        layout: 'fit',
        title: '',
        height: 350,
        items: [{
            xtype: 'panel',
            tbar: [{
                xtype: 'combobox',
                publishes: 'value',
                fieldLabel: 'Выбор этажа',
                displayField: 'Name',
                anchor: '-15',
                store: 'ECA.store.Floors',
                minChars: 0,
                queryMode: 'local',
                typeAhead: true,
                listeners: {
                    select: function (combo, record, eOpts) {
                        var photofloor = Ext.getCmp('floorimage');
                        var wnd = this.up('window');

                        wnd.jcrop.disable();
                        wnd.jcrop.destroy();
                        photofloor.setConfig('src', record.get('Url'));

                        var referenceToImage = this.up('window').down('image').el.dom;
                        this.up('window').jcrop = $.Jcrop(referenceToImage);
                    }
                }
            }],
            id: 'floorSchemaPanel',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            title: 'План здания',
            items: [{
                xtype: 'image',
                id: 'floorimage',
                alt: 'План этажа',
                height: 275,
                width: 1172,
                shrinkWrap: true
            }]
        }, {
            xtype: 'panel',
            title: 'Фотографии',
            layout: 'fit',
            tbar: [{
                xtype: 'form',
                items: [{
                    xtype: 'filefield',
                    title: 'Выбрать файл'
                }]
            }, {
                text: 'Добавить фото',
                handler: function () {
                    var frm = this.up('window').down('form').getForm();
                    var roomGrid = this.up('window').down('grid');
                    var model = roomGrid.getSelectionModel().getSelection()[0];
                    if (model === null || model === undefined) {
                        Ext.Msg.alert('Загрузка файла', 'Неудалось загрузить, убедитесь что выбрано помещение для загрузки фотографии!');
                        return;
                    }
                    var roomId = model.get('IdRecord');

                    frm.submit({
                        url: 'API/Files/AddRoomPhoto?roomId=' + roomId,
                        waitMsg: 'Загрузка...',
                        success: function (fp, o) {
                            Ext.getCmp('photoGrid').store.load();
                            Ext.Msg.alert('Загрузка файла', 'Файл загружен!');
                        }
                    });
                }
            }, {
                text: 'Удалить фото',
                handler: function () {
                    var grid = Ext.getCmp('photoGrid');
                    var record = grid.getSelectionModel().getSelection()[0];
                    record.drop();
                    grid.store.sync();
                }
            }],
            items: [{
                xtype: 'grid',
                id: 'photoGrid',
                store: 'ECA.store.RoomPhotos',
                columns: [{
                    text: 'Фотография',
                    dataIndex: 'Url',
                    flex: 1,
                    renderer: function (value) {
                        return '<div align="center"><img style="height: 100%; max-height: 200px;" src="' + value + '"></div>';
                    }
                }]
            }]
        }]
    }]
});