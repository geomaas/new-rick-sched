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
export const UnEditedRequests = new Mongo.Collection('unEditedRequests');
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
/*-------------------------------------------*/

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
                striked: false,
            });
            // this increments number of shifts by one for the admin to have total count of shifts
            Meteor.users.update({_id: Meteor.userId()},{$inc: {'profile.numOfShifts': 1}});
        } else {
            alert("already added that shift!")
        }
    },
    /*-------------------------------------------------------*/
    'shift.remove' (request, shift) {
        check(request, Object);
        check(shift, String);

        Collections[shift].remove(request._id);

        // this decrements number of shifts by one for the admin to have total count of shifts
        Meteor.users.update({username: request.username},{$inc: {'profile.numOfShifts': -1}});

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
    'requests.remove' () {
        // console.log('server side delete all requests');
        // console.log('-------------------------------');
        Object.entries(Collections).forEach(([key, value]) => {
            value.remove({});
        });
        //resets shift count to zero on deleting all requests
        Meteor.users.update({},{$set: {'profile.numOfShifts': 0}},{multi: true});

    },
    /*------------------------not called from client yet-------------------------------*/

    // 'schedule.insert' (weekStart, scheduleFinal) {
    //     // check(scheduleFinal, Object);
    //     if (!Requests.findOne({
    //             weekStart: moment(weekStart).format('l')
    //         })) {
    //         console.log('server side check of finalized schedule object', weekStart, schedulefinal);
    //         console.log('------------------------------------');
    //         // Requests.insert(scheduleFinal);
    //     }
    // },

    /*-------------------------------------------------------*/
    'admin.insert' (shift, adminUserChoice) {
        check(shift, String);
        // console.log('server test admin user add', adminUserChoice);
        // console.log('--------------------------');
        if (!Meteor.userId()) {
            // throw new Meteor.Error('Sign in to add shift');
            alert('sign in to make a request')
        } else if (!Collections[shift].findOne({
                username: adminUserChoice.username
            })) {

            let requestCount = Collections[shift].find().count();
            let order = requestCount + 1;

            Collections[shift].insert({
                createdAt: new Date,
                owner: adminUserChoice._id,
                username: adminUserChoice.username,
                company: adminUserChoice.profile.company,
                order: order,
                checked: false,
                striked: false,
            });
            // this decrements number of shifts by one for the admin to have total count of shifts
            Meteor.users.update({username: adminUserChoice.username},{$inc: {'profile.numOfShifts': 1}});
        } else {
            alert("already added that shift!")
        }
    },
    /*-------------------------------------------------------*/
    'adminAddUserToAll.insert' (adminUserChoice) {
      check(adminUserChoice, Object);

      // console.log('server side add user to all days', adminUserChoice);
      // console.log('-------------------------------');


      Object.entries(Collections).forEach(([key, value]) => {
          value.insert({
            createdAt: new Date,
            owner: adminUserChoice._id,
            username: adminUserChoice.username,
            company: adminUserChoice.profile.company,
            order: 0,
            checked: false,
            striked: false,
          });
      });
      //sets shift count to 14 when added to all shifts
      Meteor.users.update({username: adminUserChoice.username},{$set: {'profile.numOfShifts': 14}});
    },
    /*-------------------------------------------------------*/
    'admin.update' (week, shift, adminUserChoice) {
        check(week, String);
        check(shift, String);
        check(adminUserChoice, Object);
        // console.log('server side admin update', );
        // console.log('------------------------');
        let requestCount = Collections[shift].find().count();
        let order = requestCount + 1;
        Requests.update(week, {
            $push: {
                [shift]: {
                    createdAt: new Date,
                    owner: adminUserChoice._id,
                    username: adminUserChoice.username,
                    company: adminUserChoice.profile.company,
                    order: order,
                    checked: false,
                    striked: false,
                }
            }
        });
    },
    /*-------------------------------------------------------*/
    'admin.update3' (week, shift, adminUserChoice) {
        check(week, String);
        check(shift, String);
        check(adminUserChoice, Object);
        // console.log('server side admin update', );
        // console.log('------------------------');
        let requestCount = Collections[shift].find().count();
        let order = requestCount + 1;
        Requests.update(week, {
            $push: {
                [shift]: {
                    createdAt: new Date,
                    owner: adminUserChoice._id,
                    username: adminUserChoice.username,
                    company: adminUserChoice.profile.company,
                    order: order,
                    checked: true,
                    striked: false,
                }
            }
        });
    },
    /*-------------------------------------------------------*/
    'admin.strike' (request, shift, change) {

      Collections[shift].update(request._id, {
          $set: {
              striked: change,
          },
      });
    },
    /*-------------------------------------------------------*/
    'admin.remove' (week, shift, day) {
        // console.log('server side test', shift);
        // console.log('---------------');
        Requests.update(week, {
            $pull: {
                [shift]: {
                    'owner': day.owner
                }
            }
        });
    },
    /*-------------------------------------------------------*/
    'user.remove' (id) {
        check(id, String);
        Meteor.users.remove(id);
    },
    /*-------------------------------------------------------*/
    'reservation.remove' (reso) {
        check(reso, String);
        Reservations.remove(reso);
    },
    /*-------------------------------------------------------*/
    'swapCompany' (company) {
      check(company, String);
      Meteor.users.update({_id: Meteor.userId()},{$set: {'profile.company': company}});
    },
    /*-------------------------------------------------------*/

})
