import React, { useState, useEffect } from 'react';
import styles from './ActasPanel.module.css';
import formStyles from './ActaForm.module.css';

function ActaForm({ onCreated }) {
  const [titulo, setTitulo] = useState('');
  const [estado, setEstado] = useState('abierta');
  const [fecha, setFecha] = useState('');
  const [pdf, setPdf] = useState(null);
  const [responsables, setResponsables] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Obtener usuarios para el selector de responsables
        const fetchUsuarios = async () => {
          try {
            const res = await fetch('http://localhost:8000/usuarios/', {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 401) {
              localStorage.clear();
              window.location.reload();
              return;
            }
            const data = await res.json();
            if (res.ok) setUsuarios(data);
          } catch {}
        };
        fetchUsuarios();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    let errors = {};
    if (!titulo.trim()) errors.titulo = 'El título es obligatorio.';
    if (!fecha) errors.fecha = 'La fecha es obligatoria.';
    if (!estado) errors.estado = 'El estado es obligatorio.';
    if (!responsables.length) errors.responsables = 'Debes seleccionar al menos un responsable.';
    if (!pdf) errors.pdf = 'Debes adjuntar el PDF del acta.';
    if (pdf && pdf.type !== 'application/pdf') errors.pdf = 'El archivo debe ser PDF.';
    if (pdf && pdf.size > 5 * 1024 * 1024) errors.pdf = 'El PDF no debe superar los 5MB.';
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setError('Por favor corrige los campos marcados.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('estado', estado);
    formData.append('fecha', fecha);
    if (pdf) formData.append('pdf', pdf);
    // Enviar responsables como lista (array) si el backend lo espera así
    // Enviar responsables como múltiples campos, formato estándar para ManyToMany en DRF
    responsables.forEach(r => formData.append('responsables', parseInt(r)));
    try {
      const res = await fetch('http://localhost:8000/actas/', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.status === 401) {
        localStorage.clear();
        window.location.reload();
        return;
      }
      let data;
      try {
        data = await res.json();
      } catch {
        data = { error: 'Respuesta inválida del backend' };
      }
      if (res.ok) {
        setTitulo(''); setEstado('abierta'); setFecha(''); setPdf(null); setResponsables([]);
        onCreated && onCreated(data);
      } else {
        // Mostrar el mensaje completo del backend para depuración
        setError(typeof data === 'string' ? data : JSON.stringify(data));
      }
    } catch {
      setError('Error de red');
    }
    setLoading(false);
  };

  return (
    <form className={styles.filtros} onSubmit={handleSubmit} style={{marginBottom:24,background:'#f7f9fb',borderRadius:12,padding:16}}>
      <h3>Crear nueva acta</h3>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        className={fieldErrors.titulo ? formStyles.inputError : ''}
      />
      {fieldErrors.titulo && <div className={formStyles.formError}>{fieldErrors.titulo}</div>}

      <input
        type="date"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
        className={fieldErrors.fecha ? formStyles.inputError : ''}
      />
      {fieldErrors.fecha && <div className={formStyles.formError}>{fieldErrors.fecha}</div>}

      <select
        value={estado}
        onChange={e => setEstado(e.target.value)}
        className={fieldErrors.estado ? formStyles.inputError : ''}
      >
        <option value="abierta">Abierta</option>
        <option value="cerrada">Cerrada</option>
      </select>
      {fieldErrors.estado && <div className={formStyles.formError}>{fieldErrors.estado}</div>}

      <label>Responsables:</label>
      <select
        multiple
        value={responsables}
        onChange={e => setResponsables(Array.from(e.target.selectedOptions, o => o.value))}
        className={fieldErrors.responsables ? formStyles.inputError : ''}
      >
        {usuarios.map(u => (
          <option key={u.id} value={u.id}>{u.username}</option>
        ))}
      </select>
      {fieldErrors.responsables && <div className={formStyles.formError}>{fieldErrors.responsables}</div>}

      <input
        type="file"
        accept=".pdf"
        onChange={e => setPdf(e.target.files[0])}
        className={fieldErrors.pdf ? formStyles.inputError : ''}
      />
      {fieldErrors.pdf && <div className={formStyles.formError}>{fieldErrors.pdf}</div>}

      <button className={styles.boton} type="submit" disabled={loading}>Guardar</button>
      {error && <div className={formStyles.formError}>{error}</div>}
    </form>
  );
}

export default ActaForm;
