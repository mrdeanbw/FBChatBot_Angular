/* ============================================================
 * Directive: bsPopover
 * AngularJS directive for Bootstarp Tooltip
 * ============================================================ */

function pgPopover() {
    return {
        link: function (scope, element, attrs) {
            $(element).popover();
            $(element).on('click', function (e) {
                $('[pg-popover]').not(this).popover('hide');
            });
        }
    };
}

export default pgPopover;