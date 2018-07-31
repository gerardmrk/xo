/**
 * use this to simulate latency for services
 * or to simulate slow loading ui
 */
export default async (ms: number): Promise<void> =>
  new Promise(
    (resolve: (value: void) => void): NodeJS.Timer => setTimeout(resolve, ms)
  );
