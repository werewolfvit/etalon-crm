Ext.define('ECA.view.rent.RentsForm',
{
    extend: 'Ext.window.Window',
    alias: 'RentsForm',
    requires: ['Ext.form.Panel', 'ECA.store.Rents'],
    stores: ['ECA.store.Rents'],
    id: 'rentForm',
    //maximized: true,
    maximizable: true,
    title: 'Управление площадями',
    renderTo: Ext.getCmp('mainForm'),
    height: 600,
    width: 950,
    resizable: false,
    layout: 'border',
    setRoomCoord: function (coord) {
        debugger;
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
                    Ext.getCmp('rentForm').setRoomCoord(c);
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
        store: 'ECA.store.Rents',
        layout: 'fit',
        columns: [
            //'SquareId', 'Floor', 'Number', 'Square', 'Price', 'IsFree'
            {
                text: 'Номер кабинета', dataIndex: 'Number', flex: 1, editor: {
                    // defaults to textfield if no xtype is supplied
                    allowBlank: false
                }
            },
            {
                text: 'Этаж', dataIndex: 'Floor', flex: 1
            },
            {
                text: 'Площадь', dataIndex: 'Square', flex: 2, editor: {
                    // defaults to textfield if no xtype is supplied
                    allowBlank: false
                }
            },
            {
                text: 'Стоимость', dataIndex: 'Price', flex: 2, editor: {
                    // defaults to textfield if no xtype is supplied
                    allowBlank: false
                }
            },
            {
                xtype: 'checkcolumn', text: 'Свободно', dataIndex: 'IsFree', flex: 1
            }
        ],
        selType: 'rowmodel',
        plugins: [
            Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2
            })
        ],
        tbar: [{
                scale: 'medium', text: 'Создать', handler: function() {
                    var rent = Ext.create('ECA.model.Rent');
                    rent.set('Number', 0);
                    rent.set('Floor', 1);
                    rent.set('Square', 0);
                    rent.set('Price', 0);
                    rent.set('IsFree', true);
                    rent.set('X1', 0);
                    rent.set('X2', 0);
                    rent.set('Y1', 0);
                    rent.set('Y2', 0);
                    
                    this.up('grid').store.add(rent);
                    this.up('grid').store.sync();
                }
            }, {
                scale: 'medium', text: 'Сохранить', handler: function() {
                    this.up('grid').store.sync();
                }
            }, {
                scale: 'medium', text: 'Удалить', handler: function () {
                    var grid = this.up('grid');
                    var model = grid.getSelectionModel().getSelection()[0];
                    grid.store.remove(model);
                    grid.store.sync();
                }
            }],
    }, {
        region: 'south',
        xtype: 'tabpanel',
        layout: 'fit',
        title: '',
        items: [
            {
                title: 'План здания',
                items: [
                    {
                        xtype: 'image',
                        src: '/Content/Images/Floor_1.jpg'
                    }
                ]
            }
        ]
    }
]


});