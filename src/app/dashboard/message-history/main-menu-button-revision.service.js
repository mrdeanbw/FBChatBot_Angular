class MainMenuButtonRevisions  {
    constructor(Restangular, Bots) {
        'ngInject';
        let MainMenuButtons = (botId) => Restangular.service('main-menu-buttons', Bots.one(botId));
        return (botId, messageId) => Restangular.service('revisions', MainMenuButtons(botId).one(messageId));
    }
}

export default MainMenuButtonRevisions ;