// API key validation middleware
function authMiddleware() {
  return (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const validKeys = (process.env.MCP_API_KEYS || '').split(',').filter(Boolean);
    
    if (!apiKey || !validKeys.includes(apiKey)) {
      return res.status(401).json({ error: 'Unauthorized: invalid or missing X-API-Key header' });
    }
    
    next();
  };
}

module.exports = { authMiddleware };
