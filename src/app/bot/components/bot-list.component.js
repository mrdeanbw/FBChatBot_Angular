export default {
    templateUrl: 'bot/views/index.html',
    bindings: { activeBots: '=', disabledBots : '<' },
    controller: 'BotController'
};