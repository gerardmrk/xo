import * as fs from "fs";
import * as util from "util";
import * as process from "process";

import debug from "debug";

import { createServer, ConnectionsCache } from "./create-server";

const statAsync = util.promisify(fs.stat);
const unlinkAsync = util.promisify(fs.unlink);

const debugSrv = debug("server");

export const server = async ({ socketfile }: { [k: string]: string }) => {
  const connections: ConnectionsCache = {};

  try {
    try {
      debugSrv("checking for pre-existing socket file..");
      await statAsync(socketfile);

      debugSrv("unlinking previous socket file..", socketfile);
      await unlinkAsync(socketfile);
    } catch (error) {
      if ((<NodeJS.ErrnoException>error).code !== "ENOENT") throw error;

      debugSrv("socket file does not exist, will be created by server");
    }

    const socketServer = await createServer(connections);

    socketServer.listen(socketfile);

    debugSrv("server listening on %s", socketfile);

    process.on("SIGINT", () => {
      debugSrv("performing cleanup..");

      for (const [id, conn] of Object.entries(connections)) {
        debugSrv("draining connection for %s", id); // well not really.. will implement soon
        conn.end();
      }

      socketServer.close();

      debugSrv("server closed");
      process.exit(0);
    });
  } catch (error) {
    throw error;
  }
};

export default server;
