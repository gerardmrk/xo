import * as React from "react";
import { connect } from "react-redux";
import { Message, Container } from "semantic-ui-react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";
import { StoreState, StoreDispatcher } from "@client/store";

export interface LocalProps {}

export interface StoreProps {
  message?: string;
}

export interface DispatchProps {}

export type Props = InjectedIntlProps & LocalProps & StoreProps & DispatchProps;

export type State = {};

export class GlobalMessageOverlay extends React.PureComponent<Props, State> {
  public render(): JSX.Element | null {
    const {
      intl: { messages },
      message
    } = this.props;

    if (!message) return null;

    return (
      <div className={styles.main}>
        <Container>
          <Message info={true} floating={true} size={"big"}>
            {messages[message] || message}
          </Message>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ globalMessage }: StoreState): StoreProps => ({
  message: globalMessage.message
});

const mapDispatchToProps = (dispatch: StoreDispatcher): DispatchProps => ({});

export default injectIntl<LocalProps>(
  connect<StoreProps, DispatchProps, LocalProps>(
    mapStateToProps,
    mapDispatchToProps
  )(GlobalMessageOverlay)
);
