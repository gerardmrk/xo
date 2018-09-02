import * as process from "process";

import debug from "debug";
import parseargs from "minimist";

import udsServer from "./server.uds";
import { validateSettings } from "./settings";
import { ServerSettingsError } from "./errors";

const debugSrv = debug("server");

const main = async (settings: parseargs.ParsedArgs) => {
  try {
    debugSrv("settings: %O", settings);
    validateSettings(settings);

    switch (<string>settings.mode) {
      case "uds":
        await udsServer({ socketfile: <string>settings.addr });
      case "http":
        await udsServer({ socketfile: <string>settings.addr });
      default:
    }
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
