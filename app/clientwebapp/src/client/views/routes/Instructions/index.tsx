/**
 * Plain page with for generic Instructionss, typically redirected from another page.
 *
 */
import * as React from "react";
// import { connect } from "react-redux";
import { Card, Container } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";
import queryParamsToObj from "@client/utils/query-params-to-obj";

export interface LocalProps extends InjectedIntlProps, RouteComponentProps<{ preset: string }> {}

export type Props = LocalProps;

export type State = {
  messagePreset?: JSX.Element;
  textMessage?: string;
};

const messageElementPresets: {
  [presetName: string]: (translatedMessage: string) => JSX.Element;
} = {
  email: (translatedMessage: string): JSX.Element => <p>{translatedMessage}</p>
};

const messageTranslationKeyPresets: { [presetName: string]: string } = {
  email: "error_msgs"
};

export class Instructions extends React.PureComponent<Props, State> {
  public constructor(props: Props) {
    super(props);
    const { intl } = this.props;

    const { preset, message } = queryParamsToObj(this.props.location.search);
    this.state = {
      messagePreset: messageElementPresets[preset](
        intl.messages[messageTranslationKeyPresets[preset]]
      ),
      textMessage: message
    };
  }

  public render(): JSX.Element | null {
    return (
      <div className={styles.main}>
        <Container>
          <div className={styles.container}>
            <Card>
              <Card.Content>
                <h1>{"Instructions Page"}</h1>
              </Card.Content>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
}

export default injectIntl<LocalProps>(Instructions);
