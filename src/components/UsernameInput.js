import React, { useState } from 'react';

const UsernameInput = ({ onUsernameSubmit }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedUsername = username.trim();
    
    if (!trimmedUsername) {
      setError('Please enter a username');
      return;
    }
    
    if (trimmedUsername.length > 50) {
      setError('Username must be 50 characters or less');
      return;
    }
    
    if (!/^[a-zA-Z0-9_\-\s]+$/.test(trimmedUsername)) {
      setError('Username can only contain letters, numbers, spaces, hyphens, and underscores');
      return;
    }
    
    setError('');
    onUsernameSubmit(trimmedUsername);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{
          color: '#333',
          marginBottom: '10px',
          fontSize: '2rem',
          fontWeight: '700'
        }}>Welcome to ChatApp</h1>
        <p style={{
          color: '#666',
          marginBottom: '30px',
          fontSize: '1.1rem'
        }}>Enter your username to start chatting</p>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter your username"
              style={{
                padding: '15px 20px',
                border: '2px solid #e1e5e9',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                outline: 'none'
              }}
              maxLength={50}
              autoFocus
            />
            <button type="submit" style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              Join Chat
            </button>
          </div>
          
          {error && <div style={{
            color: '#e74c3c',
            fontSize: '0.9rem',
            marginTop: '10px',
            padding: '10px',
            background: '#fdf2f2',
            borderRadius: '8px',
            border: '1px solid #fecaca'
          }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default UsernameInput; 