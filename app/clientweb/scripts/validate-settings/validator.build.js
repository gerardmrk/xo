const browserslist = require("browserslist");

const validURLProtocolRegex = /^https?:\/\/\S+/;
const validEnvs = ["development", "staging", "production"];

// prettier-ignore
const validate = ({ targets = {}, stages = {} }) => {
  const invalidations = [];

  // targets.node
  if (!targets.node || typeof targets.node !== "string") {
    invalidations.push("[build.targets.node] Required, and must be a non-empty string.");
  } else if (targets.node !== "current" && isNaN(parseFloat(targets.node))) {
    invalidations.push("[build.targets.node] Must be a Node.js version or the 'current' keyword.");
  }

  // targets.browsers
  if (!targets.browsers || !Array.isArray(targets.browsers) || targets.browsers.length === 0) {
    invalidations.push("[build.targets.browsers] Required, and must contain at least 1 valid Browserslist query.");
  } else {
    let error, detectedBrowsers;

    try {
      detectedBrowsers = browserslist(targets.browsers);
    } catch (excp) {
      error = excp;
    } finally {
      if (!!error) {
        invalidations.push(`[build.targets.browsers] ${error.message}.`);
      }

      if (!!detectedBrowsers && detectedBrowsers.length === 0) {
        invalidations.push("[build.targets.browsers] Unable to detect any browsers from queries.");
      }
    }
  }

  // envs.(development|staging|production)
  for (const [stage, { url, ...enabledFlags }] of Object.entries(stages)) {
    if (!validEnvs.includes(stage)) {
      invalidations.push(`[build.envs] Unrecognized env "${stage}".`);
    } else {
      // we're not testing for a fully valid URL, just the protocol; this will be used in canonical link tags
      if (!validURLProtocolRegex.test(url)) {
        invalidations.push(`[build.envs.${stage}] URL has invalid protocol.`);
      }
      
      if (Object.values(enabledFlags).some(v => typeof v !== 'boolean')) {
        invalidations.push(`[build.envs.${stage}] All 'enable...' flags must be a boolean value.`);
      }
    }
  }

  return invalidations;
};

module.exports = validate;
