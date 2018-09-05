import * as React from "react";
import { Container } from "semantic-ui-react";

import styles from "./styles.less";
import NameDropper from "./NameDropper";

export type Props = {};

export type State = {};

export class Landing extends React.Component<Props, State> {
  public render(): React.ReactNode {
    return (
      <div className={styles.main}>
        <div className={styles.splash}>
          <section className={styles.jumbotron}>
            <Container>
              <h1>{""}</h1>
            </Container>
          </section>
          <NameDropper />
        </div>
      </div>
    );
  }
}

export default Landing;
