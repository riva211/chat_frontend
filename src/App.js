import React, { useState, useEffect, useCallback } from 'react';
import UsernameInput from './components/UsernameInput';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import config from './config';

const App = () => {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    config.logConfig();
  }, []);

  const connectWebSocket = useCallback((username) => {
    setConnectionStatus('connecting');
    setError('');

    const { wsUrl } = config.getBackendConfig();
    console.log('Connecting to WebSocket:', wsUrl);

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setConnectionStatus('connected');
      setSocket(ws);
      
      ws.send(JSON.stringify({
        type: 'username',
        username: username
      }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'username_confirmed':
            setUsername(data.username);
            break;
            
          case 'chat_history':
            setMessages(data.messages.map(msg => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            })));
            break;
            
          case 'new_message':
            setMessages(prev => [...prev, {
              ...data.message,
              timestamp: new Date(data.message.timestamp)
            }]);
            break;
            
          case 'user_joined':
            setMessages(prev => [...prev, {
              type: 'system',
              content: `${data.username} joined the chat`,
              timestamp: new Date(data.timestamp)
            }]);
            break;
            
          case 'user_left':
            setMessages(prev => [...prev, {
              type: 'system',
              content: `${data.username} left the chat`,
              timestamp: new Date(data.timestamp)
            }]);
            break;
            
          case 'error':
            setError(data.message);
            break;
            
          default:
            console.log('Unknown message type:', data.type);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = (event) => {
      console.log('WebSocket disconnected:', event.code, event.reason);
      setConnectionStatus('disconnected');
      setSocket(null);
      
      if (event.code !== 1000) {
        setError('Connection lost. Please refresh the page to reconnect.');
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('disconnected');
      setError('Failed to connect to server. Please check your connection and try again.');
    };

    return ws;
  }, []);

  const handleUsernameSubmit = (submittedUsername) => {
    connectWebSocket(submittedUsername);
  };

  const handleSendMessage = (messageContent) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'message',
        content: messageContent
      }));
    }
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  useEffect(() => {
    if (connectionStatus === 'disconnected' && username && !socket) {
      const timeout = setTimeout(() => {
        if (connectionStatus === 'disconnected') {
          console.log('Attempting to reconnect...');
          connectWebSocket(username);
        }
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [connectionStatus, username, socket, connectWebSocket]);

  if (error && connectionStatus === 'disconnected') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
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
          <div style={{
            fontSize: '3rem',
            marginBottom: '20px'
          }}>⚠️</div>
          <h2 style={{
            color: '#333',
            marginBottom: '15px',
            fontSize: '1.5rem'
          }}>Connection Error</h2>
          <p style={{
            color: '#666',
            marginBottom: '25px',
            lineHeight: '1.5'
          }}>{error}</p>
          <div style={{
            fontSize: '0.9rem',
            color: '#888',
            marginBottom: '20px',
            padding: '10px',
            background: '#f8f9fa',
            borderRadius: '8px',
            fontFamily: 'monospace'
          }}>
            Backend: {config.getWsUrl()}
          </div>
          <button 
            onClick={() => {
              setError('');
              if (username) {
                connectWebSocket(username);
              }
            }}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!username || connectionStatus === 'disconnected') {
    return <UsernameInput onUsernameSubmit={handleUsernameSubmit} />;
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <ChatWindow 
        messages={messages}
        currentUsername={username}
        connectionStatus={connectionStatus}
      />
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={connectionStatus !== 'connected'}
      />
    </div>
  );
};

export default App; 