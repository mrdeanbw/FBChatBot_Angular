/* ============================================================
 * Directive: pgTab
 * Makes Bootstrap Tabs compatible with AngularJS and add sliding
 * effect for tab transitions. 
 * ============================================================ */
function pgTab($parse) {
    'ngInject';
    return {
        link: (scope, element, attrs) => {
            var slide = attrs.slide;
            var onShown = $parse(attrs.onShown);
            // Sliding effect for tabs
            $(element).on('show.bs.tab',
                (e) => {
                    e = $(e.target).parent().find('a[data-toggle=tab]');
                    var hrefCurrent = e.attr('href');
                    if ($(hrefCurrent).is('.slide-left, .slide-right')) {
                        $(hrefCurrent).addClass('sliding');
                        setTimeout(() => $(hrefCurrent).removeClass('sliding'), 100);
                    }
                }
            );

            $(element).on('shown.bs.tab', {
                onShown: onShown
            }, (e) => {
                if (e.data.onShown) {
                    e.data.onShown(scope);
                }
            });

            $(element).click((e) => {
                e.preventDefault();
                $(element).tab('show');
            });
        }
    };
}

export default pgTab;