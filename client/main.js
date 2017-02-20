import angular from 'angular';
import angularMeteor from 'angular-meteor';
import scheduleRequest from '../imports/components/scheduleRequest/scheduleRequest.js';
import '../imports/startup/accounts-config.js';
import {Requests, MonOne, MonTwo, TueOne, TueTwo, WedOne, WedTwo, ThuOne, ThuTwo, FriOne, FriTwo, SatOne, SatTwo, SunOne, SunTwo} from '../imports/api/requests.js';

angular.module('schedule-app', [
  angularMeteor,
  scheduleRequest.name,
  'accounts.ui'
]);
