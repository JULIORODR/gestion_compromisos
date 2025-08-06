import React, { useState, useEffect } from 'react';
import Login from './Login';
import ActasPanel from './ActasPanel';
import ActaDetalle from './ActaDetalle';

function App() {
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token, rol: localStorage.getItem('rol'), username: localStorage.getItem('username') });
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (!user) {
    return <Login onLogin={data => setUser(data.user)} />;
  }

  let mainView = <ActasPanel />;
  if (route.startsWith('#/actas/')) {
    const id = route.replace('#/actas/', '');
    mainView = <ActaDetalle id={id} />;
  }

  return (
    <div className="App">
      <h2>Bienvenido, {user.username || 'usuario'}</h2>
      <p>Tu rol: {user.rol}</p>
      <button onClick={() => { localStorage.clear(); setUser(null); }}>Cerrar sesión</button>
      {mainView}
    </div>
  );
}

export default App;
