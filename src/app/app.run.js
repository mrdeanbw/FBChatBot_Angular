function AppRun(AppConstants, $rootScope, $transitions) {
    'ngInject';

    $transitions.onEnter({}, (transition, state) => {
        setPageTitle(state.title)
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
