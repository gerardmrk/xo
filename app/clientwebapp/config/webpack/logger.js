const { Signale } = require("signale");

const SKIPPED = "⬜️ ";
const ADDED = "✅ ";

const loggerOptions = {
  scope: "wpk",
  types: {
    setting: { label: "option", badge: "⚙️", color: "blue" },
    plugin: { label: "plugin", badge: "🔌", color: "yellow" },
    moduleRule: { label: "rule", badge: "📍", color: "magenta" },
    moduleLoader: { label: " |   ", badge: "↪️", color: "magenta" }
  }
};

class Logger {
  constructor(mode, source) {
    this._mode = mode;
    this._source = source;

    const globalLogger = new Signale(loggerOptions);
    this._logger = globalLogger.scope(`${this._mode.substring(0, 3)}:${this._source}`);
  }

  logSettings(settings) {
    for (let [k, v] of Object.entries(settings)) {
      this._logger.setting(`${k} = ${v}`);
    }
  }

  logPlugin(targetMode, targetSource, plugin) {
    const prefix = this._getPrefix(targetMode, targetSource);
    this._logger.plugin(`${prefix} ${plugin.constructor.name}`);
  }

  logModuleRule(targetMode, targetSource, rule) {
    const prefix = this._getPrefix(targetMode, targetSource);
    this._logger.moduleRule(`${prefix} ${rule.test}`);
    const loaders = rule.use || rule.oneOf[rule.oneOf.length - 1].use;
    for (let i = loaders.length - 1; i >= 0; i--) {
      this.logModuleLoader(loaders[i]);
    }
  }

  logModuleLoader(loader) {
    this._logger.moduleLoader(`\t↓ ${loader.loader}`);
  }

  _getPrefix(targetMode, targetSource) {
    return (targetMode === this._mode || !targetMode) &&
      (targetSource === this._source || !targetSource)
      ? ADDED
      : SKIPPED;
  }
}

module.exports = Logger;
