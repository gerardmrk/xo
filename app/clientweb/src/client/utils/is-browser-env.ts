/**
 * check if the app is currently in a browser environment
 * (this is taken from react's internal canUseDOM module)
 */
// tslint:disable:no-typeof-undefined
export const isBrowserEnv = (): boolean => {
  return typeof window !== "undefined" && !!window.document && !!window.document.createElement;
};

export default isBrowserEnv;
