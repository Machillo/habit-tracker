import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ toggleToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      setSuccess('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
      setUsername('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar el usuario.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear una cuenta</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleRegister} className="auth-form">
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
        <button type="submit">Registrarse</button>
      </form>
      <p className="toggle-link">
        ¿Ya tienes una cuenta?{' '}
        <span onClick={toggleToLogin} className="link-text">
          Inicia sesión aquí
        </span>
      </p>
    </div>
  );
};

export default Register;
