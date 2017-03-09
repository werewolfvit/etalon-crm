Ext.define('ECA.view.login.LoginForm',
    {
        extend: 'Ext.window.Window',
        alias: 'LoginForm',
        renderTo: Ext.getBody(),
        requires: 'Ext.form.Panel',
        bodyPagging: 10,
        title: 'Etalon CRM: вход в систему',
        closable: false,
        //autoShow: true,
        resizable: false,
        draggable: false,

        items: {
            xtype: 'form',
            //reference: 'form',
            items: [
                {
                    xtype: 'textfield',
                    name: 'email',
                    fieldLabel: 'Ваша почта:',
                    allowBlank: false,
                    margin: "10 5 0 5",
                    emptyText: 'your.login',
                    vtype: 'email',
                    emptyText: 'example@mail.com'
                }, {
                    xtype: 'textfield',
                    name: 'password',
                    inputType: 'password',
                    fieldLabel: 'Пароль:',
                    allowBlank: false,
                    margin: "10 5 10 5",
                    enableKeyEvents: true,
                    listeners: {
                        keypress: function (form, e) {
                            var currForm = this.up('form').getForm();
                            if (e.getKey() == e.RETURN && currForm.isValid()) {
                                this.up('window').doLogin(currForm);
                            }
                        }
                    }
                    
                }, {
                    xtype: "checkboxfield",
                    name: "remember",
                    fieldLabel: "Запомнить меня",
                    checked: true,
                    uncheckedValue: false,
                    margin: "10 5 10 5",
                    inputValue: true
                }
            ],
            buttons: [
            {
                text: 'Забыли пароль?',
                handler: function () {
                    var wnd = Ext.create('ECA.view.login.RefreshPassForm');
                    wnd.center();
                    wnd.show();
                    this.up('window').close();
                }
            },
                {
                    text: 'Войти',
                    formBind: true,
                    listeners: {
                        click: function (btn) {
                            var form = btn.up('form').getForm();
                            this.up('window').doLogin(form);
                        }
                    }
                }
            ]
        },

        doLogin: function (form) {
            Ext.Ajax.request({
                url: "API/Auth/Login",
                method: "POST",
                jsonData: form.getValues(),
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);
                    if (!obj.success) {
                        Ext.Msg.alert('Не удалось войти', '<b>Неверная пара логин\\пароль!</b>', Ext.emptyFn);
                    } else {
                        window.location.reload();
                    }
                },
                failure: function () {
                    Ext.Msg.alert('Не удалось войти', 'Сервер не отвечает, обратитесь к администратору.', Ext.emptyFn);
                }
            });
        }
    });