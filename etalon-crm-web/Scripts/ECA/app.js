Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath('ECA', '/Scripts/ECA');
Ext.require('ECA.store.Companies');

Ext.onReady( function() {
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
            'ECA.store.Floors',
            'ECA.store.Companies',
            'ECA.store.RoomPhotos'
        ],
        views: [
            'ECA.view.login.LoginForm',
            'ECA.view.main.MainMenuForm',
            'ECA.view.users.UsersForm',
            'ECA.view.message.MessagesForm'
        ],
        launch: function () {
            Ext.Ajax.request({
                url: "API/Auth/GetUserInfo",
                success: function(response, opts) {
                    var obj = Ext.decode(response.responseText);
                    if (obj.success) {
                        Ext.create("MainMenuForm");

                        if ((obj.data.Groups.length == 0)
                            || (obj.data.Groups.indexOf("Renter") != -1))
                        {
                            try {
                                var arenda = Ext.getCmp("menuArenda");
                                var katalog = Ext.getCmp("menuKatalog");
                                var report = Ext.getCmp("menuReport");
                                arenda.destroy();
                                katalog.destroy();
                                report.destroy();
                            }
                            finally {

                            }
                        }


                        if (obj.data.Groups.indexOf("Employer") != -1) {
                            try {
                                var arenda = Ext.getCmp("menuArenda");
                                var report = Ext.getCmp("menuReport");
                                arenda.destroy();
                                report.destroy();
                            }
                            finally {

                            }
                        }
                        
                    } else {
                        var wnd = Ext.create("ECA.view.login.LoginForm");
                        wnd.center();
                        wnd.show();
                    }
                },
                failure: function(response, opts) {
                    console.log("server fault: " + response.status);
                }
            });
        }
    });
});


var companiesStore = null;

function getCompaniesStore() {
    if (companiesStore === null) {
        companiesStore = Ext.create('ECA.store.Companies');
        companiesStore.load();
    }
    return companiesStore;
}

