import {
    Meteor
} from 'meteor/meteor';
import {
    Mongo
} from 'meteor/mongo';
import {
    check
} from 'meteor/check';
// import SimpleSchema from 'simpl-schema';
// import RequestSchema  from './requestSchema.js';

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

export const Requests = new Mongo.Collection('requests');
export const Reservations = new Mongo.Collection('reservations');

// Requests.attachSchema(RequestSchema);

/*---name variables for shift insert call----*/
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
/*-------------------------------------------*/
Meteor.users.deny({
  update: function() {
    return true;
  }
});
Meteor.methods({
    /*-------------------------------------------------------*/
    'shift.insert' (shift) {
        check(shift, String);

        if (!Meteor.userId()) {
            // throw new Meteor.Error('Sign in to add shift');
            alert('sign in to make a request')
        } else if (!Collections[shift].findOne({
                username: Meteor.user().username
            })) {

            let requestCount = Collections[shift].find().count();
            let order = requestCount + 1;

            Collections[shift].insert({
                createdAt: new Date,
                owner: Meteor.userId(),
                username: Meteor.user().username,
                company: Meteor.user().profile.company,
                order: order,
                checked: false,
            });
        } else {
            alert("already added that shift!")
        }
    },
    /*-------------------------------------------------------*/
    'shift.remove' (request, shift) {
        check(request, String);
        check(shift, String);

        Collections[shift].remove(request);
    },
    /*-------------------------------------------------------*/
    'shift.update' (request, shift) {
        check(request.checked, Boolean);
        check(request._id, String);
        check(shift, String);
        // console.log('server side check update', request.checked, shift);
        // console.log('-------------------------------------');
        Collections[shift].update(request._id, {
            $set: {
                checked: !request.checked
            },
        });
    },
    /*-------------------------------------------------------*/
    'schedule.insert' (weekStart, scheduleFinal) {
      // check(scheduleFinal, Object);
      if (!Requests.findOne({
              weekStart: moment(weekStart).format('l')
          })) {
            console.log('server side check of finalized schedule object', weekStart, schedulefinal);
            console.log('------------------------------------');
          // Requests.insert(scheduleFinal);
        }
    },
    /*-------------------------------------------------------*/
    'user.remove' (id) {
        check(id, String);
        Meteor.users.remove(id);

    }
    /*-------------------------------------------------------*/

})
