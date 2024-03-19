import { Meteor } from 'meteor/meteor'
import { TimeOffCollection } from "./collection";
import { check } from 'meteor/check';


export async function create({type, duration, startDate, endDate, details}){
  console.log("TimeOff.create method called with:", { type, duration, startDate, endDate, details });
  // Method implementation
    check(type, String);
    check(duration, String);
    check(startDate, Date);
    check(endDate, Date);
    check(details, String);

    const manager = Meteor.users.findOne({'profile.isManager': true});
    const requester = Meteor.user();
    const timeOff = {
        type,
        duration,
        startDate,
        endDate,
        details,
        requesterName: requester?.profile?.name,
        requesterUserId: requester._id,
        managerName: manager.profile.name,
        managerUserId: manager._id,
        status: 'Pending'
      }

    return TimeOffCollection.insertAsync(timeOff);
}

export async function cancelRequest({_id}){
    check(_id, String);

    const timeoff = await TimeOffCollection.findOneAsync(_id);
    if(timeoff.status !== 'Pending'){
      throw new Meteor.Error('not-authorized', 'You can only cancel pending requests');    
    }
    const isRequester = timeoff.requesterUserId === Meteor.userId();
    if(!isRequester) {
      throw new Meteor.Error('not-authorized', 'You are not allowed to cancel this request');
    }
    return TimeOffCollection.updateAsync(_id, { $set: { status: 'Canceled' } });
}

export async function approveRequest({_id}){
    check(_id, String);

  const timeOff = await TimeOffCollection.findOneAsync({ _id });
  if(timeOff.status !== 'Pending') {
    throw new Meteor.Error('not-authorized', 'You can only approve pending requests');
  }
  const isManager = timeOff.managerUserId === Meteor.userId();
  if(!isManager) {
    throw new Meteor.Error('not-authorized', 'You are not allowed to approve this request');
  }
  return TimeOffCollection.updateAsync(_id, { $set: { status: 'Approved' } });
}

export async function declineRequest({ _id }) {
    check(_id, String);
  
    const timeOff = await TimeOffCollection.findOneAsync({ _id });
    if(timeOff.status !== 'Pending') {
      throw new Meteor.Error('not-authorized', 'You can only decline pending requests');
    }
    const isManager = timeOff.managerUserId === Meteor.userId();
    if(!isManager) {
      throw new Meteor.Error('not-authorized', 'You are not allowed to decline this request');
    }
    return TimeOffCollection.updateAsync(_id, { $set: { status: 'Declined' } });
  }
  


export async function findById(_id){
    check(_id, String);
    return TimeOffCollection.findOneAsync(_id);
}


export  async function test(){
  return TimeOffCollection.find({}).fetch();
}
