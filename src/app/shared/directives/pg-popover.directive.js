/* ============================================================
 * Directive: bsPopover
 * AngularJS directive for Bootstarp Tooltip
 * ============================================================ */

function pgPopover() {
    return {
        link: function (scope, element, attrs) {
            $(element).popover();
        }
    };
}

export default pgPopover;