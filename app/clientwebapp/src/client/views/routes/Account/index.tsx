import * as React from "react";
// import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

import styles from "./styles.less";

export interface Props {}

export interface State {}

export class Account extends React.Component<Props, State> {
  public render(): React.ReactNode {
    return (
      <div className={styles.main}>
        <Container>
          <h1>{"Account Page"}</h1>
        </Container>
      </div>
    );
  }
}

export default Account;
