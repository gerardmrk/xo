import * as React from "react";

import styles from "./styles.less";

export interface Props {}

export type State = {};

export class UnknownErr extends React.Component<Props, State> {
  public render(): JSX.Element | null {
    return (
      <div className={styles.main}>
        <h1>{"UnknownErr Page"}</h1>
      </div>
    );
  }
}

export default UnknownErr;
