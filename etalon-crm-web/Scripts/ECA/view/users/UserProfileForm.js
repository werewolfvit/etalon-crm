Ext.define('ECA.view.users.UserProfileForm',
{
    extend: 'Ext.window.Window',
    alias: 'UserProfileForm',
    //padding: 5,
    title: 'Профиль пользователя',
    layout: 'fit',
    usedStore: null,
    resizable: false,
    items: [
    {
        xtype: 'form',
        layout: 'vbox',
        items: [
        {
            xtype: 'textfield',
            name: 'Name',
            fieldLabel: 'ФИО руководителя',
            labelWidth: 200,
            width: 550,
            margin: '5 5 5 5',
            readOnly: true
        }, {
            xtype: 'textfield',
            name: 'Email',
            fieldLabel: 'Адрес электронной почты',
            labelWidth: 200,
            width: 550,
            margin: '5 5 5 5',
            readOnly: true
        }, {
            xtype: 'textfield',
            name: 'Phone',
            fieldLabel: 'Телефон',
            labelWidth: 200,
            width: 550,
            margin: '5 5 5 5',
            readOnly: true
        }, {
            xtype: 'textfield',
            name: 'Position',
            fieldLabel: 'Должность',
            labelWidth: 200,
            width: 550,
            margin: '5 5 5 5',
            readOnly: true
        }, {
            xtype: 'textfield',
            name: 'Company',
            fieldLabel: 'Компания',
            labelWidth: 200,
            width: 550,
            margin: '5 5 5 5',
            readOnly: true
        }, {
            xtype: 'fieldcontainer',
            fieldLabel: 'Лого компании',
            width: 200,
            height: 200,
            labelWidth: 200,
            margin: '5 5 5 5',
            items: [{
                xtype: 'box',
                title: 'logo',
                height: 200,
                width: 200,
                id: 'LogoId',
                autoEl:
                    {
                        tag: 'div',
                        //style: 'text-align: center;',
                        children:
                            [{
                                style: 'height: 100%; max-height: 200px;',
                                tag: 'img',
                                id: 'user_img',
                                src: ''
                            }]
                    }
            }]
        }, {
            xtype: 'textarea',
            name: 'Description',
            fieldLabel: 'Комментарий',
            labelWidth: 200,
            width: 550,
            margin: '5 5 5 5',
            readOnly: true
        }, {
            xtype: 'fieldcontainer',
            fieldLabel: 'Сменить пароль',
            //width: 200,
            //height: 200,
            labelWidth: 200,
            margin: '5 5 5 5',
            items: [
            {
                xtype: 'textfield',
                id: 'PassChange',
                inputType: 'password',
                width: 345,
            }, {
                xtype: 'textfield',
                id: 'PassChangeConfirm',
                inputType: 'password',
                width: 345,
            }, {
                xtype: 'button',
                width: 300,
                text: 'Установить новый пароль',
                handler: function() {
                    var pass = Ext.getCmp('PassChange').value;
                    var passConf = Ext.getCmp('PassChangeConfirm').value;
                    if (pass !== passConf) {
                        Ext.Msg.alert('Не удалось сменить пароль', '<b>Пароли не соотвествуют друг другу!</b>', Ext.emptyFn);
                        return;
                    }

                    var param = {
                        password: pass
                    }
                    Ext.Ajax.request({
                        url: '/API/Users/UserChangePassword',
                        method: 'POST',
                        jsonData: JSON.stringify(param),
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            if (!obj.success) {
                                Ext.Msg.alert('Не удалось сменить пароль', '<b>При смене пароля произошла ошибка. Убедитесь что пароль не содержит кириллицы, достаточно длинный или обратитесь к системному администратору!</b>', Ext.emptyFn);
                            } else {
                                Ext.Msg.alert('Успешно', '<b>Пароль был изменен!</b>', Ext.emptyFn);
                            }
                        },
                        failure: function() {
                            Ext.Msg.alert('Не удалось сменить пароль', '<b>Нет связи с сервером! Обратитесь к системному администратору!</b>', Ext.emptyFn);
                        }
                    });
                }
            }]
        }]
    }],
    buttons: [{
        text: 'Выход',
        handler: function() {
            this.up('window').close();
        }
    }]
});