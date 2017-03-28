import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import { Requests } from '../../api/requests.js';

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
                return Requests.find({}, {sort: {weekStart: -1}})
            },
            currentUser() {
                return Meteor.user();
            },

        })
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
