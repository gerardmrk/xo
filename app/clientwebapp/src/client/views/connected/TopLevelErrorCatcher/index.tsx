/**
 * This component is responsible for intercepting and handling any uncaught
 * errors down the DOM tree.
 *
 * The error service should only be enabled in production; console-logging is
 * sufficient for development or staging.
 */

import * as React from "react";
import * as Raven from "raven-js";
import GenericErrorMessage from "@client/views/components/GenericErrorMessage";

export type Props = {
  errorServiceDSN: string;
};

export type State = {
  error?: Error;
};

export class TopLevelErrorCatcher extends React.PureComponent<Props, State> {
  public constructor(props: Props) {
    super(props);

    // -> configure and install Raven (Sentry client)
    // the DSN should not change for the lifetime of the app so it makes sense
    // to access it via `props` rather than `this.props`.
    Raven.config(props.errorServiceDSN).install();

    this.state = {
      error: undefined
    };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // any uncaught exceptions will bubble up the tree and end up here
    this.setState((prevState: State) => ({ ...prevState, error }));
  }

  public render(): React.ReactNode | null {
    if (this.state.error === undefined) {
      return this.props.children;
    }

    // if we've reached here, it means an error was caught

    // if development mode, display everything

    // if production mode, redirect user to generic error page
    return <GenericErrorMessage />;
  }
}

export default TopLevelErrorCatcher;
