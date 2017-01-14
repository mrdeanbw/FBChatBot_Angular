var registerRootState = function ($stateProvider) {
    var dashboardRootState = {
        name: 'dashboard',
        url: '/:facebookId/dashboard',
        templateUrl: '/templates/dashboard/layout.html',
        abstract: true,
        breadcrumbTitle: 'Dashboard',
        params: { facebookId: null },
    };
    $stateProvider.state(dashboardRootState);
};


var registerOverviewState = function ($stateProvider) {
    var overviewState = {
        name: 'dashboard.overview',
        url: "/overview",
        component: 'overview',
    };
    $stateProvider.state(overviewState);
};


var registerBuildTemplateStates = function ($stateProvider) {
    var states = [
        // {
        //     name: 'dashboard.build.template',
        //     url: "/message-templates",
        //     abstract: true,
        //     breadcrumbTitle: 'Message Templates',
        //     breadcrumbState: 'dashboard.build.template.list',
        //     templateUrl: '/templates/dashboard/build/templates/layout.html'
        // },
        // {
        //     name: 'dashboard.build.template.list',
        //     url: "/",
        //     component: 'listTemplates',
        //     breadcrumbTitle: 'Message Templates',
        //     pageTitle: 'Message Templates',
        //     pageDescription: 'Pre-defined message templates to be used across the app. A very powerful tool to use certain messages for more than one purpose.',
        //     resolve: {
        //         templates: function (Templates) {
        //             return Templates.getList();
        //         }
        //     }
        // },
        // {
        //     name: 'dashboard.build.template.create',
        //     url: "/create",
        //     breadcrumbTitle: 'Create Message Template',
        //     pageTitle: 'Create New Message Template',
        //     pageDescription: 'Configure your message blocks and a descriptive name so that you can find it easily!',
        //     component: 'createTemplate'
        // },
        // {
        //     name: 'dashboard.build.template.edit',
        //     url: "/:templateId",
        //     breadcrumbTitle: 'Edit Message Template',
        //     component: 'editTemplate',
        //     pageTitle: 'Edit Message Template',
        //     pageDescription: 'Update your message blocks!',
        //     resolve: {
        //         template: function (Templates, $stateParams) {
        //             return Templates.one($stateParams.templateId).get();
        //         }
        //     }
        // },
        {
            name: 'dashboard.build.tree',
            url: "/message-trees",
            abstract: true,
            breadcrumbTitle: 'Message Trees',
            breadcrumbState: 'dashboard.build.template.list',
            templateUrl: '/templates/dashboard/build/templates/layout.html'
        },
        {
            name: 'dashboard.build.tree.list',
            url: "/",
            component: 'listTrees',
            breadcrumbTitle: 'Message Trees',
            pageTitle: 'Message Trees',
            pageDescription: 'Pre-defined message trees to be used across the app. A very powerful tool to chain your messages, use certain messages for more than one purpose, and to provide instant and smart button feedback!',
            resolve: {
                trees: function (Trees, $rootScope) {
                    return Trees($rootScope.page.id).getList();
                }
            }
        },
        {
            name: 'dashboard.build.tree.create',
            url: "/create",
            breadcrumbTitle: 'Create Message Tree',
            pageTitle: 'Create New Message Tree',
            pageDescription: 'Configure your message tree nodes and a descriptive name so that you can find it easily!',
            component: 'createTree',
            resolve: {
                trees: function (Trees, $rootScope) {
                    return Trees($rootScope.page.id).getList();
                }
            }
        },
        {
            name: 'dashboard.build.tree.edit',
            url: "/:treeId",
            breadcrumbTitle: 'Edit Message Tree',
            component: 'editTree',
            pageTitle: 'Edit Message Tree',
            pageDescription: 'Update your message tree!',
            resolve: {
                tree: function (Trees, $stateParams, $rootScope) {
                    return Trees($rootScope.page.id).one($stateParams.treeId).get();
                },
                trees: function (Trees, $rootScope) {
                    return Trees($rootScope.page.id).getList();
                }
            }
        }
    ];

    for (var i = 0; i < states.length; i++) {
        $stateProvider.state(states[i]);
    }
};


