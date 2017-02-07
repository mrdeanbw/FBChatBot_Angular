/* ============================================================
 * Directive: pgPortlet
 * AngularJS directive for Pages Portlets jQuery plugin
 * ============================================================ */

function pgPortlet($parse) {
    'ngInject';
    return {
        restrict: 'A',
        scope: true,
        link: (scope, element, attrs) => {
            var options = {};

            var onRefresh = $parse(attrs.onRefresh);

            if (attrs.progress) options.progress = attrs.progress;
            if (attrs.overlayOpacity) options.overlayOpacity = attrs.overlayOpacity;
            if (attrs.overlayColor) options.overlayColor = attrs.overlayColor;
            if (attrs.progressColor) options.progressColor = attrs.progressColor;
            if (attrs.onRefresh) options.onRefresh = function () {
                onRefresh(scope);
            };

            element.portlet(options);
        }
    }
}

export default pgPortlet;