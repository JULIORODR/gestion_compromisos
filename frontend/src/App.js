import React, { useState, useEffect } from 'react';
import Login from './Login';
import ActasPanel from './ActasPanel';
import ActaDetalle from './ActaDetalle';
import styles from './Header.module.css';

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
      <header className={styles.header}>
        <div className={styles['header-title']}>Gestión de Actas, Compromisos y Gestiones</div>
        <div className={styles['header-user']}>Bienvenido, {user.username || 'usuario'}</div>
        <div className={styles['header-rol']}>Rol: {user.rol}</div>
        <button className={styles['header-btn']} onClick={() => { localStorage.clear(); setUser(null); }}>Cerrar sesión</button>
      </header>
      {mainView}
    </div>
  );
}

export default App;
