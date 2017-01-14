angular.module('dashboard').component('imageUploader', {
    templateUrl: '/templates/dashboard/message-blocks/image-uploader.html',
    bindings: {
        file: '=?',
        fileError: '=?',
        messageBlock: '='
    },
    controller: function (Upload) {
        var self = this;
        self.changed = function () {
            if (self.file) {
                Upload.base64DataUrl(self.file).then(function (url) {
                    self.messageBlock.image_url = url;
                });
            }
        }
    }
});
