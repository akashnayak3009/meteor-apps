import React, { useState } from "react";
import { Meteor } from "meteor/meteor";


const LinkForm = ({ type, onSubmitted, onError, doc }) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
  
    const onSubmit = (e) => {
      e.preventDefault();
      if (type === "insert") {
        Meteor.call("links.create", { title, url }, (err, res) => {
          if (err) {
            return onError(err);
          }
          //reset the input fields
          onSubmitted(res);
        });
        if (type === "update") {
          Meteor.call(
            "links.update",
            { _id: doc._id, title, url },
            (err, res) => {
              if (err) {
                return onError(err);
              }
              //reset the input fields
              onSubmitted(res);
            }
          );
        }
      }
    };
  
    return (
      <div
        className="linkform"
        style={{
          color: "#333",
          padding: "20px",
          margin: "20px auto",
          maxWidth: "400px",
          border: "2px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label style={{ marginBottom: "10px" }}>
            <span>Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                padding: "8px",
                marginBottom: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
          <label style={{ marginBottom: "10px" }}>
            <span>Url</span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{
                padding: "8px",
                marginBottom: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
          <input
            type="submit"
            value="Submit"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          />
        </form>
      </div>
    );
  };
  
  export  default LinkForm;