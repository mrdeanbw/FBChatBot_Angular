import angular from 'angular';

let invoiceModule = angular.module('app.dashboard.invoice', []);

import ShowInvoiceComponent from './show-incoice.component';
invoiceModule.component('showInvoice', ShowInvoiceComponent);

import InvoiceRoutes from './invoice.routes';
invoiceModule.config(InvoiceRoutes);

export default invoiceModule;