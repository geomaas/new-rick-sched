import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Accounts } from 'meteor/accounts-base'
//
import template from './login.html';

class LoginCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.signup = {

        }
    }
    signupUser(user) {
      console.log(user);
      Accounts.createUser({
        username: user.username,
        email: user.email,
        password: user.password,
        profile:{
          company: user.company,
          phone: user.number,
          avg: 1,
          createdAt: new Date
        }
      }, function(err){
        if(err){
          alert("you messed up")
          console.log(err);
        }else{
          alert('succes on user creation!')
        }
      });
    }

    loginUser(username, password){
      console.log(username, password);
      Meteor.loginWithPassword(username, password, function(err){
        if(err){
          console.log(err);
        }else {
          alert("signed in")
          $state.go('/scheduleRequest')
        }
      });
    }
    currentUser(){
      return Meteor.user();
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
