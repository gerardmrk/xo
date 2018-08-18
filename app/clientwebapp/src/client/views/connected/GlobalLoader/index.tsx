import * as React from "react";
import { connect } from "react-redux";
import { Loader } from "semantic-ui-react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import AppTypes from "AppTypes";
import styles from "./styles.less";

export interface LocalProps {}

export interface StoreProps {
  show: boolean;
  loadingMessage?: string;
}

export interface DispatchProps {}

export interface Props extends InjectedIntlProps, LocalProps, StoreProps, DispatchProps {}

export interface State {}

export class GlobalLoader extends React.PureComponent<Props, State> {
  public render(): React.ReactNode {
    const {
      show,
      loadingMessage,
      intl: { messages }
    } = this.props;

    if (!show) return null;

    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <Loader active={true} size={"massive"} inline={true} />
          {!!loadingMessage && <p>{messages[loadingMessage] || loadingMessage}</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppTypes.Store.State): StoreProps => ({
  show: state.globalLoader.loading,
  loadingMessage: state.globalLoader.message
});

const mapDispatchToProps = (dispatch: AppTypes.Store.Dispatcher): DispatchProps => ({});

export default injectIntl<LocalProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GlobalLoader)
);
