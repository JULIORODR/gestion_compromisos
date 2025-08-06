import React, { useEffect, useState } from 'react';
import GestionForm from './GestionForm';

function ActaDetalle({ id }) {
  const [acta, setActa] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchActa = async () => {
      const res = await fetch(`http://localhost:8000/actas/${id}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setActa(data);
      setLoading(false);
    };
    fetchActa();
  }, [id, token]);

  if (loading) return <p>Cargando...</p>;
  if (!acta) return <p>No se encontró el acta.</p>;

  return (
    <div>
      <h2>Detalle de Acta</h2>
      <p><b>Título:</b> {acta.titulo}</p>
      <p><b>Estado:</b> {acta.estado}</p>
      <p><b>Fecha:</b> {acta.fecha}</p>
      <p><b>Creador:</b> {acta.creador}</p>
      <h3>Compromisos</h3>
      <ul>
        {acta.compromisos.map(c => (
          <li key={c.id}>
            {c.descripcion} - Responsable: {c.responsable} - Estado: {c.estado}
            <ul>
              {c.gestiones.map(g => (
                <li key={g.id}>
                  {g.descripcion} ({g.fecha})
                  {g.archivo && (
                    <a href={`/media/${g.archivo.split('/').pop()}`} target="_blank" rel="noopener noreferrer">Ver archivo</a>
                  )}
                </li>
              ))}
            </ul>
            {(rol === 'admin' || c.responsable === username) && (
              <GestionForm compromisoId={c.id} onCreated={() => window.location.reload()} />
            )}
          </li>
        ))}
      </ul>
      {acta.pdf && (
        <a href={`/media/${acta.pdf.split('/').pop()}`} target="_blank" rel="noopener noreferrer">Ver PDF del acta</a>
      )}
    </div>
  );
}

export default ActaDetalle;
