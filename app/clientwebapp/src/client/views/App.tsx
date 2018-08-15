/**
 * The root UI component
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

export interface LocalProps extends RouteComponentProps<{}, {}> {}

export interface Props extends LocalProps {}

export interface State {}

export class App extends React.PureComponent<Props, State> {
  public componentDidUpdate(prevProps: Props): void {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0); // force page to scroll back top after a nav change
    }
  }

  public render(): React.ReactNode {
    return (
      <div className={styles.main}>
        {/* Main loading UI indicator. Hidden by default. */}
        <GlobalLoader />

        {/* Message overlay. Hidden by default (renders null). */}
        <GlobalMessageOverlay />

        {/* Main header of the app. */}
        <RootHeader />

        {/* This is where the routes go. Routes are defined in "@client/routes". */}
        <main className={styles.container}>
          <RouteSwitcher>
            {routes.map((r: RouteProps, i: number) => (
              <EnhancedRoute key={i} {...r} />
            ))}
          </RouteSwitcher>
        </main>

        {/* Main footer of the app. */}
        <RootFooter />
      </div>
    );
  }
}

export default hot(module)(withRouter<Props>(App));
