import React, { useRef, useEffect } from 'react';

const ChatWindow = ({ messages, currentUsername, connectionStatus }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessage = (message, index) => {
    if (message.type === 'system') {
      return (
        <div key={index} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '15px 0',
          gap: '10px'
        }}>
          <span style={{
            background: '#e2e8f0',
            color: '#64748b',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>{message.content}</span>
          <span style={{
            color: '#94a3b8',
            fontSize: '0.8rem'
          }}>{formatTime(message.timestamp)}</span>
        </div>
      );
    }

    const isOwnMessage = message.username === currentUsername;

    return (
      <div key={index} style={{
        marginBottom: '15px',
        display: 'flex',
        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start'
      }}>
        <div style={{
          maxWidth: '70%',
          padding: '12px 16px',
          borderRadius: '18px',
          position: 'relative',
          background: isOwnMessage ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
          color: isOwnMessage ? 'white' : '#333',
          border: isOwnMessage ? 'none' : '1px solid #e2e8f0',
          borderBottomRightRadius: isOwnMessage ? '4px' : '18px',
          borderBottomLeftRadius: isOwnMessage ? '18px' : '4px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px',
            fontSize: '0.8rem'
          }}>
            <span style={{
              fontWeight: '600',
              color: 'inherit',
              opacity: '0.9'
            }}>{message.username}</span>
            <span style={{
              opacity: '0.7',
              fontSize: '0.75rem'
            }}>{formatTime(message.timestamp)}</span>
          </div>
          <div style={{
            lineHeight: '1.4',
            wordWrap: 'break-word'
          }}>{message.message}</div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 30px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          margin: '0'
        }}>ChatApp</h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.9rem',
          fontWeight: '500'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: connectionStatus === 'connected' ? '#4ade80' : 
                       connectionStatus === 'connecting' ? '#fbbf24' : '#ef4444',
            animation: connectionStatus === 'connected' ? 'pulse 2s infinite' : 'none'
          }}></span>
          {connectionStatus === 'connected' ? 'Connected' : 
           connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
        </div>
      </div>
      
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        background: '#f8fafc'
      }}>
        {messages.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#64748b',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '15px'
            }}>💬</div>
            <p style={{
              fontSize: '1.1rem',
              margin: '0'
            }}>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => renderMessage(message, index))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default ChatWindow; 