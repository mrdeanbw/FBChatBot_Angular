// angular.module('dashboard').component('buttonWrapper', {
//     templateUrl: '/templates/dashboard/message-blocks/wrappers/button.html',
//     require: {
//         manager: '^messageBlocks'
//     },
//     bindings: {
//         messageBlock: '=',
//         context: '<'
//     },
//     controller: function(){}
// });

angular.module('dashboard').component('cardWrapper', {
    templateUrl: '/templates/dashboard/message-blocks/wrappers/button.html',
    require: {
        manager: '^messageBlocks'
    },
    bindings: {
        messageBlock: '=',
        context: '<'
    },
    controller: function () {
    }
});

angular.module('dashboard').component('cardContainerWrapper', {
    templateUrl: '/templates/dashboard/message-blocks/wrappers/card-container.html',
    require: {
        manager: '^messageBlocks'
    },
    bindings: {
        messageBlock: '='
    },
    controller: function () {
    }
});
angular.module('dashboard').component('imageWrapper', {
    templateUrl: '/templates/dashboard/message-blocks/wrappers/image.html',
    require: {
        manager: '^messageBlocks'
    },
    bindings: {
        messageBlock: '='
    },
    controller: function () {
    }
});
angular.module('dashboard').component('textWrapper', {
    templateUrl: '/templates/dashboard/message-blocks/wrappers/text.html',
    require: {
        manager: '^messageBlocks'
    },
    bindings: {
        messageBlock: '='
    },
    controller: function () {
    }
});
