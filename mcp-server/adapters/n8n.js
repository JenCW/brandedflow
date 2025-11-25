function getHost() {
  const host = process.env.N8N_HOST || 'http://localhost:5678';
  return host.replace(/\/$/, '');
}

module.exports = {
  triggerWorkflow: async (workflowId, data = {}) => {
    const host = getHost();
    const url = `${host}/webhook/${workflowId}`;
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return { status: res.status, body: await res.text() };
  }
};
