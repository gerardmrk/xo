/* eslint-disable no-console */
const net = require("net");
const util = require("util");

const proto = require("./src/proto/js");

const client = net.createConnection("/tmp/server.sock");

client.on("connect", () => {
  console.info("[CLIENT] connected");
  client.write(proto.RendererParams.encode({ url: "/register", lang: "en" }).finish());
});

client.on("data", data => {
  console.info("[CLIENT] data received");

  console.log("[data:raw]    ", data);

  const response = proto.RendererResponse.decode(data);
  console.log("[data:decoded]", response);

  response.renderedHead = new util.TextDecoder().decode(response.renderedHead);
  response.renderedBody = new util.TextDecoder().decode(response.renderedBody);
  response.renderedStyles = new util.TextDecoder().decode(response.renderedStyles);
  response.renderedScripts = new util.TextDecoder().decode(response.renderedScripts);
  console.log("[data:parsed] ", response);

  client.end();
  process.exit(0);
});

client.on("error", error => {
  console.error("[CLIENT] error", error);
  process.exit(1);
});
