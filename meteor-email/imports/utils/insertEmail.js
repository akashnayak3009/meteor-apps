const { EmailCollection } = require("../api/email");
import { check } from 'meteor/check'
import { Email } from 'meteor/email'

export async function insertEmail({ sender, body, subject, tag, email }) {
    check([sender, body, subject, email], [String]);
    check(tag, Match.OneOf("regular", "spam", "important"));

    if (!this.userId) {
        throw new Meteor.Error('not-authorized', 'You are not authorized to send emails.');
    }

    const emailSent = await Email.sendAsync({
        to: email,
        from: sender,
        subject: subject,
        text: body,
    })

    // @ts-ignore
    if (!emailSent) {
        console.log("Email not sent");
    }
    const insertEmail = await EmailCollection.insertAsync({
        sender,
        body,
        subject,
        tag,
        email,
        createdAt: new Date(),
    });
    return insertEmail;
}


export async function deleteEmail({ _id }) {
    check(_id, String);

    if (!this.userId) {
        throw new Meteor.Error('not-authorized', 'You are not authorized to send emails.');
    }

    const removeEmail = await EmailCollection.removeAsync({ _id })
    return removeEmail;
}