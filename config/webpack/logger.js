const { Signale } = require("signale");

const SKIPPED = "⬜️ ";
const ADDED = "✅ ";

const loggerOptions = {
  scope: "wpk",
  types: {
    setting: { label: "opt", badge: "i", color: "blue" },
    plugin: { label: "plugin", badge: "p", color: "yellow" },
    moduleRule: { label: "rule", badge: "r", color: "magenta" },
    moduleLoader: { label: "|---", badge: "l", color: "magenta" }
  }
};

class Logger {
  constructor(mode, source) {
    this._mode = mode;
    this._source = source;

    const globalLogger = new Signale(loggerOptions);
    this._logger = globalLogger.scope(
      `${this._mode.substring(0, 3)}:${this._source}`
    );
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
    for (let i = rule.use.length - 1; i >= 0; i--) {
      this.logModuleLoader(rule.use[i]);
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
