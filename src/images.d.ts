// These types allow TypeScript to recognize import statements for image files:
// - if the image file is less than 10kb, the image's data uri is imported
// - otherwise the image's resource path is imported instead.

declare module "*.ico" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.ico?noembed" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}

declare module "*.svg" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.svg?noembed" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}

declare module "*.jpg" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.jpg?noembed" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}

declare module "*.jpeg" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.jpeg?noembed" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}

declare module "*.png" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.png?noembed" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}

declare module "*.gif" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.gif?noembed" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}

declare module "*.tiff" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.tiff?noembed" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}

declare module "*.bmp" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
declare module "*.bmp?noembed" {
  const blobOrResourcePath: string;
  export default blobOrResourcePath;
}
