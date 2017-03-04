Ext.define('ECA.model.User', {
    extend: 'Ext.data.Model',
    fields: ['UserName', 'UserId', 'IsActive', 'Description', 'Email',
                    'Name', 'Surname', 'Middlename', 'Phone', 'Position', 'TimeLimit', 'CompanyId'],
    idProperty: 'UserId'
}); 