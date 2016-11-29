Ext.define('ECA.controller.MainController', {
    extend: 'Ext.app.Controller',
    models: [
        'ECA.model.User',
        'ECA.model.Role'
    ],
    //stores: [
    //    'ECA.store.Users'
    //],
    views: [
        'ECA.view.login.LoginForm',
        'ECA.view.main.MainMenuForm',
        'ECA.view.users.UsersForm',
        'ECA.view.room.RoomsForm',
        'ECA.view.message.MessageEdit',
        'ECA.view.companies.CompaniesForm'
    ]
});