Ext.define('ECA.model.Rent', {
    extend: 'Ext.data.Model',
    fields: ['SquareId', 'Floor', 'Number', 'Square', 'Price', 'IsFree', 'X1', 'Y1', 'X2', 'Y2'],
    idProperty: 'SquareId'
}); 