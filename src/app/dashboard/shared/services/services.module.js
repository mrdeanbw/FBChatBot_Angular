import angular from 'angular';

let commonServices = angular.module('app.dashboard.shared.services', []);

import Tags from './tag.service'
commonServices.service('Tags', Tags);

import Sequences from './sequence.service';
commonServices.service('Sequences', Sequences);

import MessagePreviews from './message-previews.service';
commonServices.service('MessagePreviews', MessagePreviews);

export default commonServices;