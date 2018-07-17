import * as React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Container, Menu, Dropdown, Divider } from "semantic-ui-react";

import styles from "./styles.less";
import { StoreState, StoreDispatcher } from "@client/store";
import {
  DEFAULT_PUBLIC_PATH,
  DEFAULT_PRIVATE_PATH
} from "@client/views/routes";
import injectAppSettings, {
  InjectedAppSettingsProps
} from "@client/views/hocs/injectAppSettings";
import * as sessionActions from "@client/store/session/async-actions";

export interface LocalProps extends InjectedAppSettingsProps {}
export interface StoreProps {
  isLoggedIn: boolean;
}
export interface DispatchProps {
  logout(): void;
}
export type Props = InjectedIntlProps & LocalProps & StoreProps & DispatchProps;

export type State = {};

export class Header extends React.Component<Props, State> {
  private onLogoutClick = (): void => {
    this.props.logout();
  };

  // prettier-ignore
  public render(): JSX.Element | null {
    const { intl: { messages }, appSettings: { name } } = this.props;

    return (
      <header className={styles.main}>
        <Container className={styles.container}>
          <div className={styles.colTitle}>
          <h1>
            <Link to={this.props.isLoggedIn ? DEFAULT_PRIVATE_PATH : DEFAULT_PUBLIC_PATH}>
              {name}
            </Link>
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
                  <Link to={"/login"}>{messages["route_links.login"]}</Link>
                </Menu.Item>
                <Divider />
                <Menu.Item>
                  <Link to={"/register"}>{messages["route_links.register"]}</Link>
                </Menu.Item>
              </Menu>
            )}
          </div>
        </Container>
      </header>
    );
  }
}

const mapStateToProps = ({ session }: StoreState): StoreProps => ({
  isLoggedIn: session.authenticated
});

const mapDispatchToProps = (dispatch: StoreDispatcher): DispatchProps => ({
  logout: (): void => {
    dispatch(sessionActions.logout());
  }
});

export default injectAppSettings<LocalProps>(
  injectIntl<LocalProps>(
    connect<StoreProps, DispatchProps, LocalProps>(
      mapStateToProps,
      mapDispatchToProps
    )(Header)
  )
);