var registerBuildStates = function ($stateProvider) {
    var buildStates = [
        {
            name: 'dashboard.build',
            url: '/build',
            abstract: true,
            breadcrumbTitle: 'Build Bot',
            templateUrl: '/templates/dashboard/build/layout.html'
        },
        {
            name: 'dashboard.build.keywords',
            url: "/keywords",
            breadcrumbTitle: 'Keywords',
            pageTitle: 'Response Automation (Keywords)',
            pageDescription: 'Keywords are used to automate your bot replies when a user asks something. Creating a keyword is easy, just tap the “+ New Keyword” button, specify the keyword and point it to the right content. Now if your users mention that keyword the bot will reply with the selected content.',
            component: 'keywords',
            resolve: {
                rules: function (AutoReplyRules, $rootScope) {
                    return AutoReplyRules($rootScope.page.id).getList();
                },
                trees: function (Trees, $rootScope) {
                    return Trees($rootScope.page.id).getList();
                }
            }
        },
        {
            name: 'dashboard.build.main-menu',
            url: "/main-menu",
            breadcrumbTitle: 'Main Menu',
            pageTitle: 'Main Menu',
            pageDescription: 'The Main Menu is a persistent menu that is always available to the user. This menu should contain top-level actions that users can enact at any point.',
            component: 'mainMenu',
            resolve: {
                mainMenu: function (MainMenus, $rootScope) {
                    return MainMenus($rootScope.page.id).one(0).get();
                }
            }
        },
        {
            name: 'dashboard.build.default-reply',
            url: "/default-reply",
            breadcrumbTitle: 'Default Reply',
            pageTitle: 'Default Reply',
            pageDescription: 'Default Reply is sent when the bot doesn’t know what to answer (i.d. no keyword matches). Tell your users what they can ask about (what keywords you set up) or provide them with a menu by sending a message with buttons.',
            component: 'defaultReply',
            resolve: {
                defaultReply: function (DefaultReplies, $rootScope) {
                    return DefaultReplies($rootScope.page.id).one(0).get();
                }
            }
        },
        {
            name: 'dashboard.build.greeting-text',
            url: "/greeting-text",
            breadcrumbTitle: 'Greeting Text',
            pageTitle: 'Greeting Text',
            pageDescription: 'Here you can set up your greeting text. Display a friendly message and encourage them to get engaged with your page!',
            component: 'greetingText',
            resolve: {
                greetingText: function (GreetingTexts, $rootScope) {
                    return GreetingTexts($rootScope.page.id).one(0).get();
                }
            }
        },
        {
            name: 'dashboard.build.welcome-message',
            url: "/welcome-message",
            breadcrumbTitle: 'Welcome Message',
            pageTitle: 'Welcome Message',
            pageDescription: 'Here you can set up a Welcome Message to greet your subscribers. Tell your subscribers what to expect: what is your bot about, how often do you post and anything else that you think is important. Only people that click a button or send you a message become subscribers – so make it engaging!',
            component: 'welcomeMessage',
            resolve: {
                welcomeMessage: function (WelcomeMessages, $rootScope) {
                    return WelcomeMessages($rootScope.page.id).one(0).get();
                }
            }
        }
    ];

    for (var i = 0; i < buildStates.length; i++) {
        $stateProvider.state(buildStates[i]);
    }

    registerBuildTemplateStates($stateProvider);
};


var registerBroadcastState = function ($stateProvider) {
    var broadcastState = [
        {
            name: 'dashboard.broadcast',
            url: "/broadcasts",
            abstract: true,
            breadcrumbTitle: 'Broadcasts',
            breadcrumbState: 'dashboard.broadcast.list',
            templateUrl: '/templates/dashboard/broadcast/layout.html'
        },
        {
            name: 'dashboard.broadcast.list',
            url: "/",
            component: 'listBroadcasts',
            breadcrumbTitle: 'Broadcasts',
            pageTitle: 'Broadcast your messages',
            pageDescription: 'Send Messages in bulk to pre-defined subscribers segments. With Mr. Reply Broadcast feature you can target and send custom messages to your subscribers.',
            resolve: {
                broadcasts: function (Broadcasts, $rootScope) {
                    return Broadcasts($rootScope.page.id).getList();
                }
            }
        },
        {
            name: 'dashboard.broadcast.create',
            url: "/create",
            breadcrumbTitle: 'New Broadcast',
            pageTitle: 'Create New Broadcast Message',
            pageDescription: 'Configure your template message blocks and a descriptive name so that you can find it easily!',
            component: 'createBroadcast'
        },

        {
            name: 'dashboard.broadcast.show',
            url: "/:broadcastId/report",
            breadcrumbTitle: 'Broadcast Details',
            component: 'showBroadcast',
            pageTitle: 'Broadcast Details',
            pageDescription: 'Send Messages in bulk to pre-defined subscribers segments. With Mr. Reply Broadcast feature you can target and send custom messages to your subscribers.',
            resolve: {
                broadcast: function (Broadcasts, $stateParams, $rootScope) {
                    return Broadcasts($rootScope.page.id).one($stateParams.broadcastId).get();
                }
            }
        },

        {
            name: 'dashboard.broadcast.edit',
            url: "/:broadcastId",
            breadcrumbTitle: 'Edit Broadcast',
            component: 'editBroadcast',
            pageTitle: 'Edit your broadcast',
            pageDescription: 'Send Messages in bulk to pre-defined subscribers segments. With Mr. Reply Broadcast feature you can target and send custom messages to your subscribers.',
            resolve: {
                broadcast: function (Broadcasts, $stateParams, $rootScope) {
                    return Broadcasts($rootScope.page.id).one($stateParams.broadcastId).get();
                }
            }
        }


    ];

    for (var i = 0; i < broadcastState.length; i++) {
        $stateProvider.state(broadcastState[i]);
    }
};

