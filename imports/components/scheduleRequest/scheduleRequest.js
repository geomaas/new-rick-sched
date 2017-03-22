import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {Requests, MonOne, MonTwo, TueOne, TueTwo, WedOne, WedTwo, ThuOne, ThuTwo, FriOne, FriTwo, SatOne, SatTwo, SunOne, SunTwo} from '../../api/requests.js';

import template from './scheduleRequest.html';

class ScheduleRequestCtrl {
    constructor($scope, $state, $window) {
        $scope.viewModel(this);

        this.$state = $state;
        this.$window = $window;

        /*--------sets shift boxes to show all or one depending on screen size----------*/
        if(this.$window.outerWidth < 1024){
          this.day = 1;
        }else{
          this.day = 8;
        }
        /*-----------------------------------*/
        this.weekStart = new Date;
        /*-------shift name variables reference----------*/
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
          requests: Requests,
        }
        /*------------------------------*/

        this.helpers({
            monOne:()=>{return MonOne.find({})},
            monTwo:()=>{return MonTwo.find({})},

            tueOne:()=>{return TueOne.find({})},
            tueTwo:()=>{return TueTwo.find({})},

            wedOne:()=>{return WedOne.find({})},
            wedTwo:()=>{return WedTwo.find({})},

            thuOne:()=>{return ThuOne.find({})},
            thuTwo:()=>{return ThuTwo.find({})},

            friOne:()=>{return FriOne.find({})},
            friTwo:()=>{return FriTwo.find({})},

            satOne:()=>{return SatOne.find({})},
            satTwo:()=>{return SatTwo.find({})},

            sunOne:()=>{return SunOne.find({})},
            sunTwo:()=>{return SunTwo.find({})},

            requests:()=>{return Requests.find({})},

            currentUser:()=>{return Meteor.user();},
        });
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

    shiftUpdateThreeShift(request, shift) {
      // console.log("client side check update", request.checked, shift._name);
      // console.log("------------------------------------");
      // shift.update(request._id, {
      //   $set: {
      //     checked: !request.checked
      //   },
      // });
      Meteor.call('shift.update', request, shift._name);
    }

    finalizeSchedule(weekStart) {
      console.log(moment(weekStart).format('l'));
        if(!Requests.findOne({weekStart: moment(weekStart).format('l')})) {
          Requests.insert({
            createdAt: new Date,
            weekStart: moment(weekStart).format('l'),
            monOne: angular.copy(this.monOne),
            monTwo: angular.copy(this.monTwo),
            tueDate: moment(weekStart).add(1, 'days').format('l'),
            tueOne: angular.copy(this.tueOne),
            tueTwo: angular.copy(this.tueTwo),
            wedDate: moment(weekStart).add(2, 'days').format('l'),
            wedOne: angular.copy(this.wedOne),
            wedTwo: angular.copy(this.wedTwo),
            thuDate: moment(weekStart).add(3, 'days').format('l'),
            thuOne: angular.copy(this.thuOne),
            thuTwo: angular.copy(this.thuTwo),
            friDate: moment(weekStart).add(4, 'days').format('l'),
            friOne: angular.copy(this.friOne),
            friTwo: angular.copy(this.friTwo),
            satDate: moment(weekStart).add(5, 'days').format('l'),
            satOne: angular.copy(this.satOne),
            satTwo: angular.copy(this.satTwo),
            sunDate: moment(weekStart).add(6, 'days').format('l'),
            sunOne: angular.copy(this.sunOne),
            sunTwo: angular.copy(this.sunTwo),
          });
        }else {
          alert("Schedule already submitted!")
        }
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
