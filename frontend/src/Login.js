import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken, toggleToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      const token = response.data.token;
      setToken(token);
      localStorage.setItem('token', token); // Guardar el token
    } catch (err) {
      setError(err.response?.data?.error || 'Credenciales incorrectas.');
    }
  };

  const handleGoogleLogin = () => {
    // Lógica de autenticación con Google
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="auth-container">
      <h2>Inicia sesión</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <button onClick={handleGoogleLogin} className="google-login">
        Inicia sesión con Google
      </button>
      <p className="toggle-link">
        ¿No tienes una cuenta?{' '}
        <span onClick={toggleToRegister} className="link-text">
          Regístrate aquí
        </span>
      </p>
    </div>
  );
};

export default Login;
