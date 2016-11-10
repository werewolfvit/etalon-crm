Ext.define('ECA.store.Rents', {
    extend: 'Ext.data.Store',
    alias: 'rentsStore',
    model: 'ECA.model.Rent',
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'ajax',
        limitParam: false,
        startParam: false,
        pageParam: false,
        api: {
            create: 'API/Rents/Add',
            read: 'API/Rents/List',
            update: 'API/Rents/Update',
            destroy: 'API/Rents/Delete'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true
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