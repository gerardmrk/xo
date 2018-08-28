import * as React from "react";

import styles from "./styles.less";

export type Props = {};

class NameDropper extends React.PureComponent<Props> {
  public render() {
    return <section className={styles.main}>{""}</section>;
  }
}

export default NameDropper;
