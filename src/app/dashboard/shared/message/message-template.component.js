class TemplateController {
    constructor(MessageHelpers, MessagePreviews, Modals, $rootScope, toaster, $timeout, $filter) {
        'ngInject';
        this._Modals = Modals;
        this._toaster = toaster;
        this._$filter = $filter;
        this._$timeout = $timeout;
        this._$rootScope = $rootScope;
        this._MessageHelpers = MessageHelpers;
        this._MessagePreviews = MessagePreviews;

        this.MAX_MESSAGES = 10;
    }

    addTextMessage() {
        this._addMessage({type: 'text', text: '', buttons: []});
    }

    addImage() {
        this._addMessage({type: 'image', image_url: ''});
    }

    addCardContainer() {
        this._addMessage({type: 'card_container', cards: []});
    }

    _addMessage(message) {
        this._MessageHelpers.addMessage(this.template.messages, message);
        this._$timeout(() => $('body').animate({scrollTop: $("#" + this._$filter('normalizedHashkey')(message.$$hashKey)).offset().top}, 'slow'));
    }

    canMoveNext(message) {
        return this._MessageHelpers.canMoveNext(this.template.messages, message);
    }

    moveNext(message) {
        return this._MessageHelpers.moveNext(this.template.messages, message);
    }

    canMovePrevious(message) {
        return this._MessageHelpers.canMovePrevious(this.template.messages, message);
    }

    movePrevious(message) {
        return this._MessageHelpers.movePrevious(this.template.messages, message);
    }

    removable(message) {
        return this._MessageHelpers.removable(this.template.messages, message);
    }

    openDeleteModal(message) {
        return this._MessageHelpers.openDeleteModal(this.template.messages, message);
    }

    sendPreview() {
        this._MessagePreviews.sendPreview(this.template);    
    }
}


export default{
    templateUrl: 'dashboard/shared/message/message-template.html',
    bindings: {template: '<', page: '<', preview: '<'},
    controller: TemplateController
}
