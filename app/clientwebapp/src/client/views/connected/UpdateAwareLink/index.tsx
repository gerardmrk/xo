import * as React from "react";
import { connect } from "react-redux";
import { NavLink, NavLinkProps } from "react-router-dom";

import { StoreState, StoreDispatcher } from "@client/store";
import { updatesApplied } from "@client/store/app-statuses/actions";

export type LocalProps = NavLinkProps & {};

export type StoreProps = {
  updated: boolean;
};

export type DispatchProps = {
  notifyUpdated(): void;
};

export type Props = LocalProps & StoreProps & DispatchProps & {};

export type State = {};

export class UpdateAwareLink extends React.Component<Props, State> {
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

    return <NavLink {...navLinkProps} onClick={this.onClick} />;
  }
}

const mapStateToProps = (state: StoreState): StoreProps => ({
  updated: state.appStatuses.updated
});

const mapDispatchToProps = (dispatch: StoreDispatcher): DispatchProps => ({
  notifyUpdated: (): void => {
    dispatch(updatesApplied());
  }
});

export default connect<StoreProps, DispatchProps, LocalProps>(
  mapStateToProps,
  mapDispatchToProps
)(UpdateAwareLink);
