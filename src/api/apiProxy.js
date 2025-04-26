// src/api/apiProxy.js
export const proxyRequest = async (endpoint, method, data) => {
    try {
      const url = `http://34.10.166.233${endpoint}`;
      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      if (data) {
        options.body = JSON.stringify(data);
      }
      
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        throw new Error(errorData.detail || errorData.message || 'Request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Proxy Error:', error);
      throw error;
    }
  };