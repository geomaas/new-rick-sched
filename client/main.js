import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import scheduleRequest from '../imports/components/scheduleRequest/scheduleRequest';
import login from '../imports/components/login/login.js';
import scheduleFinalized from '../imports/components/scheduleFinalized/scheduleFinalized';
import contactList from '../imports/components/contactList/contactList.js'
import reservations from '../imports/components/reservations/reservations.js'
// import '../imports/startup/accounts-config.js';
import {Requests, Reservations, MonOne, MonTwo, TueOne, TueTwo, WedOne, WedTwo, ThuOne, ThuTwo, FriOne, FriTwo, SatOne, SatTwo, SunOne, SunTwo} from '../imports/api/requests.js';

angular.module('schedule-app', [
  angularMeteor,
  uiRouter,
  scheduleRequest.name,
  login.name,
  scheduleFinalized.name,
  contactList.name,
  reservations.name,
]).config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/login');

})
