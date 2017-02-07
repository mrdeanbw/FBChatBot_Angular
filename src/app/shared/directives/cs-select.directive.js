/* ============================================================
 * Directive: csSelect
 * AngularJS directive for SelectFx jQuery plugin
 * https://github.com/codrops/SelectInspiration
 * ============================================================ */

function csSelect() {
    return {
        restrict: 'A',
        link: (scope, el, attrs) => {
            if (!window.SelectFx) return;
            el = $(el).get(0);
            $(el).wrap('<div class="cs-wrapper"></div>');
            new SelectFx(el);
        }
    }
}


export default csSelect;