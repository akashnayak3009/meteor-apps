import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '../imports/api/collection';


const SEED_USERNAME = 'akash';
const SEED_PASSWORD = 'password';

Meteor.startup(async () => {


  Meteor.publish("links", function () {
    return LinksCollection.find();
  });
});
