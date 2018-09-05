import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";

export type Props = InjectedIntlProps & {};

export type State = {};

export class PostRegistration extends React.PureComponent<Props, State> {
  public render(): React.ReactNode {
    const { intl } = this.props;
    return <div className={styles.main}>{intl.messages[""]}</div>;
  }
}

export default injectIntl(PostRegistration);
