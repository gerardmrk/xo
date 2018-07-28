/**
 * Plain page with for generic messages, typically redirected from another page.
 *
 */
import * as React from "react";
// import { connect } from "react-redux";
import { Card } from "semantic-ui-react";

import styles from "./styles.less";

export interface Props {}

export type State = {};

export class Message extends React.Component<Props, State> {
  public render(): JSX.Element | null {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <Card>
            <Card.Content>
              <h1>{"Message Page"}</h1>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}

export default Message;
