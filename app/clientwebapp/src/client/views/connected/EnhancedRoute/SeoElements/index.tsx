import * as React from "react";
import { Helmet } from "react-helmet";

import appLogo from "@client/logo.png?noembed";
import withSettings, { InjectedSettingsProps } from "@client/views/wrappers/withSettings";

export interface SeoProps {
  readonly routePath?: string;
  readonly title?: string;
  readonly description?: string;
  readonly routeType?: string;
  readonly imageURL?: string;
  readonly imageAlt?: string;
  readonly twitterCardType?: "summary" | "summary_large_image" | "app" | "player";
}

export interface LocalProps extends SeoProps, InjectedSettingsProps {}

export type Props = LocalProps;

export type State = {};

export class SeoElements extends React.PureComponent<Props, State> {
  private titleTemplate: string;
  private pageLink: string | undefined;

  public constructor(props: Props) {
    super(props);

    const {
      routePath,
      settings: { appSettings }
    } = props;

    this.titleTemplate = `${appSettings.name} | %s`;
    this.pageLink = routePath
      ? `${appSettings.urls[process.env.APP_STAGE as string]}${routePath}`
      : undefined;
  }

  public render(): React.ReactNode {
    const {
      routeType = "website",
      imageAlt = "website logo",
      twitterCardType = "summary",
      settings: { appSettings }
    } = this.props;

    // not exactly sane defaults, but with a bundle size this big it's never
    // going to be fully SEO optimized anyways.
    const pageOrAppTitle: string = this.props.title || appSettings.name;
    const pageOrAppDescription: string = this.props.description || appSettings.description;
    const pageImageOrAppLogo: string = this.props.imageURL || appLogo;

    return (
      <Helmet titleTemplate={this.titleTemplate}>
        {/* html5 */}
        {!!this.pageLink && <link rel="canonical" href={this.pageLink} />}
        <title>{pageOrAppTitle}</title>
        <meta name="description" content={pageOrAppDescription} />
        {/* opengraph */}
        <meta name="og:site_name" content={appSettings.name} />
        {!!this.pageLink && <meta name="og:url" content={this.pageLink} />}
        <meta name="og:type" content={routeType} />
        <meta name="og:title" content={pageOrAppTitle} />
        <meta name="og:description" content={pageOrAppDescription} />
        <meta name="og:image" content={pageImageOrAppLogo} />
        <meta name="og:image:alt" content={imageAlt} />
        {/* twitter */}
        <meta name="twitter:card" content={twitterCardType} />
        {!!this.pageLink && <meta name="twitter:url" content={this.pageLink} />}
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

export default withSettings<LocalProps>(SeoElements);
