function ErrorHandlerRun(Pusher, toaster, $rootScope, $state) {
    "ngInject";

    let previousUserId;

    $rootScope.$on('user:changed', (event, user) => {
        if (!user && previousUserId) {
            previousUserId = null;
            Pusher.unsubscribe(`${previousUserId}_notifications`);
            return;
        }

        if (user && user.id != previousUserId) {
            previousUserId = user.id;
            Pusher.subscribe(`${previousUserId}_notifications`, 'error',
                data => {
                    toaster.pop('error', data.title || "Error!", data.message);
                    if (data.type == 'unauthorized') {
                        $state.go('app.permissions');
                    }
                }
            );
        }
    });
}

export default ErrorHandlerRun;