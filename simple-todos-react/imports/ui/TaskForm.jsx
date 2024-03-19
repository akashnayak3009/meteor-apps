import React, { useState } from 'react';
import { TasksCollection } from '../api/TasksCollection';

export const TaskForm = (user) => {
  const [text, setText] = useState("");

 // In client code
const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!text) return;
  
    Meteor.call('tasks.insert', text,user, (error) => {
      if (error) {
        console.error(error.reason);
      } else {
        console.log('Task inserted successfully');
        setText("");
      }
    });
  };
  
  

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type to add new tasks"
      />

      <button type="submit">Add Task</button>
    </form>
  );
};