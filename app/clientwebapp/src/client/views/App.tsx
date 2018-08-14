/**
 * The root app component
 *
 */
import * as React from "react";
import { hot } from "react-hot-loader";
import { Switch as RouteSwitcher, RouteComponentProps, withRouter } from "react-router-dom";
import styles from "@client/views/App.less";
import routes, { RouteProps } from "@client/views/routes";
import RootHeader from "@client/views/connected/RootHeader";
import RootFooter from "@client/views/connected/RootFooter";
import EnhancedRoute from "@client/views/connected/EnhancedRoute";
import GlobalLoader from "@client/views/connected/GlobalLoader";
import GlobalMessageOverlay from "@client/views/connected/GlobalMessageOverlay";

export interface Props extends RouteComponentProps<{}, {}> {}

export type State = {};

export class App extends React.PureComponent<Props, State> {
  public componentDidUpdate(prevProps: Props): void {
    if (this.props.location !== prevProps.location) {
      // ensure the page always scroll to top after a nav change
      window.scrollTo(0, 0);
    }
  }

  public render(): JSX.Element | null {
    return (
      <div className={styles.main}>
        <GlobalLoader />
        <GlobalMessageOverlay />

        <RootHeader />

        <main className={styles.container}>
          <RouteSwitcher>
            {routes.map((r: RouteProps, i: number) => <EnhancedRoute key={i} {...r} />)}
          </RouteSwitcher>
        </main>

        <RootFooter />
      </div>
    );
  }
}

export default hot(module)(withRouter<Props>(App));
