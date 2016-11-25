Ext.define('ECA.store.Rooms', {
    extend: 'Ext.data.Store',
    alias: 'roomsStore',
    model: 'ECA.model.Room',
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'ajax',
        limitParam: false,
        startParam: false,
        pageParam: false,
        api: {
            create: 'API/Rooms/Add',
            read: 'API/Rooms/List',
            update: 'API/Rooms/Update',
            destroy: 'API/Rooms/Delete'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            writeRecordId: true
        }
    },
    constructor: function (config) {
        this.callParent([config]);
        this.proxy.on('exception', this.onProxyException, this);
    },
    onProxyException: function (proxy, response, operation, eOpts) {
        this.rejectChanges();
    }
});