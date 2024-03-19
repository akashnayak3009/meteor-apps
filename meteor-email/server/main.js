import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { EmailCollection } from '/imports/api/email';
import { deleteEmail, insertEmail } from '/imports/utils/insertEmail';
 

const SEED_USERNAME = 'meteor';
const SEED_PASSWORD = 'password';

Meteor.startup(async () => {

  process.env.MAIL_URL = 'smtp://username:password@smtp.gmail.com:587/';
  console.log(process.env.MAIL_URL)


  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  Meteor.methods({
    "Email.insert": insertEmail,
    "Email.delete": deleteEmail,
  })


  Meteor.publish("emails", function () {
    return EmailCollection.find();
  });

});
