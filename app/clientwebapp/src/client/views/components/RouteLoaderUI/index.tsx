import * as React from "react";
import { Loader } from "semantic-ui-react";
import { LoadingComponentProps } from "react-loadable";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";

export class RouteLoaderUI extends React.Component<LoadingComponentProps & InjectedIntlProps> {
  public render(): React.ReactNode {
    return (
      <div className={styles.main}>
        <Loader size={"big"} active={this.props.pastDelay} inline={"centered"}>
          {this.props.intl.messages["progress.loading"]}
        </Loader>
      </div>
    );
  }
}

export default injectIntl(RouteLoaderUI);
