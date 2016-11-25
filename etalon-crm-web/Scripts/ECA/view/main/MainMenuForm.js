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
            text: 'Пользователь',
            menu: {
                xtype: 'menu',
                id: 'mainMenu',
                items: [
                    {
                        text: 'Профиль',
                        handler: function() {
                            alert('Профиль');
                        }
                    }, '-', {
                        text: 'Выход'
                    }
                ]
            }
        }, {
            text: 'Сообщения',
            menu: {
                xtype: 'menu',
                plain: true,
                items: {
                    text: 'Новое сообщение',
                    handler: function() {
                        var wnd = Ext.create('MessageEdit');
                        wnd.center();
                        wnd.show();
                    }
                }
            }
        }, {
            text: 'Пользователи',
            menu: {
                xtype: 'menu',
                plain: true,
                items: [{
                        text: 'Редактировать пользователей',
                        handler: function () {
                            var wnd = Ext.create('UsersForm');
                            wnd.center();
                            wnd.show();
                        }
                }]
            }
        }, {
            text: 'Аренда',
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
        },
        '->',
        {
            text: 'Выход',
            handler: function () {
                Ext.Ajax.request({
                    url: 'API/Auth/Logout',
                    method: 'POST',
                    success: function (response, opts) {
                        window.location.reload();
                    }
                });
            }
         }]
    }]
});