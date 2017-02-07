class ImageController {
    imageChanged(file) {
        this.message.file = file;
    }
}

export default{
    templateUrl: 'dashboard/shared/message/image/image-message.html',
    bindings: {message: '<'},
    controller: ImageController
}
