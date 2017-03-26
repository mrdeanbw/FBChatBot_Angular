class CardContainerController {
    constructor(MessageHelpers, $timeout, $filter) {
        'ngInject';
        this._MessageHelpers = MessageHelpers;

        this.MAX_CARDS = 10;

        /**
         * @todo Move out of controller (directive?)
         */
        this._$filter = $filter;
        this._$timeout = $timeout;
    }

    addCard() {
        this._MessageHelpers.addMessage(this.message.cards, {
            type: 'card',
            title: '',
            subtitle: '',
            url: '',
            image_url: '',
            buttons: []
        });

        this._goToCard(this.message.cards.length - 1);
    }

    canMoveNext(card) {
        return this._MessageHelpers.canMoveNext(this.message.cards, card);
    }

    moveNext(card) {
        this._MessageHelpers.moveNext(this.message.cards, card);
        let newIndex = this.message.cards.indexOf(card);
        this._goToCard(newIndex);
    }

    canMovePrevious(card) {
        return this._MessageHelpers.canMovePrevious(this.message.cards, card);
    }

    movePrevious(card) {
        let oldIndex = this.message.cards.indexOf(card);
        this._MessageHelpers.movePrevious(this.message.cards, card);
        this._goToCard(oldIndex);
    }

    removable(card) {
        return this._MessageHelpers.removable(this.message.cards, card);
    }

    openDeleteModal(card) {
        return this._MessageHelpers.openDeleteModal(this.message.cards, card);
    };

    /**
     * @todo Implement a directive, and move out this logic to it.
     */
    _goToCard(index){
        this._$timeout(() => {
            let hashkey = this._$filter('normalizedHashkey')(this.message.$$hashKey);
            angular.element('#carousel_' + hashkey).carousel(index)
        });
    }
}

export default{
    templateUrl: 'dashboard/shared/message/card/card-container-message.html',
    bindings: {message: '<'},
    controller: CardContainerController
}
