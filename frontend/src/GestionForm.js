import React, { useState } from 'react';

function GestionForm({ compromisoId, onCreated }) {
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData();
    formData.append('fecha', fecha);
    formData.append('descripcion', descripcion);
    formData.append('archivo', archivo);
    formData.append('compromiso', compromisoId);
    try {
      const res = await fetch('http://localhost:8000/gestiones/', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setFecha(''); setDescripcion(''); setArchivo(null);
        onCreated && onCreated(data);
      } else {
        setError(data.archivo || data.error || 'Error al crear gestión');
      }
    } catch {
      setError('Error de red');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Agregar Gestión</h4>
      <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} required />
      <input type="text" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
      <input type="file" accept=".pdf,.jpg" onChange={e => setArchivo(e.target.files[0])} required />
      <button type="submit" disabled={loading}>Guardar</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}

export default GestionForm;
