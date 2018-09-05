const fs = require("fs");
const util = require("util");
const toml = require("toml");
const jsonfile = require("jsonfile");
const unchanged = require("unchanged");

const loadPaths = require("../../config/_helpers_/load-paths");

const paths = loadPaths();

// const readFile = util.promisify(fs.readFileSync);
const readJSON = util.promisify(jsonfile.readFile);
const writeJSON = util.promisify(jsonfile.writeFile);

(async () => {
  try {
    const proj = fs.readFileSync(paths.projectSettings, "utf8");
    const projectSettings = await toml.parse(proj);

    // get the default language
    // this is assumed to be the most recently updated file
    const defaultLang = projectSettings.app.language;
    const defaultTranslations = await readJSON(`${paths.translationsDir}/${defaultLang}.json`);

    // fetch the other translations
    let translations = await Promise.all(
      projectSettings.intl.supportedLanguages.filter(lang => lang !== defaultLang).map(lang => {
        return [lang, readJSON(`${paths.translationsDir}/${lang}.json`)];
      })
    );

    // perform deep-merge on all other translation files
    translations = translations.map(([lang, trans]) => {
      return [lang, unchanged.merge(null, trans, defaultTranslations)];
    });

    // write merged translations back to file
    return await Promise.all(
      translations.map(([lang, trans]) => {
        writeJSON(`${paths.translationsDir}/${lang}.json`, trans, {
          spaces: 2
        });
      })
    );
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
  }
})();
