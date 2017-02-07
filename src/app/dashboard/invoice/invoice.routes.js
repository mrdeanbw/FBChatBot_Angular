function SettingRoutes($stateProvider) {
    'ngInject';

    $stateProvider.state('app.dashboard.invoice.show', {
        url: '/invoices/:invoiceId',
        component: 'showInvoice',
        title: 'Invoice',
        resolve: {
            invoice: (Invoices, bot, $stateParams) => {
                'ngInject';
                return Invoices(bot.id).one($stateParams.invoiceId).get();
            }
        }
    });


}


export default SettingRoutes;
