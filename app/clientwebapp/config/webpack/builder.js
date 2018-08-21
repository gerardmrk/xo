/* eslint-disable no-console */
const fs = require("fs");
const toml = require("toml");
const dotenv = require("dotenv");

const Logger = require("./logger");
const baseConfig = require("./base-config");
const loadPaths = require("../_helpers_/load-paths");
const loadSettings = require("../_helpers_/load-settings");

const paths = loadPaths();

const projectSettings = toml.parse(fs.readFileSync(paths.projectSettings, "utf8"));

// prettier-ignore
class ConfigBuilder {
  constructor() {
    // poor-man's string enum section A
    this._validAdderOptions = [
      ConfigBuilder.Modes.DEV,
      ConfigBuilder.Modes.PRO,
      ConfigBuilder.Sources.CLIENT,
      ConfigBuilder.Sources.RENDERER
    ];

    // poor-man's string enum section B
    this._adderModeOption = {
      [ConfigBuilder.Modes.DEV]: ConfigBuilder.Modes.DEV,
      [ConfigBuilder.Modes.PRO]: ConfigBuilder.Modes.PRO
    };

    // poor-man's string enum section C
    this._adderSourceOption = {
      [ConfigBuilder.Sources.CLIENT]: ConfigBuilder.Sources.CLIENT,
      [ConfigBuilder.Sources.RENDERER]: ConfigBuilder.Sources.RENDERER
    };

    this._logger = undefined;

    this._pathAliases = [];

    // [mode, source, plugin][]
    this._plugins = [];

    // [mode, source, module-rule][]
    this._moduleRules = [];
  }

  _getAdderOptions(pos, method, args) {
    let targetMode, targetSource, pluginOrModRule;

    if (
      args.length > 1 &&
      !args.slice(0, args.length - 1).every(arg => this._validAdderOptions.includes(arg))
    ) {
      console.error(`\n[ERROR] ${pos}th ${method}() call in 'webpack.config.js' contains invalid arguments\n`);
      throw new Error();
    }

    switch (args.length) {
      case 1:
        pluginOrModRule = args[0];
        targetMode = undefined;
        targetSource = undefined;
        break;
      case 2:
        pluginOrModRule = args[1];
        targetMode = this._adderModeOption[args[0]];
        targetSource = this._adderSourceOption[args[0]];
        break;
      case 3:
        pluginOrModRule = args[2];
        targetMode = this._adderModeOption[args[0]] || this._adderModeOption[args[1]];
        targetSource = this._adderSourceOption[args[0]] || this._adderSourceOption[args[1]];
        break;
      default:
        console.error(`\n[ERROR] ${pos}th ${method}() call in 'webpack.config.js' needs 1-3 arguments\n`);
        throw new Error();
    }

    return [targetMode, targetSource, pluginOrModRule];
  }

  addPlugin(...args) {
    this._plugins.push(this._getAdderOptions(
      this._plugins.length + 1,
      "addPlugin",
      args
    ));
  }

  addModuleRule(...args) {
    this._moduleRules.push(this._getAdderOptions(
      this._moduleRules.length + 1,
      "addModuleRule",
      args
    ));
  }

  async build(buildSettings) {
    // load environment variables
    dotenv.config({ path: `${paths.rootDir}/.env` });

    if (process.env.APP_STAGE === undefined) {
      // this is the only environment variable we DO NOT set defaults for.
      console.error("APP_STAGE env var must be set");
      process.exit(1);
    }

    ConfigBuilder.ParseAndValidateBuildFlags(buildSettings);

    const settings = await loadSettings();

    const accessibles = {
      paths,
      settings,
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
ConfigBuilder.ValidOptions = {
  mode: [ConfigBuilder.Modes.DEV, ConfigBuilder.Modes.PRO],
  source: [ConfigBuilder.Sources.CLIENT, ConfigBuilder.Sources.RENDERER],
  prodDevTools: ["disable", "enable"],
  prodDebugger: ["disable", "enable"],
  prodSourceMaps: ["disable", "enable"]
};

// Parses and validate settings for the build config.
ConfigBuilder.ParseAndValidateBuildFlags = options => {
  if (!options) {
    console.error("No options provided for build");
    process.exit(1);
  }

  for (let [optName, optValue] of Object.entries(options)) {
    const validOptionValues = ConfigBuilder.ValidOptions[optName];

    if (optValue === undefined && !!validOptionValues) {
      // use the first value in the array as the default value
      optValue = validOptionValues[0];
    }

    if (!validOptionValues) {
      // invalid/unknown option name
      console.error(`\nunknown option: '--env.${optName}'`);
      process.exit(1);
    }

    // prettier-ignore
    if (
      !validOptionValues.includes(optValue) ||
      !validOptionValues.includes(optValue.toString().trim()) ||
      !validOptionValues.includes(optValue.toString().trim().toLowerCase())
    ) {
      // valid option name, invalid/unknown option value
      console.error(`\ninvalid option: '--env.${optName}=${optValue}'`);
      process.exit(1);
    }

    // since option is valid and there's no need to log original value to
    // console anymore, we mutate it here.
    optValue = optValue
      .toString()
      .trim()
      .toLowerCase();

    continue;
  }
};

module.exports = ConfigBuilder;
