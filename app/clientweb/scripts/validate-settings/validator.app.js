/**
 * NOTE:
 * This does not check the validity of the language codes. At most it checks
 * that the codes are no more than 2 characters in length.
 */

// prettier-ignore
const validate = ({ name, description, intl = {} }) => {
  const invalidations = [];

  // name
  // [title] min=?, max=60
  // [og:title] min=?, max=?
  // [twitter:title] min=?, max=70
  if (!name || typeof name !== "string") {
    invalidations.push("[app.name] Required, and must be a non-empty string.");
  } else if (name.length < 1 || name.length > 60) {
    invalidations.push("[app.name] Must be between 1-60 characters.");
  }

  // description
  // [description] min=50, max=300
  // [og:description] min=?, max=?
  // [twitter:description] min=?, max=200
  if (!description || typeof description !== "string") {
    invalidations.push("[app.description] Required, and must be a string.");
  } else if (description && (description.length < 50 || description.length > 200)) {
    invalidations.push("[app.description] Must be between 50-200 characters.");
  }

  // intl.supportedLanguages
  if (!intl.supportedLanguages || !Array.isArray(intl.supportedLanguages)) {
    invalidations.push("[app.intl.supportedLanguages] Required, and must be an array");
  } else if (intl.supportedLanguages.length === 0) {
    invalidations.push("[app.intl.supportedLanguages] Must at least include the default language.");
  } else if (intl.supportedLanguages.some(l => !isNaN(parseFloat(l)) || !isNaN(parseInt(l)))) {
    invalidations.push("[app.intl.supportedLanguages] Must only include valid ISO 639-2 codes.");
  }

  // intl.defaultLanguage
  if (!intl.defaultLanguage || typeof intl.defaultLanguage !== "string") {
    invalidations.push("[app.intl.defaultLanguage] Required, and must be a string.");
  } else if (intl.defaultLanguage.length !== 2) {
    invalidations.push("[app.intl.defaultLanguage] Must be a valid ISO 639-2 code.");
  } else if (
    intl.supportedLanguages &&
    Array.isArray(intl.supportedLanguages) &&
    !intl.supportedLanguages.includes(intl.defaultLanguage)
  ) {
    invalidations.push("[app.intl.defaultLanguage] Default language must be included in app.intl.supportedLanguages");
  }

  return invalidations;
};

module.exports = validate;
// references
// https://moz.com/learn/seo/title-tag
