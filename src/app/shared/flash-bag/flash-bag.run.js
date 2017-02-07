function FlashBagRun($transitions, FlashBag, $timeout, toaster) {
    'ngInject';

    $transitions.onFinish({}, () => {
        let flashMessage = FlashBag.get();
        if (flashMessage == null) {
            return;
        }

        $timeout(function () {
            toaster.pop({
                type: flashMessage.type,
                title: flashMessage.title,
                body: flashMessage.text,
                timeout: flashMessage.duration
            });
        });
    });

}

export default FlashBagRun;
