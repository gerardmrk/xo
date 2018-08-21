const fs = require("fs");
const path = require("path");
const util = require("util");
const toml = require("toml");

const asyncReadfile = util.promisify(fs.readFile);

const configDir = path.resolve(__dirname, "..");
const settingsFiles = ["app.toml", "build.toml", "services.toml"];

module.exports = async () => {
  const settings = await Promise.all(
    settingsFiles.map(f => {
      return asyncReadfile(path.join(configDir, f), { encoding: "utf8" })
        .then(content => {
          return toml.parse(content);
        })
        .then(setting => {
          return [path.parse(f).name, setting];
        });
    })
  );

  return settings.reduce(
    (obj, [sname, sdata]) => ({
      ...obj,
      [sname]: sdata
    }),
    {}
  );
};
