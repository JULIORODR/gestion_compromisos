import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.access);
        localStorage.setItem('rol', data.rol);
        onLogin(data);
      } else {
        setError(data.error || 'Error de autenticación');
      }
    } catch {
      setError('Error de red');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Entrar</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}

export default Login;
