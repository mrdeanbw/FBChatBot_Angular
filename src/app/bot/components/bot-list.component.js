export default {
    templateUrl: 'bot/views/index.html',
    bindings: { activeBots: '=', disabledBotCount : '<' },
    controller: 'BotController'
};