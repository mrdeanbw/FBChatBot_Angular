window.directives = window.directives || [];

/* ============================================================
 * Directive: bsTooltip
 * AngularJS directive for Bootstarp Tooltip
 * ============================================================ */


window.directives.push({
    name: 'bsTooltip',
    action: ['$parse', function ($parse) {
        return {
            link: function (scope, element, attrs) {
                $(element).tooltip();
            }
        };
    }]
});

/* ============================================================
 * Directive: bsPopover
 * AngularJS directive for Bootstarp Tooltip
 * ============================================================ */

window.directives.push({
    name: 'bsPopover',
    action: ['$parse', function ($parse) {
        return {
            link: function (scope, element, attrs) {
                $(element).popover();
            }
        };
    }]
});