import * as React from "react";
// import { connect } from "react-redux";

import styles from "./styles.less";

export interface Props {}

export type State = {};

export class Verification extends React.Component<Props, State> {
  public render(): JSX.Element | null {
    return (
      <div className={styles.main}>
        <h1>{"Verification Page"}</h1>
      </div>
    );
  }
}

export default Verification;
