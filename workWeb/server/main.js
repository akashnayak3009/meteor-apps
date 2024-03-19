import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { approveRequest, cancelRequest, create, declineRequest, findById, test } from '/imports/api/time-offs/methods';
import { TimeOffCollection } from '/imports/api/time-offs/collection';


const seed_username ="akash@meteor.com";
const seed_password ="password";


Meteor.startup(async () => {
  const user = Accounts.findUserByEmail(seed_username);


  if(!user){
    console.log("Registrating initial user")
   await Accounts.createUserAsync({
    email: seed_username,
    password: seed_password,
    // @ts-ignore
    profile: {name: "Akash Nayak", isManager: true }
   })
  }

  Meteor.methods({
    'TimeOff.create': create,
    'TimeOff.cancel': cancelRequest,
    'TimeOff.approve': approveRequest,
    'TimeOff.decline': declineRequest,
    'TimeOff.find': findById,
    'Test.api': test
})

Meteor.publish('myManagedTimeOffs', function publishTimeOffs() {
  return TimeOffCollection.find({ managerUserId: Meteor.userId(), status: 'Pending' });
});

Meteor.publish('myTimeOffs', function publishMyTimeOffs() {
  return TimeOffCollection.find({ requesterUserId: Meteor.userId });
});

Meteor.publish('allTimeoffs', function publishAllTimeOffs() {
  return TimeOffCollection.find({status: 'Pending' });
});

});
