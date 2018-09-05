import * as React from "react";
import { connect } from "react-redux";
import { Sidebar } from "semantic-ui-react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import AppTypes from "AppTypes";

export type StoreProps = {};

export type DispatchProps = {};

export type Props = StoreProps & DispatchProps & InjectedIntlProps & {};

export type State = {};

export class Notifications extends React.Component<Props, State> {
  public render(): React.ReactNode {
    return <Sidebar />;
  }
}

const mapStateToProps = (state: AppTypes.Store.State): StoreProps => ({});

const mapDispatchToProps = (dispatch: AppTypes.Store.Dispatcher): DispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Notifications));
