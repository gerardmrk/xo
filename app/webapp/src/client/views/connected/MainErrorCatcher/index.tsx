/**
 * This component is responsible for intercepting and handling any uncaught
 * errors down the DOM tree.
 *
 * The error service should only be enabled in production; console-logging is
 * sufficient for development or staging.
 */

import * as React from "react";
import Raven from "raven-js";
import withSettings, { InjectedSettingsProps } from "@client/views/wrappers/withSettings";
import DevErrorDisplay from "@client/views/connected/MainErrorCatcher/DevErrorDisplay";
import UserFriendlyErrorMessage from "@client/views/connected/MainErrorCatcher/UserFriendlyErrorMessage";

export type Props = InjectedSettingsProps & {};

export type State = {
  error?: Error;
  errorInfo?: React.ErrorInfo;
};

export class MainErrorCatcher extends React.PureComponent<Props, State> {
  public constructor(props: Props) {
    super(props);

    // -> configure and install Raven (Sentry client)
    Raven.config(
      (props.settings.services.incidents.config as { [k: string]: string }).dsn
    ).install();

    this.state = {
      error: undefined,
      errorInfo: undefined
    };
  }

  // prettier-ignore
  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // any uncaught exceptions will bubble up the tree and end up here
    this.setState((prevState: State) => ({
      ...prevState,
      error,
      errorInfo
    }), () => { Raven.captureException(error, { extra: errorInfo }); });
  }

  public render(): React.ReactNode | null {
    if (this.state.error === undefined) {
      return this.props.children;
    }

    // if we've reached here, it means an error was caught

    // if development mode, display everything
    if (DEV_MODE) {
      return <DevErrorDisplay error={this.state.error} errorInfo={this.state.errorInfo} />;
    }

    // if production mode, redirect user to generic error page
    return <UserFriendlyErrorMessage />;
  }
}

export default withSettings(MainErrorCatcher);
