import {
    Meteor
} from 'meteor/meteor';
import {
    Mongo
} from 'meteor/mongo';
import {
    check
} from 'meteor/check';


export const Requests = new Mongo.Collection('requests');

export const MonOne = new Mongo.Collection('monOne');
export const MonTwo = new Mongo.Collection('monTwo');

export const TueOne = new Mongo.Collection('tueOne');
export const TueTwo = new Mongo.Collection('tueTwo');

export const WedOne = new Mongo.Collection('wedOne');
export const WedTwo = new Mongo.Collection('wedTwo');

export const ThuOne = new Mongo.Collection('thuOne');
export const ThuTwo = new Mongo.Collection('thuTwo');

export const FriOne = new Mongo.Collection('friOne');
export const FriTwo = new Mongo.Collection('friTwo');

export const SatOne = new Mongo.Collection('satOne');
export const SatTwo = new Mongo.Collection('satTwo');

export const SunOne = new Mongo.Collection('sunOne');
export const SunTwo = new Mongo.Collection('sunTwo');

const Collections = {
    'monOne': MonOne,
    'monTwo': MonTwo,
    'tueOne': TueOne,
    'tueTwo': TueTwo,
    'wedOne': WedOne,
    'wedTwo': WedTwo,
    'thuOne': ThuOne,
    'thuTwo': ThuTwo,
    'friOne': FriOne,
    'friTwo': FriTwo,
    'satOne': SatOne,
    'satTwo': SatTwo,
    'sunOne': SunOne,
    'sunTwo': SunTwo,
}

Meteor.methods({
    'shift.insert' (shift) {
        check(shift, String);
        // console.log('----------------------- shift insert server call');
        // console.log(shift);
        if (!Meteor.userId()) {
            // throw new Meteor.Error('Sign in to add shift');
            alert('sign in to make a request')
        } else if (!Collections[shift].findOne({
                username: Meteor.user().username
            })) {
            Collections[shift].insert({
                createdAt: new Date,
                owner: Meteor.userId(),
                username: Meteor.user().username,
                company: Meteor.user().profile.company,
            });
        }else {
          alert("already added that shift")
        }
    },
    'shift.remove' (request, shift) {
        check(request, String);
        check(shift, String);
        // console.log('------------------server call of remove shift');
        // console.log(request, shift, Collections[shift]);
        Collections[shift].remove(request);

    },

})
