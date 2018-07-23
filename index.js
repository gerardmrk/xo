const { render } = require("./dist/renderer/renderer");

(async () => {
  const content = await render({ url: "/login" });
  console.log(content);
})();
