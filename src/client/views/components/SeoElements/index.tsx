import * as React from "react";
import { Helmet } from "react-helmet";

import withAppSettings, { InjectedAppSettingsProps } from "@client/views/hocs/withAppSettings";

export interface LocalProps extends InjectedAppSettingsProps {
  readonly title: string;
  readonly description?: string;
  readonly routeLink: string;
  readonly routeType?: string;
  readonly imageURL?: string;
  readonly imageAlt?: string;
  readonly imageType?: string;
  readonly imageWidth?: string;
  readonly imageHeight?: string;
  readonly twitterCardType?: "summary" | "summary_large_image" | "app" | "player";
  readonly twitterHandleSite?: string;
  readonly twitterHandleCreator?: string;
}

export type Props = LocalProps;

export type State = {};

export class SeoElements extends React.PureComponent<Props, State> {
  public render(): JSX.Element | null {
    const {
      routeLink,
      routeType = "website",
      imageAlt = "website logo",
      imageURL,
      imageType,
      imageWidth,
      imageHeight,
      twitterCardType = "summary",
      twitterHandleSite,
      twitterHandleCreator,
      appSettings
    } = this.props;

    // not exactly sane defaults, but with a bundle size this big it's never
    // going to be fully SEO optimized anyways.
    const pageOrAppTitle = this.props.title || appSettings.name;
    const pageOrAppDescription = this.props.description || appSettings.description;

    return (
      <Helmet>
        {/* html5 */}
        <link rel="canonical" href={routeLink} />
        <title>{pageOrAppTitle}</title>
        <meta name="description" content={pageOrAppDescription} />
        {/* opengraph */}
        <meta name="og:site_name" content={appSettings.name} />
        <meta name="og:url" content={routeLink} />
        <meta name="og:type" content={routeType} />
        <meta name="og:title" content={pageOrAppTitle} />
        <meta name="og:description" content={pageOrAppDescription} />
        {imageURL && <meta name="og:image" content={imageURL} />}
        {imageURL && <meta name="og:image:alt" content={imageAlt} />}
        {imageURL && imageType && <meta name="og:image:type" content={imageType} />}
        {imageURL && imageWidth && <meta name="og:image:width" content={imageWidth} />}
        {imageURL && imageHeight && <meta name="og:image:height" content={imageHeight} />}
        {/* twitter */}
        <meta name="twitter:card" content={twitterCardType} />
        <meta name="twitter:url" content={routeLink} />
        <meta name="twitter:title" content={pageOrAppTitle} />
        <meta name="twitter:description" content={pageOrAppDescription} />
        {imageURL && <meta name="twitter:image" content={imageURL} />}
        {imageURL && <meta name="twitter:image:alt" content={imageAlt} />}
        {twitterHandleSite && <meta name="twitter:site" content={twitterHandleSite} />}
        {twitterHandleCreator && <meta name="twitter:creator" content={twitterHandleCreator} />}
        {/* itemprop */}
        <meta itemProp="name" content={pageOrAppTitle} />
        <meta itemProp="description" content={pageOrAppDescription} />
        {imageURL && <meta itemProp="image" content={imageURL} />}
      </Helmet>
    );
  }
}

export default withAppSettings<LocalProps>(SeoElements);
