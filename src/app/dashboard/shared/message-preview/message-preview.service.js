class MessagePreviews {
    constructor(Restangular, Bots) {
        'ngInject';
        return function (botId) {
            return Restangular.service('message-previews', Bots.one(botId));
        }
    }
}

class MessagePreviewService {
    
    constructor(Modals, $rootScope) {
        'ngInject';

        this._Modals = Modals;
        this._$rootScope = $rootScope;
    }

    sendPreview(template) {
        if (this._$rootScope.bot.subscriber_id) {
            return MessagePreviews(this._$rootScope.bot.id).post({template}).then(
                () => this._toaster.pop('success', "Sent Successfully!", "Preview message has been successfully sent. Check your messenger.")
            );
        }

        this._openPreviewModal(template);
    }
    
    _openPreviewModal(template) {
        this._Modals.openModal({
            templateUrl: 'dashboard/shared/message-preview/preview.modal.html',
            controller: this._previewModal,
            inputs: {template}
        });
    }

    _previewModal($element, $scope, AppConstants, UserService, $window, $timeout, Pusher, $rootScope, template, toaster) {
        'ngInject';

        $scope.userId = UserService.current.id;
        $scope.pageId = $rootScope.bot.page.id;
        $scope.appId = AppConstants.facebook.appId;


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

export default MessagePreviewService;