import * as net from "net";
import * as uuidv4 from "uuid/v4";

type ConnectionsCache = {
  [connID: string]: net.Socket;
};

export const connectionHandler = (conns: ConnectionsCache) => (conn: net.Socket): void => {
  const connID: string = uuidv4();

  conns[connID] = conn;

  conn.on("data", (data: Buffer) => {
    const msg: string = data.toString();
    conn.write(`[RESP] ${msg}`);
  });

  conn.on("end", () => {
    delete conns[connID];
  });
};

export const createServer = (): net.Server => {
  const connections: ConnectionsCache = {};
  const handleConnection = connectionHandler(connections);

  return net.createServer(handleConnection);
};
