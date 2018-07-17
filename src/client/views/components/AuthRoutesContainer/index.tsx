import * as React from "react";
import { Card } from "semantic-ui-react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";

export type Props = {
  title: string;
};

export type State = {};

export class AuthRoutesContainer extends React.Component<
  Props & InjectedIntlProps,
  State
> {
  public render(): JSX.Element {
    const {
      title,
      intl: { messages }
    } = this.props;

    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <Card fluid={true}>
            <Card.Content>
              <Card.Header>
                <h1>{messages[title] || title}</h1>
              </Card.Header>
            </Card.Content>

            <Card.Content>
              <div className={styles.children}>{this.props.children}</div>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}

export default injectIntl<Props>(AuthRoutesContainer);
