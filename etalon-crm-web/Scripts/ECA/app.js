Ext.Loader.setConfig({ enabled: true });

Ext.application({
    name: 'ECA',
    appFolder: 'Scripts/ECA',
    controllers: [
        'MainController'
    ],
    models: [
        'ECA.model.User'
    ],
    stores: [
        'ECA.store.Users',
        'ECA.store.Rooms',
        'ECA.store.Floors'
    ],
    views: [
        'ECA.view.login.LoginForm',
        'ECA.view.main.MainMenuForm',
        'ECA.view.users.UsersForm'
    ],
    launch: function () {
        Ext.Ajax.request({
            url: "API/Auth/GetUserInfo",
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj.success) {
                    Ext.create("MainMenuForm");
                } else {
                    Ext.create("LoginForm");
                }
            },
            failure: function (response, opts) {
                console.log("server fault: " + response.status);
            }
        });
    }
});