import React from 'react';
import { Info } from './Info.jsx';


export const App = () => (
  <div style={{
    color: "#333",
    padding: "20px",
    margin: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  
  }}>
    <h1 style={{
      color: "#333",
      fontFamily: "sans-serif",
    }}>Doing Crud operations!</h1>
    <Info style ={{
      color: "#333",
      padding: "20px",
      margin: "20px",
      fontFamily: 'sans-serif',
      fontSize: "20px",
    }}/>
  </div>
);
