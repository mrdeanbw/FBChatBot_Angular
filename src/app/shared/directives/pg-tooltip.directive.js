/* ============================================================
 * Directive: pgTooltip
 * AngularJS directive for Bootstarp Tooltip
 * ============================================================ */


function pgTooltip() {
    return {
        link: function (scope, element, attrs) {
            let $element = $(element);
            $element.tooltip();
            if (attrs.hideOnClick == "true") {
                $element.on('click', ()=> $element.tooltip('hide'));
            }
        }
    };
}

export default pgTooltip;