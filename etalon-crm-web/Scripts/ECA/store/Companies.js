Ext.define('ECA.store.Companies', {
    extend: 'Ext.data.Store',
    //alias: 'companiesStore',
    model: 'ECA.model.Company',
    autoLoad: false,
    autoSync: true,
    proxy: {
        type: 'ajax',
        limitParam: false,
        startParam: false,
        pageParam: false,
        api: {
            create: 'API/Companies/Add',
            read: 'API/Companies/List',
            update: 'API/Companies/Update',
            destroy: 'API/Companies/Delete'
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