import React, { useState } from 'react';
import './Login.module.css';

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
    <div className="login-bg" style={{position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0}}>
        <svg width="100%" height="100%" viewBox="0 0 600 400" preserveAspectRatio="none" style={{position:'absolute',top:0,left:0}}>
          <defs>
            <radialGradient id="bgGrad" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#4f8cff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#f7f9fb" stopOpacity="0.8" />
            </radialGradient>
          </defs>
          <ellipse cx="300" cy="200" rx="320" ry="180" fill="url(#bgGrad)" />
        </svg>
      </div>
      <form className="login-form" onSubmit={handleSubmit} style={{position:'relative',zIndex:1,boxShadow:'0 8px 32px rgba(80,120,255,0.18)'}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
          <div style={{width:64,height:64,background:'linear-gradient(135deg,#4f8cff 60%,#357ae8 100%)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 8px rgba(80,120,255,0.18)',marginBottom:4}}>
            <img src="https://img.icons8.com/fluency/48/000000/checked--v1.png" alt="Logo" style={{width:38,height:38}} />
          </div>
          <h2 className="login-title" style={{fontSize:'2rem',fontWeight:700,letterSpacing:'1px'}}>Gestión de Actas</h2>
          <div style={{fontSize:'1.12rem',color:'#357ae8',fontWeight:500,marginBottom:8,textShadow:'0 2px 8px #eaf0f6'}}>Acceso seguro y moderno</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16,margin:'18px 0'}}>
          <input className="login-input" type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required style={{width:'90%',maxWidth:320,textAlign:'center',fontSize:'1.15rem',fontWeight:500,letterSpacing:'0.5px',boxShadow:'0 2px 8px #4f8cff33'}} />
          <input className="login-input" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required style={{width:'90%',maxWidth:320,textAlign:'center',fontSize:'1.15rem',fontWeight:500,letterSpacing:'0.5px',boxShadow:'0 2px 8px #357ae833'}} />
        </div>
        <div style={{display:'flex',justifyContent:'center',marginTop:10}}>
          <button className="login-btn" type="submit" style={{
            fontSize:'1.22rem',
            padding:'15px 0',
            width:'100%',
            maxWidth:340,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            gap:10,
            fontWeight:700,
            background:'linear-gradient(90deg,#4f8cff 60%,#357ae8 100%)',
            border:'none',
            borderRadius:'16px',
            boxShadow:'0 6px 24px #4f8cff44',
            letterSpacing:'0.8px',
            transition:'transform 0.15s, box-shadow 0.2s',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg style={{width:26,height:26,marginRight:2}} fill="#fff" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#357ae8"/><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{fontWeight:700}}>Entrar</span>
          </button>
        </div>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
