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
        if (this._$rootScope.bot.subscriber_id) {
            return this._MessagePreviews(this._$rootScope.bot.id).post({template: this.template}).then(
                ()=> this._toaster.pop('success', "Sent Successfully!", "Preview message has been successfully sent. Check your messenger.")
            );
        }

        this._openPreviewModal();
    }

    _openPreviewModal() {
        this._Modals.openModal({
            templateUrl: 'dashboard/shared/message/preview.modal.html',
            controller: this._previewModal,
            inputs: {template: this.template}
        });
    }

    _previewModal($element, $scope, AppConstants, UserService, $window, $timeout, Pusher, $rootScope, template, MessagePreviews, toaster) {
        'ngInject';

        $scope.userId = UserService.current.id;
        $scope.appId = AppConstants.facebook.appId;
        $scope.pageId = $rootScope.bot.page.id;


        var handledClickedEvent = false;

        $timeout(() => {
            $window.FB.XFBML.parse($element.find('.modal-body').get(0));
            $window.FB.Event.subscribe('send_to_messenger', (e) => {
                if (e.event == "clicked" && !handledClickedEvent) {
                    toaster.pop('info', 'Hold on there!', "It will take us a few seconds to subscribe you and send the messages. Hold on there.");
                    handledClickedEvent = true;
                    let channel = `${$rootScope.bot.id}_${$scope.userId}_subscriptions`;
                    Pusher.subscribe(channel, 'subscribed', (data) => {
                        $rootScope.bot.subscriber_id = data.subscriber_id;
                        Pusher.unsubscribe(channel);
                        MessagePreviews($rootScope.bot.id).post({template}).then(
                            ()=> toaster.pop('success', "Sent Successfully!", "Preview message has been successfully sent. Check your messenger.")
                        );
                        $element.modal('hide');
                    });
                }
            });
        });
    }
}

export default{
    templateUrl: 'dashboard/shared/message/message-template.html',
    bindings: {template: '<', page: '<', preview: '<'},
    controller: TemplateController
}
