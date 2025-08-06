import React, { useEffect, useState } from 'react';
import GestionForm from './GestionForm';
import styles from './Modern.module.css';

function ActaDetalle({ id }) {
  const [acta, setActa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
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
    const fetchUsuarios = async () => {
      const res = await fetch('http://localhost:8000/usuarios/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setUsuarios(data);
    };
    fetchActa();
    fetchUsuarios();
  }, [id, token]);

  if (loading) return (
    <div style={{textAlign:'center',margin:'32px 0'}}>
      <svg width="48" height="48" viewBox="0 0 50 50" style={{marginBottom:8}}>
        <circle cx="25" cy="25" r="20" stroke="#357ae8" strokeWidth="5" fill="none" strokeDasharray="90" strokeDashoffset="60">
          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <div style={{color:'#357ae8',fontWeight:500}}>Cargando acta...</div>
    </div>
  );
  if (!acta) return <div style={{textAlign:'center',color:'#e74c3c',margin:'32px 0',fontWeight:500}}>No se encontró el acta.</div>;

  return (
    <div className={styles['detalle-panel']}>
      <h2>
        <svg style={{verticalAlign:'middle',marginRight:8}} width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5V8h5.5L13 3.5z" fill="#357ae8"/></svg>
        Detalle de Acta
      </h2>
      <div style={{marginBottom:18}}>
        <span style={{fontWeight:600,fontSize:'1.2rem',color:'#357ae8'}}>{acta.titulo}</span>
        <span style={{marginLeft:16,padding:'4px 12px',borderRadius:8,background:acta.estado==='abierta'?'#eaf7ea':'#fbeaea',color:acta.estado==='abierta'?'#2ecc71':'#e74c3c',fontWeight:500}}>{acta.estado.charAt(0).toUpperCase()+acta.estado.slice(1)}</span>
      </div>
      <div style={{marginBottom:8}}><b>Fecha:</b> {acta.fecha}</div>
      <div style={{marginBottom:8}}><b>Creador:</b> {acta.creador}</div>
      <div style={{marginBottom:8}}>
        <b>Responsables:</b>
        <span style={{display:'inline-flex',gap:8,flexWrap:'wrap',marginLeft:8}}>
          {Array.isArray(acta.responsables)
            ? acta.responsables.map(rid => {
                const user = usuarios.find(u => u.id === rid);
                return (
                  <span key={rid} style={{background:'#eaf0f6',color:'#357ae8',borderRadius:16,padding:'4px 12px',fontWeight:500,display:'inline-flex',alignItems:'center',gap:4,boxShadow:'0 1px 4px rgba(80,120,255,0.07)'}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{marginRight:4}}><circle cx="12" cy="8" r="4" fill="#357ae8"/><path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" fill="#eaf0f6"/></svg>
                    {user ? user.username : rid}
                  </span>
                );
              })
            : acta.responsables}
        </span>
      </div>
      {acta.pdf && token && (
        <div style={{margin:'24px 0',background:'#fff',borderRadius:12,padding:12,boxShadow:'0 2px 8px rgba(80,120,255,0.06)'}}>
          <div style={{marginBottom:8,fontWeight:500,color:'#357ae8'}}>
            <svg style={{verticalAlign:'middle',marginRight:6}} width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5V8h5.5L13 3.5z" fill="#357ae8"/></svg>
            PDF del acta
          </div>
          <iframe src={`/media/${acta.pdf.split('/').pop()}`} title="PDF Acta" width="100%" height="350px" style={{border:'1px solid #e3e8ee',borderRadius:8}}></iframe>
          <div style={{marginTop:8}}>
            <a href={`/media/${acta.pdf.split('/').pop()}`} target="_blank" rel="noopener noreferrer">Descargar PDF</a>
          </div>
        </div>
      )}
      <h3>
        <svg style={{verticalAlign:'middle',marginRight:6}} width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 14.93V17a1 1 0 0 1-2 0v-2.07A8.001 8.001 0 0 1 4.07 13H2a1 1 0 0 1 0-2h2.07A8.001 8.001 0 0 1 11 4.07V2a1 1 0 0 1 2 0v2.07A8.001 8.001 0 0 1 19.93 11H22a1 1 0 0 1 0 2h-2.07A8.001 8.001 0 0 1 13 19.93z" fill="#4f8cff"/></svg>
        Compromisos asociados
      </h3>
      {(!acta.compromisos || acta.compromisos.length === 0) ? (
        <div style={{color:'#e74c3c',margin:'16px 0'}}>No hay compromisos asociados a esta acta.</div>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:20,marginTop:12}}>
          {acta.compromisos.map(c => (
            <div key={c.id} style={{background:'#fff',borderRadius:14,padding:'18px 20px',boxShadow:'0 4px 16px rgba(80,120,255,0.08)',border:'1px solid #e3e8ee'}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#4f8cff"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">C</text></svg>
                <span style={{fontWeight:600,color:'#357ae8',fontSize:'1.12rem'}}>{c.descripcion}</span>
              </div>
              <div style={{marginBottom:10,display:'flex',gap:12,flexWrap:'wrap'}}>
                <span style={{background:'#eaf7ea',color:'#2ecc71',padding:'4px 12px',borderRadius:8,fontWeight:500,display:'inline-flex',alignItems:'center',gap:4}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#2ecc71"/><path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" fill="#eaf7ea"/></svg>
                  Responsable: {c.responsable}
                </span>
                <span style={{background:'#fbeaea',color:'#e74c3c',padding:'4px 12px',borderRadius:8,fontWeight:500,display:'inline-flex',alignItems:'center',gap:4}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#e74c3c"/><path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" fill="#fbeaea"/></svg>
                  Estado: {c.estado}
                </span>
              </div>
              <div style={{marginTop:8}}>
                <b style={{color:'#357ae8'}}>Gestiones:</b>
                <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:6}}>
                  {(!c.gestiones || c.gestiones.length === 0) ? (
                    <div style={{color:'#e74c3c',background:'#fbeaea',borderRadius:8,padding:'6px 12px',fontWeight:500,width:'fit-content'}}>Sin gestiones registradas.</div>
                  ) : c.gestiones.map(g => (
                    <div key={g.id} style={{background:'#f7f9fb',borderRadius:8,padding:'8px 12px',boxShadow:'0 1px 4px rgba(80,120,255,0.04)',display:'flex',alignItems:'center',gap:10}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="4" fill="#357ae8"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff">G</text></svg>
                      <span style={{fontWeight:500}}>{g.descripcion}</span>
                      <span style={{color:'#357ae8',marginLeft:8}}>{g.fecha}</span>
                      {g.archivo && (
                        <a style={{marginLeft:12,color:'#4f8cff',fontWeight:500}} href={`/media/${g.archivo.split('/').pop()}`} target="_blank" rel="noopener noreferrer">Ver archivo</a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {(rol === 'admin' || c.responsable === username) && token && (
                <GestionForm compromisoId={c.id} onCreated={() => window.location.reload()} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActaDetalle;
