/* eslint-disable no-console */
const fs = require("fs");
const toml = require("toml");
const dotenv = require("dotenv");

const Logger = require("./logger");
const baseConfig = require("./base-config");
const loadPaths = require("../_helpers_/load-paths");

const paths = loadPaths();

const projectSettings = toml.parse(fs.readFileSync(paths.projectSettings, "utf8"));

class ConfigBuilder {
  constructor() {
    this._logger = undefined;
    this._pathAliases = [];
    this._plugins = [];
    this._moduleRules = [];
  }

  addPlugin(...args) {
    const [targetMode, targetSource] = args.slice(0, args.length - 1);
    this._plugins.push([targetMode, targetSource, args[args.length - 1]]);
  }

  addModuleRule(...args) {
    const [targetMode, targetSource] = args.slice(0, args.length - 1);
    this._moduleRules.push([targetMode, targetSource, args[args.length - 1]]);
  }

  build(buildSettings) {
    // load environment variables
    dotenv.config({ path: `${paths.rootDir}/.env` });
    if (process.env.APP_STAGE === undefined) {
      console.error("APP_STAGE env var must be set");
      process.exit(1);
    }

    ConfigBuilder.ParseAndValidateSettings(buildSettings);

    const accessibles = {
      paths,
      projectSettings,
      buildSettings,
      appStage: process.env.APP_STAGE,
      // set convenience flags
      devMode: buildSettings.mode === ConfigBuilder.Modes.DEV,
      clientBuild: buildSettings.source === ConfigBuilder.Sources.CLIENT,
      enableDevToolsInProd: buildSettings.prodDevTools === "enable",
      enableDebuggerInProd: buildSettings.prodDebugger === "enable",
      enableSourceMapsInProd: buildSettings.prodSourceMaps === "enable"
    };

    this._logger = new Logger(buildSettings.mode, buildSettings.source);
    this._logger.logSettings(buildSettings);

    const config = baseConfig(accessibles);

    // prettier-ignore
    this._moduleRules.forEach(([targetMode, targetSource, getRule]) => {
      const rule = getRule(accessibles);
      this._logger.logModuleRule(targetMode, targetSource, rule);
      if ((targetMode === buildSettings.mode || !targetMode) && (targetSource === buildSettings.source || !targetSource) && rule !== undefined) {// eslint-disable-line
        config.module.rules.push(rule);
      }
    });

    // prettier-ignore
    this._plugins.forEach(([targetMode, targetSource, getPlugin]) => {
      const plugin = getPlugin(accessibles);
      this._logger.logPlugin(targetMode, targetSource, plugin);
      if ((targetMode === buildSettings.mode || !targetMode) && (targetSource === buildSettings.source || !targetSource) && plugin !== undefined) {// eslint-disable-line
        config.plugins.push(plugin);
      }
    });

    return config;
  }
}

ConfigBuilder.Modes = {
  DEV: "development",
  PRO: "production"
};

ConfigBuilder.Sources = {
  CLIENT: "client",
  RENDERER: "renderer"
};

// Allowed settings and their respective options for the build.
// convention: first value in the array will be used as if none is specified.
ConfigBuilder.ValidSettings = {
  mode: [ConfigBuilder.Modes.DEV, ConfigBuilder.Modes.PRO],
  source: [ConfigBuilder.Sources.CLIENT, ConfigBuilder.Sources.RENDERER],
  prodDevTools: ["disable", "enable"],
  prodDebugger: ["disable", "enable"],
  prodSourceMaps: ["disable", "enable"]
};

// Parses and validate settings for the build config.
ConfigBuilder.ParseAndValidateSettings = settings => {
  if (!settings) {
    console.error("No settings provided for build");
    process.exit(1);
  }

  for (let [setting, option] of Object.entries(settings)) {
    const validOptions = ConfigBuilder.ValidSettings[setting];

    if (option === undefined && !!validOptions) {
      // use the first value in the array as the default value
      option = validOptions[0];
    }

    // prettier-ignore
    if (!validOptions) {
      // invalid/unknown setting
      console.error(`\nunknown setting: '--env.${setting}'`);
      console.info(`valid settings:\n--env.${Object.keys(ConfigBuilder.ValidSettings).join("\n--env.")}\n`);
      process.exit(1);
    }

    // prettier-ignore
    if (
      !validOptions.includes(option) ||
      !validOptions.includes(option.toString().trim()) ||
      !validOptions.includes(option.toString().trim().toLowerCase())
    ) {
      // valid setting, invalid/unknown option
      console.error(`\ninvalid setting: '--env.${setting}=${option}'`);
      console.info(`valid options: ${validOptions.join(', ')}\n`);
      process.exit(1);
    }

    // since option is valid and there's no need to log original value to
    // console anymore, we mutate it here.
    option = option
      .toString()
      .trim()
      .toLowerCase();

    continue;
  }
};

module.exports = ConfigBuilder;
