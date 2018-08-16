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

const mapStateToProps = (state: store.StoreState, localProps?: LocalProps) => ({});

const mapDispatchToProps = (dispatch: store.StoreDispatcher, localProps?: LocalProps) => ({});

export default injectIntl<Props>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Notifications)
);
