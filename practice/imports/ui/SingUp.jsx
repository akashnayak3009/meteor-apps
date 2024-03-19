import React, { useState } from 'react';



const Signup = () => {
  const [email, setEmail] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
  
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
