import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Requests = new Mongo.Collection('requests');

export const MonOne = new Mongo.Collection('monOne');
export const MonTwo = new Mongo.Collection('montwo');

export const TueOne = new Mongo.Collection('tueOne');
export const TueTwo = new Mongo.Collection('tuetwo');

export const WedOne = new Mongo.Collection('wedOne');
export const WedTwo = new Mongo.Collection('wedtwo');

export const ThuOne = new Mongo.Collection('thuOne');
export const ThuTwo = new Mongo.Collection('thutwo');

export const FriOne = new Mongo.Collection('friOne');
export const FriTwo = new Mongo.Collection('fritwo');

export const SatOne = new Mongo.Collection('satOne');
export const SatTwo = new Mongo.Collection('sattwo');

export const SunOne = new Mongo.Collection('sunOne');
export const SunTwo = new Mongo.Collection('suntwo');


Meteor.methods({
  'shift.remove'(request, shift){
    check(request, String);
    check(shift, String);
    let upShift = function capitalizeFirstLetter(shift) {
    return shift.charAt(0).toUpperCase() + shift.slice(1);
}
    console.log(request, upShift(shift));
    upShift(shift).remove(request);

  },

})
