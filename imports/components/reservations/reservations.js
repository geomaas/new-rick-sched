import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';


import template from './reservations.html';

class ReservationsCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.hide = true;

        this.helpers({
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
