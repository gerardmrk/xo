const fs = require("fs");
const path = require("path");
const util = require("util");
const toml = require("toml");

const validateAppSettings = require("./validator.app");
const validateBuildSettings = require("./validator.build");
const validateServicesSettings = require("./validator.services");

const asyncReadfile = util.promisify(fs.readFile);

const main = async () => {
  const configDir = path.resolve(__dirname, "..", "..", "config");

  const settingsFiles = [
    { file: "app.toml", validate: validateAppSettings },
    { file: "build.toml", validate: validateBuildSettings },
    { file: "services.toml", validate: validateServicesSettings }
  ];

  try {
    let invalidations = await Promise.all(
      settingsFiles.map(({ file, validate }) => {
        return asyncReadfile(path.join(configDir, file), { encoding: "utf8" })
          .then(content => {
            return toml.parse(content);
          })
          .then(settings => {
            return validate(settings);
          });
      })
    );

    invalidations = invalidations.reduce((a, b) => [...a, ...b], []);

    if (invalidations.length === 0) {
      console.info("Settings validated. Everything seems correct!"); // eslint-disable-line
      process.exit(0);
    } else {
      console.warn("Invalid settings detected:"); // eslint-disable-line
      invalidations.forEach(i => console.error(i)); // eslint-disable-line
      process.exit(1);
    }
  } catch (error) {
    console.error(error); // eslint-disable-line
    process.exit(1);
  }
};

main();
