Ext.define('ECA.view.message.MessageRead', {
    extend: 'Ext.window.Window',
    alias: 'MessageRead',
    //requires: ['Ext.form.Panel', 'ECA.store.Rents'],
    //stores: ['ECA.store.Rents'],
    maximizable: true,
    title: 'Сообщение',
    renderTo: Ext.getCmp('mainForm'),
    height: 600,
    width: 950,
    resizable: false,
    layout: 'fit',
    tbar: [
        {
            text: 'Ответить',
            handler: function() {
                var frm = this.up('window').down('form');

                var values = frm.getForm().getValues();
                var sendToUserId = values.UserIdFrom;
                var htmlCode = values.Text;
                var oldSubjectValue = values.Subject;

                if (sendToUserId === '')
                    return;
                else
                {
                    var newWnd = Ext.create('ECA.view.message.MessageEdit');
                    var tagField = newWnd.down('tagfield');
                    tagField.setValue([sendToUserId]);

                    var htmlField = newWnd.down('htmleditor');
                    htmlField.setValue('<br />------------------<br /><br />' + htmlCode);

                    var xx = newWnd.down('form').getForm().findField("Subject");
                    xx.setValue('Re: ' + oldSubjectValue);

                    newWnd.show();
                    this.up('window').close();
                }

            }
        }
    ],
    items: [{
        xtype: 'form',
        layout: 'border',
        items: [{
            region: 'north',
            xtype: 'panel',
            layout: 'vbox',
            items: [{
                xtype: 'hiddenfield',    
                name: 'UserIdFrom'
            },{
                flex: 1,
                layout: 'fit',
                xtype: 'textfield',
                labelWidth: 200,
                width: 850,
                name: 'TextFrom',
                fieldLabel: 'От:',
                readOnly: true
            },{
                flex: 1,
                layout: 'fit',
                xtype: 'textfield',
                labelWidth: 200,
                width: 850,
                name: 'TextTo',
                fieldLabel: 'Кому:',
                readOnly: true
            }, {
                flex: 1,
                xtype: 'textfield',
                name: 'Subject',
                labelWidth: 200,
                width: 850,
                fieldLabel: 'Заголовок:',
                readOnly: true
            }, {
                flex: 1,
                xtype: 'datefield',
                format: 'd.m.Y H:i',
                altFormats: 'm/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j|c',
                name: 'DateCreate',
                labelWidth: 200,
                width: 850,
                fieldLabel: 'Дата:',
                readOnly: true
            }]
        }, {
            region: 'center',
            xtype: 'htmleditor',
            name: 'Text',
            layout: 'fit',
            readOnly: true
        }, {
            region: 'south',
            xtype: 'panel',
            title: ''
        }]
    }]
});