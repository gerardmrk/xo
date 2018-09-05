import * as React from "react";
import { Message } from "semantic-ui-react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";

export type Props = InjectedIntlProps & {
  onDismiss(): void;
};

export type State = {};

export class RefreshPageForNewUpdatesMessage extends React.PureComponent<Props, State> {
  private onRefreshClick = (e: React.MouseEvent<HTMLSpanElement>): void => {
    window.location.reload(true);
  };

  public render(): React.ReactNode {
    const { intl } = this.props;

    return (
      <Message color={"blue"} onDismiss={this.props.onDismiss}>
        <Message.Header>
          {intl.messages["global_messages.refresh_page_for_new_updates.header"]}
        </Message.Header>

        <Message.Content>
          <p>
            <span>{intl.messages["global_messages.refresh_page_for_new_updates.content"]}</span>

            <span className={styles.refreshAction} role="button" onClick={this.onRefreshClick}>
              <em>{" Click here to refresh the page."}</em>
            </span>
          </p>
        </Message.Content>
      </Message>
    );
  }
}

export default injectIntl(RefreshPageForNewUpdatesMessage);
