import * as React from "react";
import { Container } from "semantic-ui-react";

import styles from "./styles.less";

export interface Props {}

export type State = {};

export class UserFriendlyErrorMessage extends React.Component<Props, State> {
  public render(): React.ReactNode {
    return (
      <div className={styles.main}>
        <Container>
          <h1>{"UserFriendlyErrorMessage Page"}</h1>
        </Container>
      </div>
    );
  }
}

export default UserFriendlyErrorMessage;
