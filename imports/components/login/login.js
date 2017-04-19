import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import {
    Accounts
} from 'meteor/accounts-base'

import template from './login.html';

class LoginCtrl {
    constructor($scope, $state) {
        'ngInject';
        $scope.viewModel(this);

        this.$state = $state;

        this.hide = true;

        this.signup = {};

        this.helpers({
            currentUser:()=>{return Meteor.user();}
        });
    }

    signupUser(user) {
      that = this;
        if (user.password != user.passwordTwo) {
            alert('Passwords do not match!')
            console.log(user.company);
        }else if(user.email == undefined || user.phone == undefined || user.company == undefined){
          alert('must enter email, phone number and company');
      } else {
            Accounts.createUser({
                username: user.username,
                password: user.password,
                profile: {
                    isAdmin: false,
                    company: user.company,
                    phone: user.phone,
                    email: user.email,
                    avg: 1,
                    createdAt: new Date,
                    numOfShifts: 0,
                }
            }, function(err) {
                if (err) {
                    alert("you messed up")
                    // console.log(err)
                } else {
                    alert('success on user creation!');
                    that.loginUser(user.username, user.password);
                }
            });
        }
    }

    loginUser(username, password) {
        // console.log(username, password);
        that = this;
        Meteor.loginWithPassword(username, password, function(err) {
            if (err) {
                console.log(err);
            } else {
                alert("signed in");
                that.$state.go("scheduleRequest");
            }
        });
    }

    logOutUser() {
        console.log('logging out');
        Meteor.logout();
    }

    toggle() {
        this.hide = this.hide === false ? true : false;
    }

}

/*----------------export angular controller and set state below---------------------*/

export default angular.module('login', [
        angularMeteor,
        uiRouter,
        uiBootstrap,
    ])
    .component('login', {
        templateUrl: template,
        controller: ['$scope', '$state', LoginCtrl]
    })
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    'ngInject';
    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>'
        });
}
