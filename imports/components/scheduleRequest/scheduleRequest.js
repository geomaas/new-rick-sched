import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {Requests, MonOne, MonTwo, TueOne, TueTwo, WedOne, WedTwo, ThuOne, ThuTwo, FriOne, FriTwo, SatOne, SatTwo, SunOne, SunTwo} from '../../api/requests.js';

import template from './scheduleRequest.html';

class ScheduleRequestCtrl {
    constructor($scope, $state) {
        $scope.viewModel(this);

        this.$state = $state;

        this.day = 1;

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
    logOutUser(){
      console.log('logging out');
      Meteor.logout();
      this.$state.go("login");
    }
    addRequests(shift) {

      /*---------------- cleared out code is for client side operation and testing--------------*/

      // console.log('------------------------ client side add request call');
      // console.log(shift);
      //   if(!shift.findOne({username: Meteor.user().username})) {
      //   shift.insert({
      //       createdAt: new Date,
      //       owner: Meteor.userId(),
      //       username: Meteor.user().username
      //   });
      // }else{
      //   alert("already added that shift")
      // }
      Meteor.call('shift.insert', shift._name);
    }
    removeRequest(request, shift) {

      /*---------------- cleared out code is for client side operation and testing--------------*/

        // console.log('-------------------client call');
        // console.log(request, shift._name);
        // shift.remove(request._id);
        Meteor.call('shift.remove', request._id, shift._name);
    }

}

export default angular.module('scheduleRequest', [
        angularMeteor,
        uiRouter
    ])
    .component('scheduleRequest', {
        templateUrl: template,
        controller: ['$scope','$state', ScheduleRequestCtrl]
    })
    .config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('scheduleRequest', {
      url: '/scheduleRequest',
      template: '<schedule-request></schedule-request>'
    });
}
