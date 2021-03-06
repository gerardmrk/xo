import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Container, Menu, Dropdown, Divider } from "semantic-ui-react";

import AppTypes from "AppTypes";
import styles from "./styles.less";
import * as store from "@client/store";
import NavLink from "@client/views/connected/NavLink";
import {
  DEFAULT_PUBLIC_PATH,
  DEFAULT_PRIVATE_PATH
} from "@client/views/routes";
import withSettings, {
  InjectedSettingsProps
} from "@client/views/wrappers/withSettings";
import AppLogo from "./AppLogo";

export type StoreProps = {
  isLoggedIn: boolean;
};

export type DispatchProps = {
  logout(): void;
};

export type Props = StoreProps &
  DispatchProps &
  InjectedIntlProps &
  InjectedSettingsProps & {};

export type State = {};

export class RootHeader extends React.Component<Props, State> {
  private onLogoutClick = (): void => {
    this.props.logout();
  };

  public render(): React.ReactNode {
    const {
      settings,
      intl: { messages }
    } = this.props;

    const logoLink = this.props.isLoggedIn
      ? DEFAULT_PRIVATE_PATH
      : DEFAULT_PUBLIC_PATH;

    return (
      <header className={styles.main}>
        <Container className={styles.container}>
          <div className={styles.colTitle}>
            <AppLogo link={logoLink}>{settings.app.name}</AppLogo>
          </div>

          <div className={styles.colNavs}>
            {this.props.isLoggedIn ? (
              <Menu borderless={true} as={"nav"}>
                <Menu.Item>
                  <NavLink to={"/dashboard"}>
                    {messages["route_links.dashboard"]}
                  </NavLink>
                </Menu.Item>

                <Menu.Item>
                  <Dropdown icon={"user circle"}>
                    <Dropdown.Menu>
                      <Dropdown.Header>
                        {messages["sections.settings"]}
                      </Dropdown.Header>

                      <NavLink to={"/profile"}>
                        <Dropdown.Item>
                          {messages["route_links.profile"]}
                        </Dropdown.Item>
                      </NavLink>

                      <NavLink to={"/account"}>
                        <Dropdown.Item>
                          {messages["route_links.account"]}
                        </Dropdown.Item>
                      </NavLink>

                      <Dropdown.Item
                        icon={"sign out"}
                        text={messages["actions.logout_submit"]}
                        onClick={this.onLogoutClick}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
              </Menu>
            ) : (
              <Menu>
                <Menu.Item>
                  <NavLink to={"/login"}>
                    {messages["route_links.login"]}
                  </NavLink>
                </Menu.Item>
                <Divider />
                <Menu.Item>
                  <NavLink to={"/register"}>
                    {messages["route_links.register"]}
                  </NavLink>
                </Menu.Item>
              </Menu>
            )}
          </div>
        </Container>
      </header>
    );
  }
}

const mapStateToProps = ({ session }: AppTypes.Store.State): StoreProps => ({
  isLoggedIn: session.authenticated
});

const mapDispatchToProps = (
  dispatch: AppTypes.Store.Dispatcher
): DispatchProps => ({
  logout: (): void => {
    dispatch(store.sessionAsyncActions.logout());
  }
});

export default withSettings(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(RootHeader))
);
