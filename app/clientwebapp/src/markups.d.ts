// These types allow TypeScript to recognize import statements for markups that
// translates to plain JS objects (only those supported by and configured from Webpack)

declare module "*.json" {
  const content: {
    [k: string]: string | number | boolean | { [k: string]: string | number | boolean };
  };
  export default content;
}

// temporarily adding this type declaration for `@client/wrappers/IntlSettingsProvider.tsx`
// it works fine with the Webpack transpiler but the IDE keeps complaining about it.
// will find a fix soon (next year)
declare module "@translations/en.json" {
  const content: {
    [k: string]: string | number | boolean | { [k: string]: string | number | boolean };
  };
  export default content;
}

declare module "*.yml" {
  const content: {
    [k: string]: string | number | boolean | { [k: string]: string | number | boolean };
  };
  export default content;
}

declare module "*.yaml" {
  const content: {
    [k: string]: string | number | boolean | { [k: string]: string | number | boolean };
  };
  export default content;
}

declare module "*.toml" {
  const content: {
    [k: string]: string | number | boolean | { [k: string]: string | number | boolean };
  };
  export default content;
}
