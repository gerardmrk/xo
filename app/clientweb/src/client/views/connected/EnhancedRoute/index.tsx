import * as React from "react";
import { connect } from "react-redux";
import { LocationDescriptorObject } from "history";
import {
  Route as BaseRoute,
  Redirect,
  RouteComponentProps
} from "react-router-dom";

import AppTypes from "AppTypes";
import SeoElements from "@client/views/connected/EnhancedRoute/SeoElements";
import {
  RouteProps,
  DEFAULT_PRIVATE_PATH,
  DEFAULT_AUTH_PATH
} from "@client/views/routes";

export type StoreProps = {
  isLoggedIn: boolean;
};

export type DispatchProps = {};

export type Props = StoreProps & DispatchProps & RouteProps & {};

export type State = {};

export class Route extends React.Component<Props, State> {
  private targetRoute: LocationDescriptorObject = {
    pathname: DEFAULT_AUTH_PATH,
    search: "",
    state: { from: "" }
  };

  public constructor(props: Props) {
    super(props);

    const redirectTo =
      props.location && props.location.pathname
        ? `${props.location.pathname}${props.location.search || ""}`
        : DEFAULT_PRIVATE_PATH;

    this.targetRoute.state.from = redirectTo; // tslint:disable-line
    this.targetRoute.search = `?from=${encodeURIComponent(redirectTo)}`;
  }

  // prettier-ignore
  // tslint:disable
  private renderRoute = (routeComponentProps: RouteComponentProps<{}>): React.ReactNode => {
    const Component = this.props.component as any
    // complex pick rules for types, will get back to proper typings in future

    return (
      <Component
        {...routeComponentProps}
        routes={this.props.routes}
      />
    );
  };
  // tslint:enable

  public render(): React.ReactNode {
    const { path, exact, strict, seo } = this.props;

    if (this.props.guarded && !this.props.isLoggedIn) {
      return <Redirect to={this.targetRoute} />;
    }

    return [
      <SeoElements key={1} routePath={path} {...seo} />,
      <BaseRoute
        key={2}
        path={path}
        exact={exact}
        strict={strict}
        render={this.renderRoute}
      />
    ];
  }
}

const mapStateToProps = (state: AppTypes.Store.State): StoreProps => ({
  isLoggedIn: state.session.authenticated
});

export default connect(mapStateToProps)(Route);
