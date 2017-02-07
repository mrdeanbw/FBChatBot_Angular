/* ============================================================
 * Directive: includeReplace
 * http://stackoverflow.com/a/20912566
 * ============================================================ */

function includeReplace() {
    return {
        require: 'ngInclude',
        restrict: 'A',
        link: function (scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
}


export default includeReplace;