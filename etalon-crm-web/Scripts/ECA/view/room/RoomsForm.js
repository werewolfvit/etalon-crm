Ext.define('ECA.view.room.RoomsForm',
{
    extend: 'Ext.window.Window',
    alias: 'RoomsForm',
    requires: ['Ext.form.Panel', 'ECA.store.Rooms'],
    stores: ['ECA.store.Rooms'],
    id: 'roomForm',
    maximized: true,
    maximizable: true,
    title: 'Управление площадями',
    renderTo: Ext.getCmp('mainForm'),
    height: 760,
    width: 1280,
    resizable: true,
    layout: 'border',
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
    listeners: {
        afterrender: function () {

            var referenceToImage = this.down('image').el.dom;

            $(referenceToImage).Jcrop({
                onSelect: function (c) {
                    Ext.getCmp('roomForm').setRoomCoord(c);
                    console.log(c);
                }
            });
        }
    },
    items: [
    {
        region: 'center',
        xtype: 'grid',
        title: '',
        store: 'ECA.store.Rooms',
        layout: 'fit',
        columns: [
            //'IdRecord', 'FloorId', 'Number', 'Square', 'MeterPrice', 'X1', 'X2', 'Y1', 'Y2', 'RenterId'
            {
                text: 'Номер кабинета', dataIndex: 'Number', flex: 2, editor: {
                    // defaults to textfield if no xtype is supplied
                    allowBlank: false
                }
            },
            {
                text: 'Площадь', dataIndex: 'Square', flex: 2, editor: {
                    // defaults to textfield if no xtype is supplied
                    allowBlank: false
                }
            },
            {
                text: 'Стоимость, в рублях', dataIndex: 'MeterPrice', flex: 2, editor: {
                    // defaults to textfield if no xtype is supplied
                    allowBlank: false
                }
            },
            { text: '№ договора', dataIndex: 'DocNum', flex: 2, editor: { xtype: 'textfield' }},
            { text: 'Дата договора ', dataIndex: 'DocDate', flex: 2, editor: { xtype: 'datefield' }, renderer: Ext.util.Format.dateRenderer('d.m.Y') },
            { text: 'Строение', dataIndex: 'Building', flex: 2, editor: { xtype: 'textfield' }},
            { text: '№ комнаты (БТИ)', dataIndex: 'BTINums', flex: 3, editor: { xtype: 'textfield' }},
            { text: 'Срок договора, по', dataIndex: 'DocExpDate', flex: 3, editor: { xtype: 'datefield' }, renderer: Ext.util.Format.dateRenderer('d.m.Y') },
            { text: 'Размер а/п в месяц, в рублях', dataIndex: 'RentPayment', flex: 4, editor: { xtype: 'textfield' }}
        ],
        selType: 'rowmodel',
        plugins: [
            Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2
            })
        ],
        tbar: [{
                scale: 'medium', text: 'Создать', handler: function() {
                    var rent = Ext.create('ECA.model.Room');
                    rent.set('IdRecord', -1);
                    rent.set('Number', 0);
                    //rent.set('FloorId', 1);
                    rent.set('Square', 0);
                    rent.set('MeterPrice', 0);
                    rent.set('X1', 0);
                    rent.set('X2', 0);
                    rent.set('Y1', 0);
                    rent.set('Y2', 0);
                    rent.set('DocNum', '');
                    rent.set('DocDate', new Date('1980-01-01'));
                    rent.set('Building', '');
                    rent.set('BTINums', '');
                    rent.set('DocExpDate', new Date('1980-01-01'));
                    rent.set('RentPayment', 0);
                    
                    this.up('grid').store.add(rent);
                    this.up('grid').store.sync();
                    }
                },{
                    scale: 'medium', text: 'Удалить', handler: function () {
                        var grid = this.up('grid');
                        var model = grid.getSelectionModel().getSelection()[0];
                        grid.store.remove(model);
                        grid.store.sync();
                    }
                },
                '->',
                {
                    scale: 'medium', text: 'Сохранить изменения', handler: function() {
                        this.up('grid').store.sync();
                }
            }],
    }, {
        region: 'south',
        xtype: 'tabpanel',
        layout: 'fit',
        title: '',
        height: 455,
        items: [
            {
                xtype: 'panel',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                title: 'План здания',
                items: [
                    {
                        xtype: 'image',
                        src: '/Content/Images/Floor-1.png'
                    }
                ]
            }
        ]
    }
]


});