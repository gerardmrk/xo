import * as React from "react";

import NavLink from "@client/views/connected/NavLink";

export type Props = {
  link: string;
};

export type State = {};

class AppLogo extends React.PureComponent<Props, State> {
  public render(): React.ReactNode {
    return (
      <h1>
        <NavLink to={this.props.link}>{this.props.children}</NavLink>
      </h1>
    );
  }
}

export default AppLogo;
