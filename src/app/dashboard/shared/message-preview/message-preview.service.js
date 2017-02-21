class MessagePreviewService {

    constructor(Modals, $rootScope, Restangular, Bots, toaster) {
        'ngInject';

        this._Modals = Modals;
        this._toaster = toaster;
        this._$rootScope = $rootScope;
        this._MessagePreviews = botId => Restangular.service('message-previews', Bots.one(botId));
    }

    sendPreview(template) {
        if (this._$rootScope.bot.subscriber_id) {
            return this._MessagePreviews(this._$rootScope.bot.id).post({template}).then(
                () => this._toaster.pop('success', "Sent Successfully!", "Preview message has been successfully sent. Check your messenger.")
            );
        }

        this._openPreviewModal(template);
    }

    _openPreviewModal(template) {
        this._Modals.openModal({
            templateUrl: 'dashboard/shared/message-preview/preview.modal.html',
            controller: this._previewModal,
            inputs: {template, MessagePreviews: this._MessagePreviews}
        });
    }

    _previewModal($element, $scope, AppConstants, UserService, $window, $timeout, Pusher, $rootScope, template, toaster, MessagePreviews) {
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
                    Pusher.subscribe(channel, 'subscribed', data => {
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