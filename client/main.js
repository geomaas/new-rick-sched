import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import scheduleRequest from '../imports/components/scheduleRequest/scheduleRequest.js';
import login from '../imports/components/login/login.js';
import contactList from '../imports/components/contactList/contactList.js'
import '../imports/startup/accounts-config.js';
import {Requests, MonOne, MonTwo, TueOne, TueTwo, WedOne, WedTwo, ThuOne, ThuTwo, FriOne, FriTwo, SatOne, SatTwo, SunOne, SunTwo} from '../imports/api/requests.js';

angular.module('schedule-app', [
  angularMeteor,
  uiRouter,
  scheduleRequest.name,
  login.name,
  contactList.name,
  'accounts.ui'
]).config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/login');

})
