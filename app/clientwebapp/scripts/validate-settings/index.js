/* eslint-disable no-console */
const loadSettings = require("../../config/_helpers_/load-settings");

const main = async () => {
  const settings = await loadSettings({ applyAppStage: false });

  try {
    let invalidations = [];

    for (const [sname, sdata] of Object.entries(settings)) {
      invalidations.push(require(`./validator.${sname}`)(sdata));
    }

    invalidations = invalidations.reduce((a, b) => [...a, ...b], []);

    if (invalidations.length === 0) {
      console.info("Settings validated. Everything seems correct!");
    } else {
      console.warn("Invalid settings detected:");
      invalidations.forEach(i => console.error(i));
      process.exit(1);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
