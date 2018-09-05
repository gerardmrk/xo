/**
 * Validates services.toml
 */
const validate = services => {
  const invalidations = [];

  for (const [svc, setting] of Object.entries(services)) {
    if (typeof svc !== "string" || svc.length === 0) {
      invalidations.push("[services] Service names must be a non-empty string.");
    } else if (typeof setting !== "object") {
      invalidations.push(`[services.${svc}] Must be a table (object).`);
    }
  }

  return invalidations;
};

module.exports = validate;
