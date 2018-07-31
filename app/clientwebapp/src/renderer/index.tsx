import * as net from "net";
// import * as protobuf from "protobufjs";
import renderer from "@renderer/renderer";
import * as Loadable from "react-loadable";

export { renderer };

const connectionHandler = (render: ReturnType<typeof renderer>): HandleConnFn => (
  client: net.Socket
): void => {
  client.on("data", () => {
    // 1. decode the proto message
    // 2. render the content based on the URL
    // 3. check for errors
  });
};

export const listenOnUnixSocket = async (sockAddr: string): Promise<void> => {
  await Loadable.preloadAll();
  const render = renderer(Loadable);

  // await protobuf.load()

  const server = net.createServer();
  const handleConnection = connectionHandler(render);

  server.on("connection", handleConnection);

  server.listen(sockAddr);
};

type HandleConnFn = (client: net.Socket) => void;
