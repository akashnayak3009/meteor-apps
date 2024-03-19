import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'
import { LinksCollection } from '/imports/api/links';


Meteor.startup( async () =>{
// Publication of links collection
Meteor.publish('links', function(){
   return LinksCollection.find({});
})
})


//Method for crud operations 
Meteor.methods({
  'links.create'({title, url}){
    check(title, String);
    check(url, String);
    return LinksCollection.insert({title, url, createdAt: new Date()})
  },
  'links.update'({_id, title, url}){
    check(title, String);
    check(url, String);
    return LinksCollection.update({_id}, {$set: {title, url}})
  },
  'links.remove'(_id){
    check(_id, String);
    return LinksCollection.remove({_id})
  }
}) 