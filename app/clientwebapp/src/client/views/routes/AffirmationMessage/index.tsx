/**
 * Plain page with for generic AffirmationMessages, typically redirected from another page.
 *
 */
import * as React from "react";
// import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";
import queryParamsToObj from "@client/utils/query-params-to-obj";
import { RouteComponentProps } from "../../../../../node_modules/@types/react-router";

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

export class AffirmationMessage extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    const {
      intl: { messages }
    } = this.props;

    const { preset, message } = queryParamsToObj(this.props.location.search);
    this.state = {
      messagePreset: messageElementPresets[preset](messages[messageTranslationKeyPresets[preset]]),
      textMessage: message
    };
  }

  public render(): JSX.Element | null {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <Card>
            <Card.Content>
              <h1>{"AffirmationMessage Page"}</h1>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}

export default injectIntl<LocalProps>(AffirmationMessage);
