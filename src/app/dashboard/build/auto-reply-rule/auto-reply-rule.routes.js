function AutoReplyRuleRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard.build.auto-reply-rule', {
        url: '/keywords',
        component: 'autoReplyRule',
        title: 'Keywords (Response Automation)',
        description: 'Keywords are used to automate your bot replies when a user asks something. Creating a keyword is easy, just tap the “+ New Keyword” button, specify the keyword and point it to the right content. Now if your users mention that keyword the bot will reply with the selected content.',
        resolve: {
            rules: (AutoReplyRules, bot) => {
                'ngInject';
                return AutoReplyRules(bot.id).getList();
            }
        }
    });

}


export default AutoReplyRuleRoutes;
