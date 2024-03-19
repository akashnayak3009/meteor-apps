import { Mongo } from 'meteor/mongo';

export const LinksCollection = new Mongo.Collection('links');

export const Messages = new Mongo.Collection('messages');

export const Assets = new Mongo.Collection('assets');