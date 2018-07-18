import * as React from "react";
import { Helmet } from "react-helmet";

import appLogo from "@client/logo.png";
import withAppSettings, { InjectedAppSettingsProps } from "@client/views/hocs/withAppSettings";

export interface LocalProps extends InjectedAppSettingsProps {
  readonly title: string;
  readonly description?: string;
  readonly routeLink: string;
  readonly routeType?: string;
  readonly imageURL?: string;
  readonly imageAlt?: string;
  readonly twitterCardType?: "summary" | "summary_large_image" | "app" | "player";
}

export type Props = LocalProps;

export type State = {};

export class SeoElements extends React.PureComponent<Props, State> {
  public render(): JSX.Element | null {
    const {
      routeLink,
      routeType = "website",
      imageAlt = "website logo",
      twitterCardType = "summary",
      appSettings
    } = this.props;

    // not exactly sane defaults, but with a bundle size this big it's never
    // going to be fully SEO optimized anyways.
    const pageOrAppTitle = this.props.title || appSettings.name;
    const pageOrAppDescription = this.props.description || appSettings.description;
    const pageImageOrAppLogo = this.props.imageURL || appLogo;

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
        <meta name="og:image" content={pageImageOrAppLogo} />
        <meta name="og:image:alt" content={imageAlt} />
        {/* twitter */}
        <meta name="twitter:card" content={twitterCardType} />
        <meta name="twitter:url" content={routeLink} />
        <meta name="twitter:title" content={pageOrAppTitle} />
        <meta name="twitter:description" content={pageOrAppDescription} />
        <meta name="twitter:image" content={pageImageOrAppLogo} />
        <meta name="twitter:image:alt" content={imageAlt} />
        {/* itemprop */}
        <meta itemProp="name" content={pageOrAppTitle} />
        <meta itemProp="description" content={pageOrAppDescription} />
        <meta itemProp="image" content={pageImageOrAppLogo} />
      </Helmet>
    );
  }
}

export default withAppSettings<LocalProps>(SeoElements);
