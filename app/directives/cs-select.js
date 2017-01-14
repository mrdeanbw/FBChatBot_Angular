/* ============================================================
 * Directive: csSelect
 * AngularJS directive for SelectFx jQuery plugin
 * https://github.com/codrops/SelectInspiration
 * ============================================================ */

window.directives = window.directives || [];

window.directives.push({
    name: 'csSelect',
    action: function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                if (!window.SelectFx) return;

                var el = $(el).get(0);
                $(el).wrap('<div class="cs-wrapper"></div>');
                new SelectFx(el);

            }
        }
    }
});
