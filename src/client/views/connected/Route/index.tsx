import * as React from "react";
import { connect } from "react-redux";
import { LocationDescriptorObject } from "history";
import {
  Route as BaseRoute,
  Redirect,
  RouteComponentProps
} from "react-router-dom";

import {
  RouteProps,
  DEFAULT_PRIVATE_PATH,
  DEFAULT_AUTH_PATH
} from "@client/views/routes";
import { StoreState } from "@client/store";

export interface LocalProps extends RouteProps {}

export interface StoreProps {
  isLoggedIn: boolean;
}

export interface DispatchProps {}

export type Props = LocalProps & StoreProps & DispatchProps;

export type State = {};

export class Route extends React.Component<Props, State> {
  private targetRoute: LocationDescriptorObject = {
    pathname: DEFAULT_AUTH_PATH,
    state: { from: "" }
  };

  public constructor(props: Props) {
    super(props);
    this.targetRoute.state.from = props.location || DEFAULT_PRIVATE_PATH; // tslint:disable-line
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

  public render(): JSX.Element | null {
    const { path, exact, strict } = this.props;

    if (this.props.guarded && !this.props.isLoggedIn) {
      return <Redirect to={this.targetRoute} />;
    }

    return (
      <BaseRoute
        path={path}
        exact={exact}
        strict={strict}
        render={this.renderRoute}
      />
    );
  }
}

const mapStateToProps = (state: StoreState): StoreProps => ({
  isLoggedIn: state.session.authenticated
});

export default connect(mapStateToProps)(Route);
