import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";

export interface Props extends InjectedIntlProps {}

export type State = {};

export class NotFound extends React.Component<Props, State> {
  public render(): React.ReactNode {
    return (
      <div className={styles.main}>
        <h1>{this.props.intl.messages["error_msgs.404"]}</h1>
      </div>
    );
  }
}

export default injectIntl<Props>(NotFound);
