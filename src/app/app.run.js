function AppRun(AppConstants, $rootScope, $transitions) {
    'ngInject';

    $transitions.onEnter({}, (transition, state) => {
        if (!state.abstract) {
            setPageTitle(state.title)
        }

        $rootScope.bodyClass = state.bodyClass;
        $rootScope.previousState = transition.from();

        //TODO: is this the right place for this?
        $('[pg-popover]').popover('destroy')
    });

    // Helper method for setting the page's title
    let setPageTitle = (title) => {
        $rootScope.pageTitle = '';
        if (title) {
            $rootScope.pageTitle += title;
            $rootScope.pageTitle += ' \u2014 ';
        }
        $rootScope.pageTitle += AppConstants.app.name;
    };
}

export default AppRun;
