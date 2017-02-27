class SettingController{
    construct(){
        'ngInject';
    }
}
export default{
    templateUrl: 'dashboard/setting/settings.html',
    bindings: {subscriber: '<'},
    controller: SettingController
}