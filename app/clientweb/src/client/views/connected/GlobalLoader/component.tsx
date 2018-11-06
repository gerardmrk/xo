import * as React from "react";
import { Loader } from "semantic-ui-react";

import styles from "./styles.less";
import AppTypes from "AppTypes";
import { InjectedIntlProps, injectIntl } from "react-intl";

export type Props = {
  show: boolean;
  loadingMessage: AppTypes.TranslationKey | undefined;
};

export type State = {};

// prettier-ignore
class GlobalLoader extends React.PureComponent<Props & InjectedIntlProps, State> {
  public render(): React.ReactNode {
    const { show, loadingMessage, intl: { messages } } = this.props;

    if (!show) {
      return null;
    }

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

export default injectIntl(GlobalLoader);
