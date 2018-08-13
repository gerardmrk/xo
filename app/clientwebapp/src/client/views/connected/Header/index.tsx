import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Container, Menu, Dropdown, Divider } from "semantic-ui-react";

import styles from "./styles.less";
import * as store from "@client/store";
import UpdateAwareLink from "@client/views/connected/UpdateAwareLink";
import * as sessionActions from "@client/store/session/async-actions";
import { DEFAULT_PUBLIC_PATH, DEFAULT_PRIVATE_PATH } from "@client/views/routes";
import withSettings, { InjectedSettingsProps } from "@client/views/wrappers/withSettings";

export interface LocalProps extends InjectedSettingsProps {}
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
    const { intl: { messages }, settings: { appSettings: { name } } } = this.props;

    return (
      <header className={styles.main}>
        <Container className={styles.container}>
          <div className={styles.colTitle}>
          <h1>
            <UpdateAwareLink to={this.props.isLoggedIn ? DEFAULT_PRIVATE_PATH : DEFAULT_PUBLIC_PATH}>
              {name}
            </UpdateAwareLink>
          </h1>
          </div>

          <div className={styles.colNavs}>
            {this.props.isLoggedIn ? (
              <Menu borderless={true} as={'nav'}>
                <Menu.Item>
                  <UpdateAwareLink to={"/dashboard"}>{messages["route_links.dashboard"]}</UpdateAwareLink>
                </Menu.Item>


                <Menu.Item>
                  <Dropdown icon={'user circle'}>
                    <Dropdown.Menu>
                      <Dropdown.Header>{messages["sections.settings"]}</Dropdown.Header>

                      <UpdateAwareLink to={'/profile'}>
                        <Dropdown.Item>
                          {messages["route_links.profile"]}
                        </Dropdown.Item>
                      </UpdateAwareLink>

                      <UpdateAwareLink to={'/account'}>
                        <Dropdown.Item>
                          {messages["route_links.account"]}
                        </Dropdown.Item>
                      </UpdateAwareLink>

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
                  <UpdateAwareLink to={"/login"}>
                    {messages["route_links.login"]}
                  </UpdateAwareLink>
                </Menu.Item>
                <Divider />
                <Menu.Item>
                  <UpdateAwareLink to={"/register"}>
                    {messages["route_links.register"]}
                  </UpdateAwareLink>
                </Menu.Item>
              </Menu>
            )}
          </div>
        </Container>
      </header>
    );
  }
}

const mapStateToProps = ({ session }: store.StoreState): StoreProps => ({
  isLoggedIn: session.authenticated
});

const mapDispatchToProps = (dispatch: store.StoreDispatcher): DispatchProps => ({
  logout: (): void => {
    dispatch(sessionActions.logout());
  }
});

export default withSettings<LocalProps>(
  injectIntl<LocalProps>(
    connect<StoreProps, DispatchProps, LocalProps>(
      mapStateToProps,
      mapDispatchToProps
    )(Header)
  )
);
