import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { LinksCollection } from "../api/links";
import LinkForm from "./LinkForm";

//Subscription to the links collection
Meteor.subscribe("links");

export const Info = () => {
  const [formTarget, setFormTarget] = useState(null);
  const [error, setError] = useState(null);

  const links = useTracker(() => LinksCollection.find({}).fetch());

  const renderLinkForm = () => {
    return formTarget ? (
      <LinkForm
        onSubmitted={onSubmitted}
        onError={onError}
        type={formTarget.type}
        doc={formTarget.doc}
      />
    ) : null;
  };

  const renderError = () => {
    return error ? <div>{error.message}</div> : null;
  };

  const remove = (_id) =>
    Meteor.call("links.remove", _id, (err) => setError(err));

  const onError = (error) => setError(error);

  const onSubmitted = (res) => {
    setFormTarget(null);
    setError(null);
  };
  return (
    <div
      className="info"
      style={{
        color: "#333",
        padding: "20px",
        margin: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h2 style={{ color: "#007bff" }}>Meteor crud app in mongoDB</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {links.map((link) => (
          <li key={link._id} style={{ marginBottom: "10px" }}>
            <a
              href={link.url}
              target="_blank"
              style={{ color: "#333", textDecoration: "none" }}
            >
              {link.title}
            </a>
            <button
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                background: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
              onClick={() => setFormTarget({ type: "update", doc: link })}
            >
              Update
            </button>
            <button
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                background: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
              onClick={() => remove(link._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {renderLinkForm()}
      {renderError()}
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
        }}
        onClick={() => setFormTarget({ type: "insert" })}
      >
        Create new link
      </button>
    </div>
  );
};
