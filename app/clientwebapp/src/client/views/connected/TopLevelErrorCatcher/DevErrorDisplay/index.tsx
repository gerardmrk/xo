import * as React from "react";
import { Header, Container } from "semantic-ui-react";

import styles from "./styles.less";

export interface LocalProps {
  error: Error;
  errorInfo?: React.ErrorInfo;
}

export type Props = LocalProps;

export type State = {};

export class DevErrorDisplay extends React.Component<Props, State> {
  public render(): JSX.Element | null {
    const { error, errorInfo } = this.props;
    return (
      <div className={styles.main}>
        <Container className={styles.container}>
          <div className={styles.content}>
            <div className={styles.errorPane}>
              <Header>
                {error.name}
                <Header.Subheader>
                  <code>{error.message}</code>
                </Header.Subheader>
              </Header>
              <code>
                {error.stack &&
                  error.stack.split("\n").map((line: string, i: number) => <p key={i}>{line}</p>)}
              </code>
            </div>

            <div className={styles.errorInfoPane}>
              <ul>
                {errorInfo &&
                  errorInfo.componentStack &&
                  errorInfo.componentStack
                    .trim()
                    .split("\n")
                    .reverse()
                    .map((vnodeEntry: string, i: number) => (
                      <li key={i}>{formatVNodeEntry(vnodeEntry)}</li>
                    ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

// ^in\s([A-Za-z()]+)\s?(\([A-Za-z() ]+\))?

function formatVNodeEntry(vnodeEntry: string): string {
  // second word is either a component (PascalCase) or a wrapper (camelCase)
  return vnodeEntry;
}

export default DevErrorDisplay;
