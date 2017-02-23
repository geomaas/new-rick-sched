import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';


import template from './contactList.html';

class ContactListCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.helpers({
          users(){
            return Meteor.users.find({});
          }
        })
    }
}

export default angular.module('contactList', [
        angularMeteor,
        uiRouter
    ])
    .component('contactList', {
        templateUrl: 'imports/components/contactList/contactList.html',
        controller: ['$scope', ContactListCtrl]
    })
    .config(config);

function config($stateProvider, $urlRouterProvider) {
  // 'ngInject';
  $stateProvider
    .state('contactList', {
      url: '/contactList',
      template: '<contact-list></contact-list>'
    });
}
