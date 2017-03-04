Ext.define('ECA.controller.MainController', {
    extend: 'Ext.app.Controller',
    models: [
        'ECA.model.User',
        'ECA.model.Role',
        'ECA.model.Recepient',
        'ECA.model.UserMessage',
        'ECA.model.UserInfo',
        'ECA.model.TmpBadgeFio',
        'ECA.model.Group',
        'ECA.model.TmpBadgeAuto'
    ],
    //stores: [
    //    'ECA.store.Companies'
    //],
    views: [
        'ECA.view.login.LoginForm',
        'ECA.view.main.MainMenuForm',
        'ECA.view.users.UsersForm',
        'ECA.view.room.RoomsForm',
        'ECA.view.message.MessageEdit',
        'ECA.view.companies.CompaniesForm',
        'ECA.view.message.MessagesForm',
        'ECA.view.message.MessageRead',
        'ECA.view.users.UserProfileForm',
        'ECA.view.companies.CompanyEdit',
        'ECA.view.room.RoomEdit',
        'ECA.view.login.RefreshPassForm',
        'ECA.view.message.MessageTmpBadge',
        'ECA.view.users.UserEdit'
    ]
});