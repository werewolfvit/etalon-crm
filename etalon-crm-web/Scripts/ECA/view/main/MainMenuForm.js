Ext.define("ECA.view.main.MainMenuForm",
{
    extend: 'Ext.container.Viewport',
    style:
        "background-image: url('Content/images/Blue-Sencha.jpg'); margin: 0px; width: 100%; height:100%; background-size: cover;",
    alias: 'MainMenuForm',
    layout: 'border',
    renderTo: Ext.getBody(),
    id: 'mainForm',
    items: [
    {
        xtype: 'toolbar',
        region: 'north',
        items: [
        {
            text: 'Профиль компании',
            scale: 'medium',
            handler: function() {
                Ext.Ajax.request({
                    url: "API/Auth/GetUserInfo",
                    success: function(response, opts) {
                        var obj = Ext.decode(response.responseText);
                        if (obj.success) {
                            var wnd = Ext.create('UserProfileForm');
                            var frm = wnd.down('form');
                            var userInfoModel = Ext.create('ECA.model.UserInfo');
                            userInfoModel.set(obj.data);
                            frm.loadRecord(userInfoModel);
                            wnd.center();
                            wnd.show();
                            Ext.getCmp('LogoId').getEl().dom.firstChild.src = obj.data.PhotoUrl;
                        }
                    },
                    failure: function(response, opts) {
                        console.log("server fault: " + response.status);
                    }

                });

            }
        }, {
            text: 'Сообщения',
            scale: 'medium',
            menu: {
                xtype: 'menu',
                plain: true,
                items: [
                    {
                        text: 'Написать сообщение',
                        handler: function() {
                            var wnd = Ext.create('MessageEdit');
                            wnd.center();
                            wnd.show();
                        }
                    }, {
                        text: 'Заказать пропуск',
                        handler: function() {
                            var frm = Ext.create('ECA.view.message.MessageTmpBadge');
                            frm.show();
                        }
                    }, {
                        text: 'Входящие сообщения',
                        handler: function() {
                            var wnd = Ext.create('MessagesForm');
                            wnd.center();
                            wnd.show();
                        }
                    }
                ]
            }
        }, {
            text: 'Справочники',
            id: 'menuKatalog',
            scale: 'medium',
            menu: {
                xtype: 'menu',
                plain: true,
                items: [
                    {
                        text: 'Пользователи',
                        handler: function() {
                            var wnd = Ext.create('UsersForm');
                            wnd.center();
                            wnd.show();
                        }
                    }, {
                        text: 'Компании',
                        handler: function() {
                            var wnd = Ext.create('CompaniesForm');
                            wnd.center();
                            wnd.show();
                        }
                    }
                ]
            }
        }, {
            text: 'Аренда',
            id: 'menuArenda',
            scale: 'medium',
            menu: {
                xtype: 'menu',
                plain: true,
                items: [
                    {
                        text: 'Редактировать площади',
                        handler: function() {
                            var wnd = Ext.create('RoomsForm');
                            wnd.center();
                            wnd.show();
                        }
                    }
                ]
            }
        }, {
            text: 'Отчеты',
            id: 'menuReport',
            scale: 'medium',
            menu: {
                xtype: 'menu',
                plain: true,
                items: [
                    {
                        text: 'Клиент-Офис',
                        handler: function () {
                            var uri = '/API/Reports/ClientRoom';
                            var link = document.createElement("a");
                            link.href = uri;
                            link.click();
                        }
                    }
                ]
            }
        },
            '->', {
                text: 'Выход',
                scale: 'medium',
                handler: function () {
                    Ext.Ajax.request({
                        url: 'API/Auth/Logout',
                        method: 'POST',
                        success: function (response, opts) {
                            window.location.reload();
                        }
                    });
                }
            }
        ]
    }],
    listeners: {
        afterrender: function() {
            var wnd = Ext.create("ECA.view.message.MessagesForm");
            wnd.center();
            wnd.show();
        }         
    }
});