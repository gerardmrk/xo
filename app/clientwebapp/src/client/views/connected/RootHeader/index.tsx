import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Container, Menu, Dropdown, Divider } from "semantic-ui-react";

import AppTypes from "AppTypes";
import styles from "./styles.less";
import * as store from "@client/store";
import NavLink from "@client/views/connected/NavLink";
import { DEFAULT_PUBLIC_PATH, DEFAULT_PRIVATE_PATH } from "@client/views/routes";
import withSettings, { InjectedSettingsProps } from "@client/views/wrappers/withSettings";

export interface LocalProps extends InjectedSettingsProps {}
export interface StoreProps {
  isLoggedIn: boolean;
}
export interface DispatchProps {
  logout(): void;
}
export interface Props extends InjectedIntlProps, LocalProps, StoreProps, DispatchProps {}

export interface State {}

export class RootHeader extends React.Component<Props, State> {
  private onLogoutClick = (): void => {
    this.props.logout();
  };

  // prettier-ignore
  public render(): React.ReactNode {
    const { intl: { messages }, settings: { appSettings: { name } } } = this.props;

    return (
      <header className={styles.main}>
        <Container className={styles.container}>
          <div className={styles.colTitle}>
          <h1>
            <NavLink to={this.props.isLoggedIn ? DEFAULT_PRIVATE_PATH : DEFAULT_PUBLIC_PATH}>
              {name}
            </NavLink>
          </h1>
          </div>

          <div className={styles.colNavs}>
            {this.props.isLoggedIn ? (
              <Menu borderless={true} as={'nav'}>
                <Menu.Item>
                  <NavLink to={"/dashboard"}>{messages["route_links.dashboard"]}</NavLink>
                </Menu.Item>


                <Menu.Item>
                  <Dropdown icon={'user circle'}>
                    <Dropdown.Menu>
                      <Dropdown.Header>{messages["sections.settings"]}</Dropdown.Header>

                      <NavLink to={'/profile'}>
                        <Dropdown.Item>
                          {messages["route_links.profile"]}
                        </Dropdown.Item>
                      </NavLink>

                      <NavLink to={'/account'}>
                        <Dropdown.Item>
                          {messages["route_links.account"]}
                        </Dropdown.Item>
                      </NavLink>

                      <Dropdown.Item
                        icon={'sign out'}
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

const mapDispatchToProps = (dispatch: AppTypes.Store.Dispatcher): DispatchProps => ({
  logout: (): void => {
    dispatch(store.sessionAsyncActions.logout());
  }
});

export default withSettings<LocalProps>(
  injectIntl<LocalProps>(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(RootHeader)
  )
);
