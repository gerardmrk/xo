import * as React from "react";
// import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

import styles from "./styles.less";

export interface Props {}

export type State = {};

export class Profile extends React.Component<Props, State> {
  public render(): JSX.Element | null {
    return (
      <div className={styles.main}>
        <Container>
          <h1>{"Profile Page"}</h1>
        </Container>
      </div>
    );
  }
}

export default Profile;
