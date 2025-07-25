const config = {
  getApiUrl: () => {
    return process.env.REACT_APP_API_URL || 'http://localhost:5000';
  },

  getWsUrl: () => {
    // If explicit WebSocket URL is provided, use it
    if (process.env.REACT_APP_WS_URL) {
      return process.env.REACT_APP_WS_URL;
    }

    // If API URL is provided, derive WebSocket URL from it
    if (process.env.REACT_APP_API_URL) {
      const apiUrl = new URL(process.env.REACT_APP_API_URL);
      const protocol = apiUrl.protocol === 'https:' ? 'wss:' : 'ws:';
      return `${protocol}//${apiUrl.host}`;
    }

    // In production, try to derive from current location
    if (process.env.NODE_ENV === 'production') {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.host;
      return `${protocol}//${host}`;
    }

    // Default to localhost for development
    return 'ws://localhost:5000';
  },

  getBackendConfig: () => {
    return {
      apiUrl: config.getApiUrl(),
      wsUrl: config.getWsUrl()
    };
  },

  isDevelopment: () => {
    return process.env.NODE_ENV === 'development';
  },

  isProduction: () => {
    return process.env.NODE_ENV === 'production';
  },

  getEnvironment: () => {
    return process.env.NODE_ENV || 'development';
  },

  validateUrls: () => {
    const { apiUrl, wsUrl } = config.getBackendConfig();
    const errors = [];

    try {
      new URL(apiUrl);
    } catch (error) {
      errors.push(`Invalid API URL: ${apiUrl}`);
    }

    try {
      new URL(wsUrl);
    } catch (error) {
      errors.push(`Invalid WebSocket URL: ${wsUrl}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  logConfig: () => {
    if (config.isDevelopment()) {
      console.log('🔧 ChatApp Configuration:');
      console.log('Environment:', config.getEnvironment());
      console.log('API URL:', config.getApiUrl());
      console.log('WebSocket URL:', config.getWsUrl());
    }
  }
};

export default config; 