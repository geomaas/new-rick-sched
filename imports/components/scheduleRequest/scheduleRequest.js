import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {Requests, MonOne, MonTwo, TueOne, TueTwo, WedOne, WedTwo, ThuOne, ThuTwo, FriOne, FriTwo, SatOne, SatTwo, SunOne, SunTwo} from '../../api/requests.js';

import template from './scheduleRequest.html';

class ScheduleRequestCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.shifts = {
          monOne: MonOne,
          monTwo: MonTwo,
          tueOne: TueOne,
          tueTwo: TueTwo,
          wedOne: WedOne,
          wedTwo: WedTwo,
          thuOne: ThuOne,
          thuTwo: ThuTwo,
          friOne: FriOne,
          friTwo: FriTwo,
          satOne: SatOne,
          satTwo: SatTwo,
          sunOne: SunOne,
          sunTwo: SunTwo,
        }

        this.helpers({
            monOne:()=>{return MonOne.find({});},
            monTwo:()=>{return MonTwo.find({});},

            tueOne:()=>{return TueOne.find({});},
            tueTwo:()=>{return TueTwo.find({});},

            wedOne:()=>{return WedOne.find({});},
            wedTwo:()=>{return WedTwo.find({});},

            thuOne:()=>{return ThuOne.find({});},
            thuTwo:()=>{return ThuTwo.find({});},

            friOne:()=>{return FriOne.find({});},
            friTwo:()=>{return FriTwo.find({});},

            satOne:()=>{return SatOne.find({});},
            satTwo:()=>{return SatTwo.find({});},

            sunOne:()=>{return SunOne.find({});},
            sunTwo:()=>{return SunTwo.find({});},

            requests() {
                return Requests.find({});
            },
            currentUser() {
                return Meteor.user();
            },

        })
    }
    addRequests(shift) {
        // console.log(shift, 'add request clicked');
        shift.insert({
            createdAt: new Date,
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    }
    removeRequest(request, shift) {
        // console.log(request,'delete');
        shift.remove(request._id);
    }
}

export default angular.module('scheduleRequest', [
        angularMeteor,
        uiRouter
    ])
    .component('scheduleRequest', {
        templateUrl: template,
        controller: ['$scope', ScheduleRequestCtrl]
    })
    .config(config);

function config($stateProvider, $urlRouterProvider) {
  // 'ngInject';
  $stateProvider
    .state('scheduleRequest', {
      url: '/scheduleRequest',
      template: '<schedule-request></schedule-request>'
    });
}
