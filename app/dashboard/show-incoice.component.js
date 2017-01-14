angular.module('dashboard').component('showInvoice', {

    templateUrl: "/templates/dashboard/invoices/show.html",

    bindings: {
        invoice: '<'
        
    },

    controller: function () {
        console.log(self.invoices);
    }

});
