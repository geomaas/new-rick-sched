import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {
  Requests,
  UnEditedRequests,
  MonOne,
  MonTwo,
  TueOne,
  TueTwo,
  WedOne,
  WedTwo,
  ThuOne,
  ThuTwo,
  FriOne,
  FriTwo,
  SatOne,
  SatTwo,
  SunOne,
  SunTwo
} from '../../api/requests.js';

import template from './scheduleRequest.html';

class ScheduleRequestCtrl {
  constructor($scope, $state, $window) {
    $scope.viewModel(this);

    this.$state = $state;
    this.$window = $window;

    /*--------sets shift boxes to show all or one depending on screen size----------*/
    if (this.$window.outerWidth < 1024) {
      this.day = 1;
    } else {
      this.day = 8;
    }

    /*-----------------------------------*/
    this.company = 'rickshaw';
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
      monOne: () => {
        return MonOne.find({})
      },
      monTwo: () => {
        return MonTwo.find({})
      },

      tueOne: () => {
        return TueOne.find({})
      },
      tueTwo: () => {
        return TueTwo.find({})
      },

      wedOne: () => {
        return WedOne.find({})
      },
      wedTwo: () => {
        return WedTwo.find({})
      },

      thuOne: () => {
        return ThuOne.find({})
      },
      thuTwo: () => {
        return ThuTwo.find({})
      },

      friOne: () => {
        return FriOne.find({})
      },
      friTwo: () => {
        return FriTwo.find({})
      },

      satOne: () => {
        return SatOne.find({})
      },
      satTwo: () => {
        return SatTwo.find({})
      },

      sunOne: () => {
        return SunOne.find({})
      },
      sunTwo: () => {
        return SunTwo.find({})
      },

      requests: () => {
        return Requests.find({})
      },

      currentUser: () => {
        return Meteor.user();
      },
      allUsers: () => {
        return Meteor.users.find({});
      },
    });
  }
  strike(request, shift) {
    if (!request.striked && this.currentUser.profile.isAdmin) {
      Meteor.call('admin.strike', request, shift._name, true);
    } else {
      Meteor.call('admin.strike', request, shift._name, false)
    }
  }
  adminAddUserToAll() {
    // console.log('test selct function', this.adminUserChoice.username);
    Meteor.call('adminAddUserToAll.insert', this.adminUserChoice)
    this.adminUserChoice = "";

  }
  adminAddUser(shift) {
    // console.log('test selct function', shift, this.adminUserChoice.username);
    if (confirm('Add this user?')) {
      Meteor.call('admin.insert', shift._name, this.adminUserChoice)
      this.adminUserChoice = "";
    }
  }
  highlightUser(request) {
    if (request.username == Meteor.user().username) {
      return {
        'background-color': 'rgba(251,184,41, 1)'
      };
    }
    ////// highlightUser function might can possibly be removed 4/5 //////////////
  }
  logOutUser() {
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
    Meteor.call('shift.remove', request, shift._name);
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
  swapCompany() {
    this.company = this.company === 'rickshaw' ? 'pedicab' : 'rickshaw';
    Meteor.call('swapCompany', this.company);
  }

  /*-----------------------------------------------------------------------*/
  ////// Must reformat these two  functions for better security///////////
  /*-----------------------------------------------------------------------*/
  saveAllRequests(weekStart) {
    console.log("save all requests");
    let scheduleFinal = {
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
    };
    if (confirm('Are all requests submitted?')) {
      if (!UnEditedRequests.findOne({
          weekStart: moment(weekStart).format('l')
        })) {
        UnEditedRequests.insert(scheduleFinal);
        alert('Success in saving requests!')
        // Meteor.call('schedule.insert', weekStart, scheduleFinal)
      } else {
        alert("Schedule already submitted!")
      }
    }
  }

  finalizeSchedule(weekStart) {
    let scheduleFinal = {
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
    };
    // console.log('client side schedule test',moment(weekStart).format('l'), scheduleFinal);
    // console.log('--------------------------------');
    if (confirm('Are both Pedicab and Rickshaw requests ready to be finalized?')) {
      if (!Requests.findOne({
          weekStart: moment(weekStart).format('l')
        })) {
        Requests.insert(scheduleFinal);
        alert('Success in finalizing schedule')
        // Meteor.call('schedule.insert', weekStart, scheduleFinal)
      } else {
        alert("Schedule already submitted!")
      }
    }
  }
  /*-----------------------------------------------------------------------*/
  ///////////////////End of functions to reformat////////////////////////////
  /*-----------------------------------------------------------------------*/

  deleteAllRequests() {
    if (confirm("Are you sure you want to delete all requests?")) {
      if (confirm("Super sure?")) {
        Meteor.call('requests.remove');
      }
    }
  }
}

export default angular.module('scheduleRequest', [
    angularMeteor,
    uiRouter
  ])
  .component('scheduleRequest', {
    templateUrl: template,
    controller: ['$scope', '$state', '$window', ScheduleRequestCtrl]
  })
  .config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('scheduleRequest', {
      url: '/scheduleRequest',
      template: '<schedule-request></schedule-request>'
    });
}
