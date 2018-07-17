const path = require("path");

const _rootDir = path.resolve(__dirname, "..", "..");
const _configDir = `${_rootDir}/config`;

const paths = {
  rootDir: _rootDir,
  configDir: _configDir,
  i18nDir: `${_configDir}/i18n`,
  outputDir: `${_rootDir}/dist`,
  linterRulesDir: `${_configDir}/syntax`,
  clientSource: `${_rootDir}/src/client`,
  rendererSource: `${_rootDir}/src/renderer`,
  projectSettings: `${_configDir}/project.toml`,
  translationsDir: `${_configDir}/i18n/translations`,
  rootHTMLTemplate: `${_rootDir}/src/client/index.html`,
  themeConfig: `${_rootDir}/src/client/views/theme/theme.config`,
  asyncLoadableModuleStats: `${_rootDir}/dist/client/async-loadable-modules.json`
};

module.exports = paths;
