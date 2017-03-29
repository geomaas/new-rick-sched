import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {
    Reservations
} from '../../api/requests.js';

import template from './reservations.html';

class ReservationsCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.hide = true;

        this.reservation = {};

        this.helpers({
            reservations: () => {
                return Reservations.find({}, {
                  sort: {
                    resoDate: -1
                  }
                });
            },
            users() {
                return Meteor.users.find({});
            },
            currentUser() {
                return Meteor.user();
            },
        })
    }
    logOutUser() {
        console.log('logging out');
        Meteor.logout();
    }
    toggle() {
        this.hide = this.hide === false ? true : false;
    }
    createReservation(reso) {
        console.log(reso);
        if (!Meteor.userId()) {
          alert('sign in to make a reservation')
        } else {
            Reservations.insert({
                createdAt: new Date,
                createdBy: Meteor.user().username,
                resoDate: moment(reso.Date).format('l'),
                resoTime: moment(reso.Time).format('LT'),
                resoName: reso.Name,
                resoLoc: reso.Location,
                resoNumber: reso.Number,
                resoGuests: reso.Guests,
                resoNotes: reso.Notes
            });

            this.reservation = '';
        }
    }
    deleteReservation(reso) {
        console.log(reso._id);
        Reservations.remove(reso._id);
    }
}

export default angular.module('reservations', [
        angularMeteor,
        uiRouter
    ])
    .component('reservations', {
        templateUrl: 'imports/components/reservations/reservations.html',
        controller: ['$scope', ReservationsCtrl]
    })
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    // 'ngInject';
    $stateProvider
        .state('reservations', {
            url: '/reservations',
            template: '<reservations></reservations>'
        });
}
