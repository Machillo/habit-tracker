import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import HabitsApp from './HabitsApp';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleToRegister = () => setIsRegistering(true);
  const toggleToLogin = () => setIsRegistering(false);

  if (!token) {
    return isRegistering ? (
      <Register toggleToLogin={toggleToLogin} />
    ) : (
      <Login setToken={setToken} toggleToRegister={toggleToRegister} />
    );
  }

  return <HabitsApp token={token} setToken={setToken} />;
}

export default App;
