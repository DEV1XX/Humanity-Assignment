export default async function handler(req, res) {
    // Set CORS headers to allow requests from your frontend
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    
    // Handle OPTIONS request (preflight)
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    // Get the endpoint from the request query
    const { endpoint } = req.query;
    
    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint parameter' });
    }
    
    try {
      // Debug the request
      console.log('Received proxy request for endpoint:', endpoint);
      
      // Construct the full URL with the correct base URL
      // Using the port and host from the Swagger documentation
      const apiUrl = `http://34.10.166.233/${endpoint}`;
      
      console.log(`Proxying request to: ${apiUrl}`);
      console.log(`Method: ${req.method}`);
      
      // Parse body for non-GET requests
      let bodyData = null;
      if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
        bodyData = JSON.stringify(req.body);
        console.log(`Request body:`, req.body);
        console.log(`Stringified body: ${bodyData}`);
      }
      
      // Forward the request to the actual API
      const fetchOptions = {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          // Forward authorization header if present
          ...(req.headers.authorization && { Authorization: req.headers.authorization }),
        },
      };
      
      // Include body for non-GET requests
      if (bodyData) {
        fetchOptions.body = bodyData;
      }
      
      console.log('Fetch options:', fetchOptions);
      
      const response = await fetch(apiUrl, fetchOptions);
      console.log(`Response status from API: ${response.status}`);
      
      // Get response headers to check content-type
      const contentType = response.headers.get('content-type');
      console.log(`Response content-type: ${contentType}`);
      
      // Get the raw response regardless of content type
      const responseText = await response.text();
      console.log(`Response text (first 100 chars): ${responseText.substring(0, 100)}`);
      
      // For empty responses, send appropriate status
      if (!responseText.trim()) {
        console.log('Empty response received');
        return response.status === 204 
          ? res.status(204).end()
          : res.status(response.status).json({ message: "Empty response from server" });
      }
      
      // Try to parse as JSON
      try {
        const data = JSON.parse(responseText);
        console.log('Successfully parsed JSON response');
        return res.status(response.status).json(data);
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError);
        // If it's not JSON, send as plain text with the original status
        return res.status(response.status).send(responseText);
      }
    } catch (error) {
      console.error('API proxy error:', error);
      return res.status(500).json({ error: 'Failed to proxy request', message: error.message, stack: error.stack });
    }
  }