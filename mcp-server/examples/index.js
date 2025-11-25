const bumpDeps = require('./bump-deps');
const deployNetlify = require('./deploy-netlify');

module.exports = {
  'bump-deps': bumpDeps,
  'deploy-netlify': deployNetlify
};
