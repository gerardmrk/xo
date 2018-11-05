import * as React from "react";
import { connect } from "react-redux";
import { Loader } from "semantic-ui-react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import AppTypes from "AppTypes";
import styles from "./styles.less";

export type StoreProps = {
  show: boolean;
  loadingMessage?: string;
};

export type DispatchProps = {};

export type Props = StoreProps & DispatchProps & InjectedIntlProps & {};

export type State = {};

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
          {!!loadingMessage && (
            <p>{messages[loadingMessage] || loadingMessage}</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppTypes.Store.State): StoreProps => ({
  show: state.globalLoader.loading,
  loadingMessage: state.globalLoader.message
});

const mapDispatchToProps = (
  dispatch: AppTypes.Store.Dispatcher
): DispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(GlobalLoader));
