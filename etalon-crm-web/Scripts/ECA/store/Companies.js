Ext.define('ECA.store.Companies', {
    extend: 'Ext.data.Store',
    alias: 'companiesStore1',
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
    //data: [
    //{label: 'Great', value: 5},
    //{label: 'Above Average', value: 4},
    //{label: 'Average', value: 3},
    //{label: 'Below Average', value: 2},
    //{label: 'Poor', value: 1},
    //],
    constructor: function (config) {
        this.callParent([config]);
        this.proxy.on('exception', this.onProxyException, this);
    },
    onProxyException: function (proxy, response, operation, eOpts) {
        this.rejectChanges();
    }
});