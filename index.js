const { render } = require("./dist/renderer");

(async () => {
  const content = await render({ url: "/" });
  console.log(content);
})();
