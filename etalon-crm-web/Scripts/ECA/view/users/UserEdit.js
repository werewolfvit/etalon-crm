Ext.define('ECA.view.users.UserEdit',
{
    extend: 'Ext.window.Window',
    requires: ['ECA.store.Companies'],
    alias: 'widget.useredit',
    padding: 5,
    width: 500,
    modal: true,
    title: 'Редактирование пользователя',
    layout: 'fit',
    usedStore: null,
    resizable: false,
    setStore: function(store) {
        this.usedStore = store;
    },
    initImage: function() {
        var frm = Ext.getCmp('userMainForm');
        var photoUrl = frm.getValues()['PhotoUrl'];
        var photo = Ext.getCmp('photoPreviewCmp');
        photo.setConfig('src', photoUrl);
    },
    isInsertForm: false,
    setTabsDisabled() {
        Ext.getCmp('userPhotoTab').setDisabled(true);
        Ext.getCmp('userRoleTab').setDisabled(true);
        Ext.getCmp('userGroupTab').setDisabled(true);
        Ext.getCmp('userPassTab').setDisabled(true);
    },
    setTabsEnabled() {
        Ext.getCmp('userPhotoTab').setDisabled(false);
        Ext.getCmp('userRoleTab').setDisabled(false);
        Ext.getCmp('userGroupTab').setDisabled(false);
        Ext.getCmp('userPassTab').setDisabled(false);
    },
    setInsertType: function() {
        this.isInsertForm = true;
        this.setTabsDisabled();
    },
    items: [
        {
            xtype: 'tabpanel',
            tabBarPosition: 'bottom',
            items: [{
                title: 'Основная информация',
                items: [{
                    xtype: 'form',
                    title: '',
                    id: 'userMainForm',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'PhotoUrl'
                    },{
                        xtype: 'hiddenfield',
                        name: 'UserId'
                    }, {
                        xtype: 'textfield',
                        name: 'Surname',
                        fieldLabel: 'Фамилия',
                        margin: '5 5 5 5',
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        name: 'Name',
                        fieldLabel: 'Имя',
                        margin: '5 5 5 5',
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        name: 'Middlename',
                        fieldLabel: 'Отчество',
                        margin: '5 5 5 5',
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        name: 'Email',
                        fieldLabel: 'Почта',
                        margin: '5 5 5 5',
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        name: 'Phone',
                        fieldLabel: 'Телефон',
                        margin: '5 5 5 5',
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        name: 'Position',
                        fieldLabel: 'Должность',
                        margin: '5 5 5 5',
                        allowBlank: false
                    }, {
                        xtype: 'combobox',
                        name: 'CompanyId',
                        displayField: 'Name',
                        editable: true,
                        forceSelection: true,
                        mode: 'local',
                        store: getCompaniesStore(),
                        triggerAction: 'all',
                        valueField: 'IdRecord',
                        fieldLabel: 'Компания:',
                        allowBlank: false,
                        labelWidth: 100,
                        margin: '5 5 5 5',  
                        //width: 500,
                    }, {
                        xtype: 'textarea',
                        name: 'Description',
                        fieldLabel: 'Комментарий',
                        margin: '5 5 5 5',
                        allowBlank: true
                    }, {
                        xtype: 'checkbox',
                        name: 'IsActive',
                        fieldLabel: 'Активен',
                        margin: '5 5 5 5',
                        checked: true,
                        uncheckedValue: false,
                        inputValue: true,
                        allowBlank: false
                    }]
                }],
                buttons: [{
                        xtype: 'button',
                        scale: 'medium',
                        text: 'Сохранить',
                        margin: '5 5 5 5',
                        handler: function () {
                            var wnd = this.up('window');
                            var frm = wnd.down('form');

                            if (frm.isValid()) {
                                if (!wnd.isInsertForm) {
                                    frm.updateRecord();
                                } else {
                                    var store = wnd.usedStore;
                                    var user = Ext.create('ECA.model.User');
                                    user.set(frm.getValues());
                                    store.add(user);
                                }
                                wnd.close();
                            }
                        }
                    }, {
                        xtype: 'button',
                        scale: 'medium',
                        text: 'Отменить',
                        margin: '5 5 5 5',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }, {
                title: 'Лого компании',
                id: 'userPhotoTab',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'image',
                    id: 'photoPreviewCmp',
                    alt: 'test',
                    height: 300,
                    width: 300,
                    shrinkWrap: true
                }, {
                    xtype: 'form',
                    items: [{
                        xtype: 'fileuploadfield',
                        name: 'photo',
                        fieldLabel: 'Файл',
                        allowBlank: false,
                        buttonText: 'Выбрать'
                    }],
                    buttons: [{
                        text: 'Загрузить',
                        scale: 'medium',
                        handler: function () {
                            var form = this.up('form').getForm();
                            var wnd = this.up('window');
                            var userId = Ext.getCmp('userMainForm').getValues()['UserId'];
                            if (form.isValid()) {
                                form.submit({
                                    url: '/API/Files/UploadProfilePhoto?userId=' + userId,
                                    waitMsg: 'Идёт загрузка файла...',
                                    success: function (fp, o) {
                                        var result = Ext.decode(o.response.responseText);
                                        var photo = Ext.getCmp('photoPreviewCmp');
                                        photo.setConfig('src', result.data.Url);
                                        wnd.usedStore.load();
                                    }
                                });
                            }
                        }
                    }]
                }]
            }, {
                title: 'Роли',
                id: 'userRoleTab',
                items: [
                {
                    xtype: 'form',
                    listeners: {
                        render: function () {
                           
                            var userId = Ext.getCmp('userMainForm').getValues()['UserId'];
                            Ext.Ajax.request({
                                url: "API/Roles/GetByUserId?userId=" + userId,
                                method: "GET",
                                success: function (response, opts) {
                                    var obj = Ext.decode(response.responseText);
                                    if (!obj.success) {
                                    } else {
                                        var res = obj.data;
                                        var resStr = res.join(',');
                                        var tag = Ext.getCmp('roleTagField');
                                        tag.setValue(resStr);
                                    }
                                },
                                failure: function () {
                                    Ext.Msg.alert('Сервер недоступен', 'Сервер не отвечает, обратитесь к администратору.', Ext.emptyFn);
                                }
                            });
                        }
                    },
                    items: [
                        {
                            xtype: 'panel',
                            title: '',
                            items: [{
                                xtype: 'tagfield',
                                name: 'roleSelector',
                                id: 'roleTagField',
                                fieldLabel: 'Выберите роли:',
                                store: {
                                    xtype: 'store',
                                    model: 'ECA.model.Role',
                                    autoLoad: true,
                                    proxy: {
                                        type: 'ajax',
                                        url: '/API/Roles/GetAll',
                                        reader: {
                                            type: 'json',
                                            rootProperty: 'data'
                                        }
                                    }
                                },
                                displayField: 'Description',
                                valueField: 'Name',
                                queryMode: 'local',
                                filterPickList: true
                            }]
                        }
                    ],
                    buttons: [
                        {
                            text: 'Применить',
                            handler: function () {
                                var userId = Ext.getCmp('userMainForm').getValues()['UserId'];
                                var roleSelector = this.up('form').getValues()['roleSelector'];
                                Ext.Ajax.request({
                                    url: '/API/Roles/SetByUserId',
                                    method: 'POST',
                                    jsonData: {
                                        UserId: userId,
                                        Data: roleSelector
                                    },
                                    success: function() {
                                        
                                    },
                                    failure: function() {
                                        
                                    }
                                });
                                Ext.MessageBox.alert('Роли пользователя', 'Применены следующие роли: ' + this.up('form').getValues()['roleSelector']);
                            }
                        }
                    ]
                }]
            }, {
                title: 'Группы',
                id: 'userGroupTab',
                items: [
                {
                    xtype: 'form',
                    listeners: {
                        render: function () {

                            var userId = Ext.getCmp('userMainForm').getValues()['UserId'];
                            Ext.Ajax.request({
                                url: "API/Groups/GetByUserId?userId=" + userId,
                                method: "GET",
                                success: function (response, opts) {
                                    var obj = Ext.decode(response.responseText);
                                    if (!obj.success) {
                                    } else {
                                        debugger;
                                        var res = obj.data;
                                        var resStr = res.join(',');
                                        var tag = Ext.getCmp('groupTagField');
                                        tag.setValue(resStr);
                                    }
                                },
                                failure: function () {
                                    Ext.Msg.alert('Сервер недоступен', 'Сервер не отвечает, обратитесь к администратору.', Ext.emptyFn);
                                }
                            });
                        }
                    },
                    items: [
                        {
                            xtype: 'panel',
                            title: '',
                            items: [{
                                xtype: 'tagfield',
                                name: 'groupSelector',
                                id: 'groupTagField',
                                fieldLabel: 'Выберите группы:',
                                store: {
                                    xtype: 'store',
                                    model: 'ECA.model.Group',
                                    autoLoad: true,
                                    proxy: {
                                        type: 'ajax',
                                        url: '/API/Groups/GetAll',
                                        reader: {
                                            type: 'json',
                                            rootProperty: 'data'
                                        }
                                    }
                                },
                                displayField: 'GroupName',
                                valueField: 'GroupName',
                                queryMode: 'local',
                                filterPickList: true
                            }]
                        }
                    ],
                    buttons: [
                        {
                            text: 'Применить',
                            handler: function () {
                                var userId = Ext.getCmp('userMainForm').getValues()['UserId'];
                                var groupSelector = this.up('form').getValues()['groupSelector'];
                                Ext.Ajax.request({
                                    url: '/API/Groups/SetByUserId',
                                    method: 'POST',
                                    jsonData: {
                                        UserId: userId,
                                        Data: groupSelector
                                    },
                                    success: function () {

                                    },
                                    failure: function () {

                                    }
                                });
                                Ext.MessageBox.alert('Группы пользователя', 'Применены следующие группы: ' + this.up('form').getValues()['groupSelector']);
                            }
                        }
                    ]
                }]
            }, {
                title: 'Пароль',
                id: 'userPassTab',
                items: [
                    {
                        xtype: 'form',
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'Pass',
                                inputType: 'password',
                                fieldLabel: 'Пароль:',
                                allowBlank: false,
                                margin: "10 5 10 5"
                            }, {
                                xtype: 'textfield',
                                name: 'ConfPass',
                                inputType: 'password',
                                fieldLabel: 'Подтверждение:',
                                allowBlank: false,
                                margin: "10 5 10 5"
                            }
                        ],
                        buttons: [
                            {
                                text: 'Применить',
                                handler: function () {
                                    var frm = this.up('form');
                                    var pass = frm.getValues()['Pass'];
                                    var confpass = frm.getValues()['ConfPass'];
                                    if ((frm.isValid()) && (pass === confpass)) {
                                        Ext.Ajax.request({
                                            url: "API/Users/ChangePassword",
                                            method: "POST",
                                            jsonData: {
                                                UserId: Ext.getCmp('userMainForm').getValues()['UserId'],
                                                Data: frm.getValues()
                                            },
                                            success: function (response, opts) {
                                                var obj = Ext.decode(response.responseText);
                                                if (!obj.success) {
                                                    Ext.Msg.alert('Не удалось сменить пароль', 'Попробуйте снова или обратитесь к администратору', Ext.emptyFn);
                                                } else {
                                                    Ext.MessageBox.alert('Смена пароля', 'Пароль успешно изменен', Ext.emptyFn);
                                                }
                                            },
                                            failure: function () {
                                                Ext.Msg.alert('Сервер недоступен', 'Сервер не отвечает, обратитесь к администратору.', Ext.emptyFn);
                                            }
                                        });
                                    } else {
                                        Ext.MessageBox.alert('Смена пароля', 'Поля не заполнены или не соответствуют друг другу', Ext.emptyFn);
                                    }
                                }
                            }
                        ]
                    }
                ]
            }]
        }
    ]
});