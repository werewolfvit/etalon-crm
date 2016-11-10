Ext.define('ECA.store.Users', {
    extend: 'Ext.data.Store',
    alias: 'usersStore',
    model: 'ECA.model.User',
    autoLoad: false,
    autoSync: true,
    proxy: {
        type: 'ajax',
        limitParam: false,
        startParam: false,
        pageParam: false,
        api: {
            create: 'API/Users/Add',
            read: 'API/Users/List',
            update: 'API/Users/Update',
            destroy: 'API/Users/Delete'
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