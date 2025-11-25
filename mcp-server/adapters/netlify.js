const NETLIFY_API = 'https://api.netlify.com/api/v1';

function authHeaders() {
  const token = process.env.NETLIFY_TOKEN;
  if (!token) throw new Error('NETLIFY_TOKEN not set');
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
}

module.exports = {
  listSites: async () => {
    const res = await fetch(`${NETLIFY_API}/sites`, { headers: authHeaders() });
    return res.json();
  },
  triggerDeploy: async (siteId) => {
    const res = await fetch(`${NETLIFY_API}/sites/${siteId}/deploys`, { method: 'POST', headers: authHeaders() });
    return res.json();
  }
};
