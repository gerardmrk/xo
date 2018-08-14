import * as React from "react";
import { connect } from "react-redux";
import { NavLink as BaseNavLink, NavLinkProps } from "react-router-dom";

import * as store from "@client/store";

export type LocalProps = NavLinkProps & {};

export type StoreProps = {
  updated: boolean;
};

export type DispatchProps = {
  notifyUpdated(): void;
};

export type Props = LocalProps & StoreProps & DispatchProps & {};

export type State = {};

export class NavLink extends React.Component<Props, State> {
  private onClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (e.metaKey || e.ctrlKey) {
      return;
    }

    if (!this.props.updated) {
      e.preventDefault();
      if (typeof this.props.to === "object") {
        const { key, state, ...validLocationProps } = this.props.to;
        window.location = { ...window.location, ...validLocationProps };
      } else {
        window.location.pathname = this.props.to;
      }
    }
  };

  public render(): React.ReactNode {
    const { updated, notifyUpdated, ...navLinkProps } = this.props;

    return <BaseNavLink {...navLinkProps} onClick={this.onClick} />;
  }
}

const mapStateToProps = (state: store.StoreState): StoreProps => ({
  updated: state.appStatuses.updated
});

const mapDispatchToProps = (dispatch: store.StoreDispatcher): DispatchProps => ({
  notifyUpdated: (): void => {
    dispatch(store.appStatusesActions.updatesApplied());
  }
});

export default connect<StoreProps, DispatchProps, LocalProps>(
  mapStateToProps,
  mapDispatchToProps
)(NavLink);
