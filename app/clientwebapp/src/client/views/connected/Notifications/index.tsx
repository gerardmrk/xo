import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Sidebar } from "semantic-ui-react";
import * as store from "@client/store";

export interface LocalProps {}

export interface StoreProps {}

export interface DispatchProps {}

export interface Props extends InjectedIntlProps, LocalProps, StoreProps, DispatchProps {}

export interface State {}

export class Notifications extends React.Component<Props, State> {
  public render(): React.ReactNode {
    return <Sidebar />;
  }
}

const mapStateToProps = (state: store.StoreState): StoreProps => ({});

const mapDispatchToProps = (dispatch: store.StoreDispatcher): DispatchProps => ({});

export default injectIntl<Props>(
  connect<StoreProps, DispatchProps, LocalProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Notifications)
);
