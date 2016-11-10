Ext.define('ECA.view.login.LoginForm',
    {
        extend: 'Ext.window.Window',
        alias: 'LoginForm',
        renderTo: Ext.getBody(),
        requires: 'Ext.form.Panel',
        bodyPagging: 10,
        title: 'Etalon CRM: вход в систему',
        closable: false,
        autoShow: true,
        resizable: false,
        draggable: false,

        items: {
            xtype: 'form',
            //reference: 'form',
            items: [
                {
                    xtype: 'textfield',
                    name: 'login',
                    fieldLabel: 'Логин:',
                    allowBlank: false,
                    margin: "10 5 0 5",
                    emptyText: 'baryshnikov.v'
                }, {
                    xtype: 'textfield',
                    name: 'password',
                    inputType: 'password',
                    fieldLabel: 'Пароль:',
                    allowBlank: false,
                    margin: "10 5 10 5"
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
                    text: 'Войти',
                    formBind: true,
                    listeners: {
                        click: function (btn) {
                            var form = btn.up('form').getForm();

                            Ext.Ajax.request({
                                url: "API/Auth/Login",
                                method: "POST",
                                jsonData: form.getValues(),
                                success: function (response, opts) {
                                    var obj = Ext.decode(response.responseText);
                                    if (!obj.success) {
                                        Ext.Msg.alert('Не удалось войти', '<b>Неверная пара логин\\пароль!</b>', Ext.emptyFn);
                                    } else {
                                        var wnd = btn.up('window');
                                        wnd.close();

                                        Ext.create("MainMenuForm");
                                    }
                                },
                                failure: function () {
                                    Ext.Msg.alert('Сервер недоступен', 'Сервер не отвечает, обратитесь к администратору.', Ext.emptyFn);
                                }
                            });
                        }
                    }
                }
            ]
        }
    });