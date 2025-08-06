import React, { useEffect, useState } from 'react';
import styles from './ActasPanel.module.css';

function ActasPanel() {
  const [actas, setActas] = useState([]);
  const [filtros, setFiltros] = useState({ estado: '', titulo: '', fecha: '' });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchActas = async () => {
    setLoading(true);
    let params = [];
    Object.entries(filtros).forEach(([k, v]) => { if (v) params.push(`${k}=${v}`); });
    const res = await fetch(`http://localhost:8000/actas/?${params.join('&')}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setActas(data);
    setLoading(false);
  };

  useEffect(() => { fetchActas(); }, []);

  const handleFiltro = e => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = e => {
    e.preventDefault();
    fetchActas();
  };

  return (
    <div className={styles.panel}>
      <h2 style={{marginBottom:16}}>Panel de Actas</h2>
      <form className={styles.filtros} onSubmit={handleBuscar}>
        <input name="titulo" placeholder="Título" value={filtros.titulo} onChange={handleFiltro} />
        <input name="fecha" type="date" value={filtros.fecha} onChange={handleFiltro} />
        <select name="estado" value={filtros.estado} onChange={handleFiltro}>
          <option value="">Todos</option>
          <option value="abierta">Abierta</option>
          <option value="cerrada">Cerrada</option>
        </select>
        <button className={styles.boton} type="submit">
          <svg className={styles.icono} viewBox="0 0 20 20" fill="none"><path d="M8.5 2a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm7.29 11.71a1 1 0 0 1-1.42 0l-2.38-2.38a8 8 0 1 1 1.42-1.42l2.38 2.38a1 1 0 0 1 0 1.42z" fill="#fff"/></svg>
          Filtrar
        </button>
      </form>
      {loading ? <p>Cargando...</p> : (
        <div style={{overflowX:'auto'}}>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Compromisos</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {actas.map(acta => (
                <tr key={acta.id}>
                  <td>{acta.titulo}</td>
                  <td>{acta.estado}</td>
                  <td>{acta.fecha}</td>
                  <td>{acta.compromisos.length}</td>
                  <td>
                    <a href={`#/actas/${acta.id}`}>
                      <button className={styles.boton} type="button">
                        <svg className={styles.icono} viewBox="0 0 20 20" fill="none"><path d="M10 3a7 7 0 1 1 0 14A7 7 0 0 1 10 3zm0 2a5 5 0 1 0 0 10A5 5 0 0 0 10 5zm0 2a3 3 0 1 1 0 6A3 3 0 0 1 10 7z" fill="#fff"/></svg>
                        Detalle
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ActasPanel;
