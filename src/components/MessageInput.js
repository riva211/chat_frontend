import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedMessage = message.trim();
    
    if (!trimmedMessage || disabled) {
      return;
    }
    
    if (trimmedMessage.length > 1000) {
      return;
    }
    
    onSendMessage(trimmedMessage);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div style={{
      padding: '20px 30px',
      background: 'white',
      borderTop: '1px solid #e2e8f0'
    }}>
      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '12px',
          background: '#f8fafc',
          border: '2px solid #e2e8f0',
          borderRadius: '25px',
          padding: '8px 8px 8px 20px',
          transition: 'border-color 0.3s ease'
        }}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "Connecting..." : "Type your message..."}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: '1rem',
              lineHeight: '1.4',
              maxHeight: '120px',
              minHeight: '20px',
              padding: '8px 0',
              color: disabled ? '#94a3b8' : 'inherit',
              cursor: disabled ? 'not-allowed' : 'text'
            }}
            maxLength={1000}
            disabled={disabled}
            rows={1}
          />
          <button 
            type="submit" 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: !message.trim() || disabled ? '#cbd5e1' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: !message.trim() || disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            disabled={!message.trim() || disabled}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: '-25px',
          right: '0',
          fontSize: '0.75rem',
          color: '#94a3b8',
          fontWeight: '500'
        }}>
          {message.length}/1000
        </div>
      </form>
    </div>
  );
};

export default MessageInput; 