Ext.define('ECA.store.RoomPhotos', {
    extend: 'Ext.data.Store',
    model: 'ECA.model.RoomPhoto',
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'ajax',
        limitParam: false,
        startParam: false,
        pageParam: false,
        api: {
            //create: 'API/RoomPhotos/Add',
            read: 'API/RoomPhotos/List',
            //update: 'API/Rooms/Update',
            destroy: 'API/RoomPhotos/Delete'
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