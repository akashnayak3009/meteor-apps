// Login.jsx
import React, { useState, useEffect } from 'react';
import { DDP } from 'meteor/ddp-client'
import {Meteor} from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo';


// ANOTHER METEOR  APP SERVER SIDE OF DATA FETCHING  

// var remote = DDP.connect('http://localhost:3000');

// console.log("its starting");
// console.log("🚀 ~ remote:", remote)


// METHOD CALL

 // remote.call('Test.api', (error, result) => {
  //   if (error) {
  //     console.error('Error:', error);
  //   } else {
  //     console.log('Result:', result);
  //     var data =result
  //   }
  // });


  // SUBSCRIPTION

  
  // remote.subscribe('allTimeoffs', (error) => {
  //   if (error) {
  //     console.log('Error:', error);
  //   } else {
  //     console.log('Subscribed');
  //   }
  // });


const Login = () => {
  //   const [email, setEmail] = useState('');
  // const [data, setData] = useState([]);

//  const status = useTracker(() => {
//   return Meteor.status();
//  })
 
//  console.log("status", status);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://localhost:3000/Test.api');
//         const jsonData = await response.json();
//         console.log('Response:', jsonData);
//         setData(jsonData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

  return (
    <div>
     fdfdf
    </div>
  );
};

export default Login;