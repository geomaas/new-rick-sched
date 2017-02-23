import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
//
import template from './login.html';

class LoginCtrl {
    constructor($scope) {
        $scope.viewModel(this);


    }
}

export default angular.module('login', [
        angularMeteor,
        uiRouter

    ])
    .component('login', {
        templateUrl: 'imports/components/login/login.html',
        controller: ['$scope', LoginCtrl]
    })
    .config(config);

function config($stateProvider, $urlRouterProvider) {
  // 'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login></login>'
    });
}
