const { render } = require("./dist/renderer/renderer");

(async () => {
  const content = await render({ url: "/" });
  console.log(content);
})();
