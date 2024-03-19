import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/TasksCollection';
import { Accounts } from 'meteor/accounts-base';


// const tasksData = [
//   'First Task',
// ];

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

//Insert tasks function
// const insertTasks = (taskDataArray, user) => {
//   taskDataArray.forEach(taskText => {
//       TasksCollection.insert({
//          text: taskText,
//          userId: user._id,
//          createdAt: new Date(),
//          });
//   });
// };


//Startup the server 

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  //Publish tasks for client side 
  Meteor.publish('tasks', () =>{
   return TasksCollection.find();
  });

  // const user = Accounts.findUserByUsername(SEED_USERNAME);
  // insertTasks(tasksData, user);
});


// In server code make method
Meteor.methods({

  //Insert tasks method
  'tasks.insert'(text,user) {

    if (!user) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to perform this operation');
    }
    TasksCollection.insert({
      text: text,
      userId: user.user._id,
      createdAt: new Date(),
      });
  },
   
  // check task  method 
  'tasks.toggleChecked'(_id, isChecked) {

    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  },

  // Remove task method
  'tasks.deleteTask'(_id,) {
    TasksCollection.remove(_id)
  },
});
 
