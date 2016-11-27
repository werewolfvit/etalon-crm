Ext.define('ECA.store.Floors',
{
    extend: 'Ext.data.Store',
    alias: 'floorsStore',
    model: 'ECA.model.Floor',
    autoLoad: true,
    fields: ['IdRecord', 'Name', 'Url'],
    proxy: {
        type: 'ajax',
        url: 'Scripts/ECA/floors.json',
        reader: {
            type: 'json',
            rootProperty: 'floors'
        }
    }
});