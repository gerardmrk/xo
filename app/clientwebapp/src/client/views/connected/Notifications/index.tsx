import * as React from "react";
import { connect } from "react-redux";
import { Sidebar } from "semantic-ui-react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import AppTypes from "AppTypes";

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

const mapStateToProps = (state: AppTypes.Store.State, localProps?: LocalProps) => ({});

const mapDispatchToProps = (dispatch: AppTypes.Store.Dispatcher, localProps?: LocalProps) => ({});

export default injectIntl<Props>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Notifications)
);
