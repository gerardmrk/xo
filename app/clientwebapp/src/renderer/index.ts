import * as process from "process";
import * as parseargs from "minimist";

import * as serverErrors from "./errors";
import { validateSettings } from "./settings";
import { createServer } from "./create-server";

(async (settings: parseargs.ParsedArgs) => {
  try {
    validateSettings(settings);
    const { socketfile } = settings;

    const server = createServer();
    server.listen(socketfile);
  } catch (error) {
    if (error instanceof serverErrors.ServerSettingsError) {
      error.printUsage();
      process.exit(1);
    } else {
      throw error;
    }
  }
})(parseargs(process.argv.slice(2)));
