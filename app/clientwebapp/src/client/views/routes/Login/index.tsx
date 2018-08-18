import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Redirect, RedirectProps } from "react-router-dom";
import { Form } from "semantic-ui-react";

import AppTypes from "AppTypes";
import styles from "./styles.less";
import * as store from "@client/store";
import NavLink from "@client/views/connected/NavLink";
import queryParamsToObj from "@client/utils/query-params-to-obj";
import AuthRoutesContainer from "@client/views/components/AuthRoutesContainer";
import { RouteProps, DEFAULT_PRIVATE_PATH, DEFAULT_AUTH_PATH } from "@client/views/routes";

export type StoreProps = {
  isLoggedIn: boolean;
  isAuthenticating: boolean;
};

export type DispatchProps = {
  login(usernameOrEmail: string, password: string, remember: boolean): void;
};

export type Props = InjectedIntlProps & RouteProps & StoreProps & DispatchProps & {};

export type State = {
  usernameOrEmail: string;
  password: string;
  remember: boolean;
};

export class Login extends React.Component<Props, State> {
  private referrerRoute: RedirectProps["to"] = {
    pathname: DEFAULT_PRIVATE_PATH
  };

  public constructor(props: Props) {
    super(props);

    this.state = {
      usernameOrEmail: "",
      password: "",
      remember: false
    };

    if (
      !!props.location &&
      !!props.location.state &&
      !!props.location.state.from && // tslint:disable-line
      props.location.state.from.pathname !== DEFAULT_AUTH_PATH // tslint:disable-line
    ) {
      this.referrerRoute = props.location.state.from; // tslint:disable-line
    } else if (
      !!props.location &&
      !!props.location.search &&
      !!queryParamsToObj(props.location.search).from
    ) {
      this.referrerRoute = decodeURIComponent(queryParamsToObj(props.location.search).from);
    }
  }

  private onUsernameOrEmailChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ usernameOrEmail: e.currentTarget.value });
  };

  private onPasswordChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value });
  };

  private onRememberChange = (e: React.SyntheticEvent) => {
    this.setState({ remember: !this.state.remember });
  };

  // prettier-ignore
  private onFormSubmit = () => {
    this.props.login(
      this.state.usernameOrEmail,
      this.state.password,
      this.state.remember
    );
  };

  public render(): React.ReactNode {
    const { intl, isLoggedIn, isAuthenticating } = this.props;

    if (isLoggedIn) {
      return <Redirect to={this.referrerRoute} />;
    }

    return (
      <AuthRoutesContainer title={"sections.login"}>
        <Form size={"small"} widths={"equal"}>
          <Form.Group>
            <Form.Input
              type={"text"}
              disabled={isAuthenticating}
              label={intl.messages["form_fields.login.username_or_email"]}
              value={this.state.usernameOrEmail}
              onChange={this.onUsernameOrEmailChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              type={"password"}
              disabled={isAuthenticating}
              label={intl.messages["form_fields.common.password"]}
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Field className={styles.forgotPasswordLink}>
              <NavLink to={"/forgot-password"}>
                <em>{intl.messages["route_links.forgot_password"]}</em>
              </NavLink>
            </Form.Field>
          </Form.Group>

          <Form.Group>
            <Form.Checkbox
              className={styles.formCheckbox}
              checked={this.state.remember}
              disabled={isAuthenticating}
              label={intl.messages["form_fields.login.remember_me"]}
              onChange={this.onRememberChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Button
              primary={true}
              fluid={true}
              disabled={
                isAuthenticating || this.state.usernameOrEmail === "" || this.state.password === ""
              }
              onClick={this.onFormSubmit}
            >
              {intl.messages["actions.login_submit"]}
            </Form.Button>
          </Form.Group>
        </Form>

        <div className={styles.formFooter}>
          <NavLink to={"/register"}>
            <span>{intl.messages["route_links.dont_have_an_account"]}</span>
          </NavLink>
        </div>
      </AuthRoutesContainer>
    );
  }
}

const mapStateToProps = ({ session }: AppTypes.Store.State): StoreProps => ({
  isLoggedIn: session.authenticated,
  isAuthenticating: session.authenticating
});

const mapDispatchToProps = (dispatch: AppTypes.Store.Dispatcher): DispatchProps => ({
  login: (usernameOrEmail: string, password: string, remember: boolean): void => {
    dispatch(store.sessionAsyncActions.login(usernameOrEmail, password, remember));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Login));
