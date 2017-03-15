/* ============================================================
 * Directive: csSelect
 * AngularJS directive for SelectFx jQuery plugin
 * https://github.com/codrops/SelectInspiration
 * ============================================================ */

function csSelect($timeout) {
    'ngInject';
    
    return {
        restrict: 'A',
        link: (scope, el, attrs) => {
            if (!window.SelectFx) return;
            el = $(el).get(0);
            $(el).wrap('<div class="cs-wrapper"></div>');
            $timeout(function () {
                new SelectFx(el);
            }, 100);
        }
    }
}


export default csSelect;