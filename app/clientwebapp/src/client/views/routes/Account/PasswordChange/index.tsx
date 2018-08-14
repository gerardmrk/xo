import * as React from "react";
// import { connect } from "react-redux";

import styles from "./styles.less";

export interface Props {}

export type State = {};

export class PasswordChange extends React.Component<Props, State> {
  public render(): React.ReactNode {
    return (
      <div className={styles.main}>
        <h1>{"PasswordChange Page"}</h1>
      </div>
    );
  }
}

export default PasswordChange;
