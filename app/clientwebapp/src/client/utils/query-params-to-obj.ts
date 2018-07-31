// prettier-ignore
export default (urlQueryParams: string): { [k: string]: string } => {
  return decodeURIComponent(urlQueryParams)
    .slice(1)
    .split("&")
    .map((str: string): string[] => str.split("="))
    .reduce((a: { [k: string]: string }, b: string[]): { [k: string]: string } => ({ ...a, [b[0]]: b[1] || "" }), {});
};
