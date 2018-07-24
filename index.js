/**
 * Stand-in HTTP server
 */
const { renderer } = require("./dist/renderer/renderer");
const moduleManifest = require("./dist/client/async-modules.json");

(async () => {
  const render = renderer(moduleManifest);
  const content = await render({ url: "/login" });
  console.log(content); // eslint-disable-line
})();
