import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import { Requests, Reservations } from '../../api/requests.js';

import template from './scheduleFinalized.html';

class ScheduleFinalizedCtrl {
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
        /*-----------------pagination params------------------*/
        this.perPage = 1;
        this.page = 1;
        /*-----------------------------------*/

        this.helpers({
            requests: () => {
              console.log(Requests);
                return Requests.find({}, {sort: {weekStart: -1}})
            },
            reservations: () => {
                return Reservations.find({}, {
                    sort: {
                        resoDate: -1
                    }
                });
            },
            currentUser() {
                return Meteor.user();
            },
            allUsers: () => {
                return Meteor.users.find({});
            },
        })
    }
    removeFromSchedule(week, shift, day) {
      // console.log(shift);
      Meteor.call('admin.remove', week._id, shift, day);
    }
    adminUpdateUser(week, shift) {
      if (confirm('Is this rider going on the 3 shift?')) {
        Meteor.call('admin.update3',week._id, shift, this.adminUserChoice);
      }else {
        Meteor.call('admin.update',week._id, shift, this.adminUserChoice);
      }
      this.adminUserChoice = "";
    }
    pageChanged(newPage) {
      this.page = newPage;
    }

    logOutUser() {
        console.log('logging out');
        Meteor.logout();
        this.$state.go("login");
    }

    deleteSchedule(id) {
      if (confirm("Are you sure?")) {
        console.log('deleted schedule');
        Requests.remove(id);
      }
    }
    deleteReservation(reso) {
        // Reservations.remove(reso._id);
        Meteor.call('reservation.remove', reso._id)
    }
}

export default angular.module('scheduleFinalized', [
        angularMeteor,
        uiRouter,
        utilsPagination,

    ])
    .component('scheduleFinalized', {
        templateUrl: template,
        controller: ['$scope', '$state', '$window', ScheduleFinalizedCtrl]
    })
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('scheduleFinalized', {
            url: '/scheduleFinalized',
            template: '<schedule-finalized></schedule-finalized>'
        });
}
