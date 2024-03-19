import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import Dashboard from "./Dashboard";

export const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let authenticatedUser  = useTracker(() => Meteor.user());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      console.log("Username and password are required");
      return;
    }

    Meteor.loginWithPassword(username, password, (err) => {
      err ? console.log("Login Failed", err.message) : console.log("Logged in");

    //  authenticatedUser = Meteor.user();
    });
  };

  if (authenticatedUser) {
    return(
      <Dashboard />
    )
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form className="bg-gray-800 p-10 rounded-lg" onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="bg-black text-white rounded-lg w-full px-4 py-2 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="bg-black text-white rounded-lg w-full px-4 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto mt-4 block"
        >
          Send
        </button>
      </form>
    </div>
  );
};
