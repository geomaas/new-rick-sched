import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import scheduleRequest from '../imports/components/scheduleRequest/scheduleRequest.js';
// import login from '../imports/components/login/login.js';
import '../imports/startup/accounts-config.js';
import {Requests, MonOne, MonTwo, TueOne, TueTwo, WedOne, WedTwo, ThuOne, ThuTwo, FriOne, FriTwo, SatOne, SatTwo, SunOne, SunTwo} from '../imports/api/requests.js';

angular.module('schedule-app', [
  angularMeteor,
  uiRouter,
  scheduleRequest.name,
  // login.name,
  'accounts.ui'
]);
