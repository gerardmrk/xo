import * as net from "net";
import debug from "debug";
import uuidv4 from "uuid/v4";

const debugConn = debug("server:conn");

export type ConnectionsCache = {
  [connID: string]: net.Socket;
};

const connectionHandler = (conns: ConnectionsCache) => (conn: net.Socket): void => {
  const connID: string = uuidv4();

  debugConn("[%s] connection established", connID);
  conns[connID] = conn;

  conn.on("data", (data: Buffer) => {
    debugConn("[%s] 'data' event", connID);
    const msg: string = data.toString();
    conn.write(`[RESP] ${msg}`);
  });

  conn.on("end", () => {
    debugConn("[%s] 'end' event", connID);
    delete conns[connID];
  });
};

export const createServer = (conns: ConnectionsCache): net.Server => {
  const handleConnection = connectionHandler(conns);

  return net.createServer(handleConnection);
};
