import * as React from "react";
import styles from "./styles.less";

export type Props = {};

export type State = {};

export class Landing extends React.Component<Props, State> {
  public render(): React.ReactNode {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <h1>{"Landing Page"}</h1>
        </div>
      </div>
    );
  }
}

export default Landing;
