import * as net from "net";
import debug from "debug";
import uuidv4 from "uuid/v4";
import Loadable from "react-loadable";

import renderer, { Manifest } from "@renderer/engine/renderer";
import asyncModuleStats from "../../dist/client/async-modules.json";

const debugConn = debug("server:conn");

export type ConnectionsCache = {
  [connID: string]: net.Socket;
};

const connectionHandler = (renderComponent: (p: Uint8Array) => Promise<Uint8Array>) => (
  conns: ConnectionsCache
) => (conn: net.Socket): void => {
  const connID: string = uuidv4();

  debugConn("[%s] connection established", connID);
  conns[connID] = conn;

  conn.on("data", async (data: Buffer) => {
    debugConn("[%s] 'data' event", connID);
    const resp = await renderComponent(data);
    conn.write(resp);
  });

  conn.on("error", error => {
    conn.write(error);
  });

  conn.on("end", () => {
    debugConn("[%s] 'end' event", connID);
    delete conns[connID];
  });
};

export const createServer = async (conns: ConnectionsCache): Promise<net.Server> => {
  await Loadable.preloadAll();
  const renderComponent = renderer(Loadable)(<Manifest>asyncModuleStats);
  const handleConnection = connectionHandler(renderComponent)(conns);

  return net.createServer(handleConnection);
};
