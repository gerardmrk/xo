const fs = require("fs");
const path = require("path");
const toml = require("toml");

const loadPaths = () => {
  const rootDir = path.resolve(__dirname, "..", "..");

  const paths = toml.parse(fs.readFileSync(path.join(rootDir, "config/_.paths.toml")));

  for (const [k, v] of Object.entries(paths)) {
    paths[k] = path.join(rootDir, v);
  }

  paths["rootDir"] = rootDir;

  return paths;
};

module.exports = loadPaths;
