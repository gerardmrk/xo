import * as fs from "fs";
import * as util from "util";
import * as process from "process";
import debug from "debug";
import parseargs from "minimist";

import { ServerSettingsError } from "./errors";
import { validateSettings } from "./settings";
import { createServer, ConnectionsCache } from "./create-server";

const statAsync = util.promisify(fs.stat);
const unlinkAsync = util.promisify(fs.unlink);

const debugSrv = debug("server");

const main = async (settings: parseargs.ParsedArgs) => {
  const connections: ConnectionsCache = {};

  try {
    debugSrv("settings: %O", settings);
    validateSettings(settings);

    const { socketfile }: { [k: string]: string } = settings;

    try {
      debugSrv("checking for pre-existing socket file..");
      await statAsync(socketfile);

      debugSrv("unlinking previous socket file..", socketfile);
      await unlinkAsync(socketfile);
    } catch (error) {
      if ((<NodeJS.ErrnoException>error).code !== "ENOENT") throw error;

      debugSrv("socket file does not exist, will be created by server");
    }

    const server = createServer(connections);

    server.listen(socketfile);

    debugSrv("server listening on %s", socketfile);

    process.on("SIGINT", () => {
      debugSrv("performing cleanup..");

      for (const [id, conn] of Object.entries(connections)) {
        debugSrv("draining connection for %s", id); // well not really.. will implement soon
        conn.end();
      }

      server.close();

      debugSrv("server closed");
      process.exit(0);
    });
  } catch (error) {
    if (error instanceof ServerSettingsError) {
      error.printUsage();
      process.exit(1);
    } else {
      throw error;
    }
  }
};

main(parseargs(process.argv.slice(2)));
