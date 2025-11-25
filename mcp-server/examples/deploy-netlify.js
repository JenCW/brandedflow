// Example automation: deploy-netlify
module.exports = async function ({ adapters, params }) {
  const { netlify } = adapters;
  const { siteId } = params || {};
  if (!siteId) throw new Error('siteId required in params');
  const result = await netlify.triggerDeploy(siteId);
  return { deploy: result };
};
