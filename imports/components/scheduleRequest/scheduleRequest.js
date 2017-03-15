import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
// import Sortable from 'angular-legacy-sortablejs';

import {Requests, MonOne, MonTwo, TueOne, TueTwo, WedOne, WedTwo, ThuOne, ThuTwo, FriOne, FriTwo, SatOne, SatTwo, SunOne, SunTwo} from '../../api/requests.js';

import template from './scheduleRequest.html';

class ScheduleRequestCtrl {
    constructor($scope, $state, $window) {
        $scope.viewModel(this);

        this.$state = $state;
        this.$window = $window;

        /*--------sets shift boxes to show all or one depending on screen size----------*/
        if(this.$window.outerWidth < 768){
          this.day = 1;
        }else{
          this.day = 8;
        }
        /*-----------------------------------*/

        // this.threeShift = false;

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
            monOne:()=>{return MonOne.find({}, {sort: {order: 1}});},
            monTwo:()=>{return MonTwo.find({}, {sort: {order: 1}});},

            tueOne:()=>{return TueOne.find({}, {sort: {order: 1}});},
            tueTwo:()=>{return TueTwo.find({}, {sort: {order: 1}});},

            wedOne:()=>{return WedOne.find({}, {sort: {order: 1}});},
            wedTwo:()=>{return WedTwo.find({}, {sort: {order: 1}});},

            thuOne:()=>{return ThuOne.find({}, {sort: {order: 1}});},
            thuTwo:()=>{return ThuTwo.find({}, {sort: {order: 1}});},

            friOne:()=>{return FriOne.find({}, {sort: {order: 1}});},
            friTwo:()=>{return FriTwo.find({}, {sort: {order: 1}});},

            satOne:()=>{return SatOne.find({}, {sort: {order: 1}});},
            satTwo:()=>{return SatTwo.find({}, {sort: {order: 1}});},

            sunOne:()=>{return SunOne.find({}, {sort: {order: 1}});},
            sunTwo:()=>{return SunTwo.find({}, {sort: {order: 1}});},

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
    addRequests(shift, threeShift) {
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

    shiftUpdate(shift, threeShift) {
      console.log("check", this.threeShift);
      // shift.update(request._id, {
      //   $set: {
      //     threeShift: threeShift,
      //   }
      // })
    }
}

export default angular.module('scheduleRequest', [
        angularMeteor,
        uiRouter
    ])
    .component('scheduleRequest', {
        templateUrl: template,
        controller: ['$scope','$state','$window', ScheduleRequestCtrl]
    })
    .config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('scheduleRequest', {
      url: '/scheduleRequest',
      template: '<schedule-request></schedule-request>'
    });
}
