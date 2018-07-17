// These types allow TypeScript to recognize import statements for CSS framework files.
// The CSS rules themselves are not imported but are transpiled and:
// - extracted into a separate stylesheet for production builds
// - injected into <head> element as <style> blocks for development

declare module "*.css" {
  const cssClassNames: { readonly [scopedOrGlobalClassName: string]: string };
  export default cssClassNames;
}

declare module "*.less" {
  const cssClassNames: { readonly [scopedOrGlobalClassName: string]: string };
  export default cssClassNames;
}

declare module "*.scss" {
  const cssClassNames: { readonly [scopedOrGlobalClassName: string]: string };
  export default cssClassNames;
}

declare module "*.sass" {
  const cssClassNames: { readonly [scopedOrGlobalClassName: string]: string };
  export default cssClassNames;
}
