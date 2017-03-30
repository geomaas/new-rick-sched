import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import utilsPagination from 'angular-utils-pagination';
import {
    Reservations
} from '../../api/requests.js';

import template from './reservations.html';

class ReservationsCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.hide = true;

        this.reservation = {};

        /*------------pagination params------------*/
        this.perPage = 5;
        this.page = 1;
        /*-----------------------------------*/

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
    pageChanged(newPage) {
      this.page = newPage;
    }
    logOutUser() {
        console.log('logging out');
        Meteor.logout();
    }
    toggle() {
        this.hide = this.hide === false ? true : false;
    }
    createReservation(reso) {
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
                resoNotes: reso.Notes,
                resoCompany: Meteor.user().profile.company,
            });
            /*-----clear out fields after sending reservation-----*/
            this.reservation.Name = '';
            this.reservation.Location = '';
            this.reservation.Number = '';
            this.reservation.Guests = '';
            this.reservation.Notes = '';
            this.reservation.Date = '';
            this.reservation.Time = '';
        }
    }
    
    deleteReservation(reso) {
        // Reservations.remove(reso._id);
        Meteor.call('reservation.remove', reso._id)
    }
}

export default angular.module('reservations', [
        angularMeteor,
        uiRouter,
        uiBootstrap,
        utilsPagination,
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
