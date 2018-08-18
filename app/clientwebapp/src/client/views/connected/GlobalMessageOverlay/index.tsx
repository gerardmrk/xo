import * as React from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import AppTypes from "AppTypes";
import styles from "./styles.less";
import * as store from "@client/store";
import presets from "@client/views/connected/GlobalMessageOverlay/preset-options";

export type StoreProps = {
  message: AppTypes.GlobalMessage;
};

export type DispatchProps = {
  dismissMessage(): void;
};

export type Props = StoreProps & DispatchProps & InjectedIntlProps;

export interface State {}

class GlobalMessageOverlay extends React.PureComponent<Props, State> {
  public render(): React.ReactNode {
    const { intl, message } = this.props;

    if (message === undefined) {
      return null;
    }

    if (typeof message === "string") {
      const PresetMessage = presets[message];
      return (
        <div className={styles.main}>
          <PresetMessage onDismiss={this.props.dismissMessage} />
        </div>
      );
    }

    // prettier-ignore
    return (
      <div className={styles.main}>
          <Message
            floating={true}
            size={"big"}
            color={message.color}
            onDismiss={this.props.dismissMessage}
          >
            <Message.Header>
              {intl.messages[message.header] || message.header}
            </Message.Header>

            {message.content && (
              <Message.Content>
                {intl.messages[message.content] || message.content}
              </Message.Content>
            )}

            {message.list && (
              <Message.List>
                {message.list.map((item: string, i: number) => (
                  <Message.Item key={i}>
                    {intl.messages[item] || item}
                  </Message.Item>
                ))}
              </Message.List>
            )}
          </Message>
      </div>
    );
  }
}

const mapStateToProps = ({ globalMessage: { message } }: AppTypes.Store.State) => ({
  message
});

const mapDispatchToProps = (dispatch: AppTypes.Store.Dispatcher) => ({
  dismissMessage: (): void => {
    dispatch(store.globalMessageActions.hide());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(GlobalMessageOverlay));
