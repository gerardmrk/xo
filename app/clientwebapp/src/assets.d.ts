/* ---------------------------------------------------------------------------------------------------------------------
   STYLESHEETS
   These types allow TypeScript to recognize import statements for CSS framework
   files. The CSS rules themselves are not imported but are transpiled and:
     - extracted into a separate stylesheet for production builds.
     - injected into <head> element as <style> blocks for development.
--------------------------------------------------------------------------------------------------------------------- */

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

/* ---------------------------------------------------------------------------------------------------------------------
   MARKUP FILES
   These types allow TypeScript to recognize import statements for markups files
   which translates to a plain JS object.
--------------------------------------------------------------------------------------------------------------------- */
// declare module "*.json" {
//   const content: any;
//   export default content;
// }

declare module "*.yml" {
  const content: object;
  export default content;
}

declare module "*.yaml" {
  const content: object;
  export default content;
}

declare module "*.toml" {
  const content: object;
  export default content;
}

/* ---------------------------------------------------------------------------------------------------------------------
   IMAGE FILES
   These types allow TypeScript to recognize import statements for image files.
     - if the image file is more than 10kb, or its been suffixed with the 'noembed' query,
       the image's resource path is used.
     - otherwise the image's datauri is extracted and embedded into the code.
--------------------------------------------------------------------------------------------------------------------- */
declare module "*.ico" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.ico?noembed" {
  const resourcePath: string;
  export default resourcePath;
}

declare module "*.svg" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.svg?noembed" {
  const resourcePath: string;
  export default resourcePath;
}

declare module "*.jpg" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.jpg?noembed" {
  const resourcePath: string;
  export default resourcePath;
}

declare module "*.jpeg" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.jpeg?noembed" {
  const resourcePath: string;
  export default resourcePath;
}

declare module "*.png" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.png?noembed" {
  const resourcePath: string;
  export default resourcePath;
}

declare module "*.gif" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.gif?noembed" {
  const resourcePath: string;
  export default resourcePath;
}

declare module "*.tiff" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.tiff?noembed" {
  const resourcePath: string;
  export default resourcePath;
}

declare module "*.bmp" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.bmp?noembed" {
  const resourcePath: string;
  export default resourcePath;
}
