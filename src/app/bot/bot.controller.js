class BotController {

    constructor(Pages, Bots, $injector, $facebook, UserService, Modals, AppHelpers, lodash) {
        'ngInject';

        this._Bots = Bots;
        this._Pages = Pages;
        this._lodash = lodash;
        this._Modals = Modals;
        this._$injector = $injector;
        this._$facebook = $facebook;
        this._AppHelpers = AppHelpers;
        this._UserService = UserService;

        this.selected = [];
    }

    isSelected(page) {
        return this.selected.includes(page);
    }

    toggleSelection(page) {
        if (this.selected.includes(page)) {
            return this._AppHelpers.deleteFromArray(this.selected, page);
        }
        this.selected.push(page);
    }

    refresh() {
        return this._Pages.getList({notManagedByUser: true}).then(
            pages=> this.pages = pages,
            err => this.pages = err
        );
    }

    hasBot(page) {
        return !!page.bot_id;
    }

    create() {
        let pageIds = this._lodash.map(this.selected, 'id');
        this._Bots.post({pageIds}).then(
            (res) => this._$injector.get('$state').go('app.dashboard.overview', {botId: res[0].id})
        );
    };

    login() {
        this._$facebook.login().then(
            (response) => {
                if (response.status === 'connected') {
                    return this._UserService.login(response.authResponse.accessToken).then(
                        () => this._$injector.get('$state').reload()
                    );
                }
                return this._$injector.get('$state').reload();
            }
        );
    }

    openEnableBotModal(bot) {
        this._Modals.openModal({
            templateUrl: "/bot/html/enable.modal.html",
            controller: this._enableBot,
            inputs: {bot: bot},
            cb: success => {
                if (success) {
                    this._FlashBag.success("Chat-Bot Enabled!", "Your chat-bot has been enabled.");
                    this._$state.go("app.dashboard.overview", {botId: bot.id});
                }
            }
        });
    };

    _enableBot($scope, close, bot, $element) {
        'ngInject';

        $scope.bot = bot;

        $scope.enable = function () {
            bot.patch({enabled: true}).then(
                response => {
                    $element.modal('hide');
                    close(response, 500);
                }
            );
        };

        $scope.cancel = function () {
            close(false, 500);
        };
    }


}

export default BotController;
