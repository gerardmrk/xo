import * as process from "process";

type SocketServerOptions = {
  socketfile?: string;
};

class InvalidOptionError extends Error {
  public static IsMissing: string = "MISSING";
  public static IsUnknown: string = "UNKNOWN";

  public constructor(
    option: string | undefined,
    value: string | undefined,
    kind: typeof InvalidOptionError.IsMissing | typeof InvalidOptionError.IsUnknown
  ) {
    const message = !!!option ? "" : "";
    super(message);
  }
}

// [PURE] turns `[--opt1=A, --opt2=B]` into `{ opt1: A, opt2: B }`
export const parseOptions = (opts: string[]): SocketServerOptions => {
  return opts.reduce((parsed: SocketServerOptions, opt: string) => {
    const [k, v]: string[] = opt.split("=");
    return { ...parsed, [k.slice(2)]: v };
  }, {});
};

// [SIDEEFFECT] may throw a typed error
export const validateOptions = (opts: SocketServerOptions): SocketServerOptions => {
  if (!!!opts.socketfile) {
    throw new InvalidOptionError("socketfile", opts.socketfile, InvalidOptionError.IsMissing);
  }
  return opts;
};

(async (options: string[]) => {
  try {
  } catch (error) {
    process.exit(1);
  }
  // if (cluster.isMaster) {
  //   console.info(`MASTER [${process.pid}] is running..`);
  //   for (let i = 0; i < numCPUs; i++) cluster.fork();
  //   cluster.on("exit", (worker, code, signal) => {
  //     console.info(`WORKER [${worker.process.pid}] exited with ${signal}`);
  //   });
  // } else {
  // }
})(process.argv);
