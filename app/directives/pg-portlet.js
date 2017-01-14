/* ============================================================
 * Directive: pgPortlet
 * AngularJS directive for Pages Portlets jQuery plugin
 * ============================================================ */

window.directives = window.directives || [];
window.directives.push({
    name: 'pgPortlet',
    action: ['$parse', function ($parse) {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs) {

                var onRefresh = $parse(attrs.onRefresh);

                var options = {};

                if (attrs.progress) options.progress = attrs.progress;
                if (attrs.overlayOpacity) options.overlayOpacity = attrs.overlayOpacity;
                if (attrs.overlayColor) options.overlayColor = attrs.overlayColor;
                if (attrs.progressColor) options.progressColor = attrs.progressColor;
                if (attrs.onRefresh) options.onRefresh = function () {
                    onRefresh(scope);
                };

                element.portlet(options);

                element.portlet({
                    refresh: true
                });

                scope.maximize = function () {
                    element.portlet('maximize');
                };

                scope.refresh = function () {
                    element.portlet({
                        refresh: true
                    });
                };

                scope.close = function () {
                    element.portlet('close');
                };

                scope.collapse = function () {
                    element.portlet('collapse');
                }
            }
        }
    }]
});
