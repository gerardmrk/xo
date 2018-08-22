const fs = require("fs");
const path = require("path");
const util = require("util");
const toml = require("toml");

const asyncReadfile = util.promisify(fs.readFile);

const configDir = path.resolve(__dirname, "..");
const settingsFiles = ["app.toml", "build.toml", "services.toml"];

// prettier-ignore
module.exports = async ({ applyAppStage = true } = {}) => {
  const settings = (await Promise.all(
    settingsFiles.map(f => {
      return asyncReadfile(path.join(configDir, f), { encoding: "utf8" })
        .then(content => {
          return toml.parse(content);
        })
        .then(setting => {
          return [path.parse(f).name, setting];
        });
    })
  )).reduce((obj, [sname, sdata]) => ({
    ...obj,
    [sname]: sdata
  }), {});

  if (applyAppStage) {
    settings.build = {
      ...settings.build,
      ...settings.build.envs[process.env.APP_STAGE]
    }
    delete settings.build["envs"];
  }

  return settings;
};
