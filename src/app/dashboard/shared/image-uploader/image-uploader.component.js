class ImageUploadController {
    constructor(Upload) {
        'ngInject';
        this._Upload = Upload;
    }

    changed() {
        this._Upload.base64DataUrl(this.file).then(data => {
            if (!this.file) {
                return;
            }

            let file = {
                name: this.file.name,
                type: this.file.type,
                encoded: data
            };

            this.imageUploadedCallback({file: file});
        });
    }
}

export default {
    templateUrl: 'dashboard/shared/image-uploader/image-uploader.html',
    bindings: {imageUploadedCallback: '&'},
    controller: ImageUploadController
};
