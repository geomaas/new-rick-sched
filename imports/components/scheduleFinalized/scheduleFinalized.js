import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Requests } from '../../api/requests.js';

import template from './scheduleFinalized.html';

class ScheduleFinalizedCtrl {
    constructor($scope, $state, $window) {
        $scope.viewModel(this);

        this.$state = $state;
        this.$window = $window;

        /*--------sets shift boxes to show all or one depending on screen size----------*/
        if (this.$window.outerWidth < 768) {
            this.day = 1;
        } else {
            this.day = 8;
        }
        /*-----------------------------------*/


        this.helpers({
            requests: () => {
                return Requests.find({})
            },
            currentUser() {
                return Meteor.user();
            },

        })
    }
    logOutUser() {
        console.log('logging out');
        Meteor.logout();
        this.$state.go("login");
    }

    deleteSchedule() {
        console.log('delete schedule');
        Requests.remove("hrqeib8F6gxMhJx5N");
    }
}

export default angular.module('scheduleFinalized', [
        angularMeteor,
        uiRouter
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