var registerSequenceState = function ($stateProvider) {
    var sequenceStates = [
        {
            name: 'dashboard.sequence',
            url: "/sequences",
            abstract: true,
            breadcrumbTitle: 'Sequences',
            breadcrumbState: 'dashboard.sequence.list',
            templateUrl: '/templates/dashboard/sequence/layout.html',
        },
        {
            name: 'dashboard.sequence.list',
            url: "/",
            component: 'listSequences',
            breadcrumbTitle: 'Sequences',
            pageTitle: 'Plan your Campaigns with messages sequences',
            pageDescription: 'Plan response sequence to make it easier to plan Campaigns',
            resolve: {
                sequences: function (Sequences, $rootScope) {
                    return Sequences($rootScope.page.id).getList();
                }
            }
        },
        {
            name: 'dashboard.sequence.edit',
            url: "/:sequenceId",
            breadcrumbTitle: 'Edit Sequence',
            component: 'editSequence',
            pageTitle: 'Edit your sequence',
            pageDescription: 'Edit your sequence messages, timeline and automation settings!',
            resolve: {
                sequence: function (Sequences, $stateParams, $rootScope) {
                    return Sequences($rootScope.page.id).one($stateParams.sequenceId).get();
                }
            }
        },
        {
            name: 'dashboard.sequence.message',
            url: "/:sequenceId/message",
            abstract: true,
            templateUrl: '/templates/dashboard/sequence/message/layout.html'
        },
        {
            name: 'dashboard.sequence.message.create',
            url: "/create",
            breadcrumbTitle: 'New Sequence Message',
            component: 'createSequenceMessage',
            pageTitle: 'New Sequence Message',
            pageDescription: 'Add a new message to your sequence',
            resolve: {
                sequence: function (Sequences, $stateParams, $rootScope) {
                    return Sequences($rootScope.page.id).one($stateParams.sequenceId).get();
                }
            }
        },
        {
            name: 'dashboard.sequence.message.edit',
            url: "/:messageId",
            breadcrumbTitle: 'Edit Sequence Message',
            component: 'editSequenceMessage',
            pageTitle: 'Edit Sequence Message',
            pageDescription: 'Edit your sequence message',
            resolve: {
                sequence: function (Sequences, $stateParams, $rootScope) {
                    return Sequences($rootScope.page.id).one($stateParams.sequenceId).get();
                },
                message: ['sequence', '$stateParams', function (sequence, $stateParams) {
                    var ret = undefined;
                    angular.forEach(sequence.messages, function (message) {
                        if (!ret && message.id == parseInt($stateParams.messageId)) {
                            ret = message;
                        }
                    });
                    return ret;
                }]
            }
        }
    ];

    for (var i = 0; i < sequenceStates.length; i++) {
        $stateProvider.state(sequenceStates[i]);
    }
};

