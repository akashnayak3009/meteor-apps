import React, { useState, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Task } from "./Task";
import { TasksCollection } from "../api/TasksCollection";
import { TaskForm } from "./TaskForm";
import { LoginForm } from "./LoginForm";

Meteor.subscribe("tasks");

// In client code
const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call("tasks.toggleChecked", _id, isChecked, (error) => {
    if (error) {
      console.error(error.reason);
    } else {
      console.log("Task checked status toggled successfully");
    }
  });
};

const deleteTask = ({ _id }) => {
  Meteor.call("tasks.deleteTask", _id, (error) => {
    if (error) {
      console.error(error.reason);
    } else {
      console.log("Task deleted successfully");
    }
  });
};

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const tasks = useTracker(() => {
    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

  const pendingTasksCount = useTracker(() => {
    return TasksCollection.find(pendingOnlyFilter).count();
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;
  const logout = () => Meteor.logout();
  return (
    <div className="app">
      <div className="main">
        {user ? (
          <Fragment>
          <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List</h1>
            {pendingTasksTitle}
          </div>
        </div>
      </header>
            <div className="user-logout">
              <span className="user-username">{user.username}</span>
              <button className="user" onClick={logout}>
                Logout
              </button>
            </div>
            <TaskForm user={user} />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>

            <ul className="tasks">
              {tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    onCheckboxClick={toggleChecked}
                    onDeleteClick={deleteTask}
                  />
                ))
              ) : (
                <div>
                  <h3>No tasks found..</h3>
                </div>
              )}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