var registerSubscriberStates = function ($stateProvider) {
    var audienceStates = [
        {
            name: 'dashboard.subscriber',
            url: "/audience",
            abstract: true,
            breadcrumbTitle: 'Audience',
            breadcrumbState: 'dashboard.subscriber.list',
            templateUrl: '/templates/dashboard/subscriber/layout.html',
        },
        {
            name: 'dashboard.subscriber.list',
            url: "/",
            component: 'listSubscribers',
            breadcrumbTitle: 'Audience',
            pageTitle: 'Easier than finding a needle in the haystack',
            pageDescription: 'Easier than finding a needle in the haystack',
        },
        {
            name: 'dashboard.subscriber.show',
            url: "/:subscriberId",
            component: 'showSubscriber',
            breadcrumbTitle: 'Subscriber Profile',
            pageTitle: 'Subscriber Profile',
            pageDescription: 'More detailed information about your subscriber.',
            resolve: {
                subscriber: function (Subscribers, $stateParams, $rootScope) {
                    return Subscribers($rootScope.page.id).one($stateParams.subscriberId).get();
                },
                sequences: function (Sequences, $rootScope) {
                    return Sequences($rootScope.page.id).getList();
                },
                tags: function (Tags, $rootScope) {
                    return Tags($rootScope.page.id).getList();
                }
            }
        }
    ];


    for (var i = 0; i < audienceStates.length; i++) {
        $stateProvider.state(audienceStates[i]);
    }
};

var registerPromoteState = function ($stateProvider) {
    var promoteStates = [
        {
            name: 'dashboard.widgets',
            url: "/growth-tools/widgets",
            breadcrumbTitle: 'Growth Tools (Widgets)',
            breadcrumbState: 'dashboard.widgets.list',
            abstract: true,
            templateUrl: "/templates/dashboard/widgets/layout.html"
        },
        {
            name: 'dashboard.widgets.list',
            url: "/",
            component: 'listWidgets',
            breadcrumbTitle: 'Growth Tools (Widgets)',
            pageTitle: 'Make your chat bot accessible from Everywhere',
            pageDescription: 'With Mr. Reply Promote and Growth tools you can embed buttons and widgets, everywhere. you can find all what you need to promote your chat bot across different mediums. from embedded "Message us" and "Send to messenger" to Complex Widget to funnel your subscribers.',
            resolve: {
                widgets: function (Widgets, $rootScope) {
                    return Widgets($rootScope.page.id).getList();
                }
            }
        },
        {
            name: 'dashboard.widgets.create',
            url: "/create?type=",
            breadcrumbTitle: 'New Widget',
            pageTitle: 'Create a new widget',
            pageDescription: '',
            component: 'createWidget',
            resolve: {
                sequences: function (Sequences, $rootScope) {
                    return Sequences($rootScope.page.id).getList();
                }
            }
        },
        {
            name: 'dashboard.widgets.edit',
            url: "/:widgetId",
            breadcrumbTitle: 'Edit Widget',
            component: 'editWidget',
            pageTitle: 'Edit Widget',
            resolve: {
                widget: function (Widgets, $stateParams, $rootScope) {
                    return Widgets($rootScope.page.id).one($stateParams.widgetId).get();
                },
                sequences: function (Sequences, $rootScope) {
                    return Sequences($rootScope.page.id).getList();
                }
            }
        }
    ];

    for (var i = 0; i < promoteStates.length; i++) {
        $stateProvider.state(promoteStates[i]);
    }

};

var registerSettingsState = function ($stateProvider) {
    var settingsState = {
        name: 'dashboard.settings',
        url: "/settings",
        component: 'settings',
        breadcrumbTitle: 'Settings',
        pageTitle: 'Bot Settings',
        params: { upgrade: false },
        resolve: {
            timezones: function () {
                var ret = [];
                angular.forEach(moment.tz._zones, function (value, key) {
                    if (angular.isString(value)) {
                        ret.push(value.split('|')[0]);
                    }
                });
                return ret;
            },
            timezone: function ($rootScope) {
                return $rootScope.page.bot_timezone_string;
            },
            subscriptionPlans: function (SubscriptionPlans) {
                return SubscriptionPlans.getList({ name: 'pro' });
            }
        }
    };

    var invoiceState = {
        name: 'dashboard.invoice',
        url: "/invoices/:invoiceId",
        component: 'showInvoice',
        breadcrumbTitle: 'Invoice',
        pageTitle: 'Invoice',
        resolve: {
            invoice: function (Invoices, $rootScope, $stateParams) {
                return Invoices($rootScope.page.id).one($stateParams.invoiceId).get();
            }
        }
    };
    
    $stateProvider.state(settingsState);
    $stateProvider.state(invoiceState);
};


angular.module('dashboard').config(['$stateProvider', function ($stateProvider) {
    registerRootState($stateProvider);
    registerOverviewState($stateProvider);
    registerBuildStates($stateProvider);
    registerBroadcastState($stateProvider);
    registerSequenceState($stateProvider);
    registerSubscriberStates($stateProvider);
    registerPromoteState($stateProvider);
    registerSettingsState($stateProvider);
}]);