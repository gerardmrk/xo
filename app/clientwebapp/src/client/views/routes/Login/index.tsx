import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Redirect, RedirectProps } from "react-router-dom";
import { Form } from "semantic-ui-react";

import styles from "./styles.less";
import * as store from "@client/store";
import { login } from "@client/store/session/async-actions";
import queryParamsToObj from "@client/utils/query-params-to-obj";
import UpdateAwareLink from "@client/views/connected/UpdateAwareLink";
import AuthRoutesContainer from "@client/views/components/AuthRoutesContainer";
import { RouteProps, DEFAULT_PRIVATE_PATH, DEFAULT_AUTH_PATH } from "@client/views/routes";

export interface LocalProps extends RouteProps {}

export interface StoreProps {
  isLoggedIn: boolean;
  isAuthenticating: boolean;
}

export interface DispatchProps {
  login(usernameOrEmail: string, password: string, remember: boolean): void;
}

export type Props = InjectedIntlProps & LocalProps & StoreProps & DispatchProps;

export interface State {
  usernameOrEmail: string;
  password: string;
  remember: boolean;
}

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

  private onUsernameOrEmailChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    this.setState({ usernameOrEmail: e.currentTarget.value });
  };

  private onPasswordChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    this.setState({ password: e.currentTarget.value });
  };

  private onRememberChange = (e: React.SyntheticEvent): void => {
    this.setState({ remember: !this.state.remember });
  };

  private onFormSubmit = (): void => {
    this.props.login(this.state.usernameOrEmail, this.state.password, this.state.remember);
  };

  public render(): JSX.Element | null {
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
              <UpdateAwareLink to={"/forgot-password"}>
                <em>{intl.messages["route_links.forgot_password"]}</em>
              </UpdateAwareLink>
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
          <UpdateAwareLink to={"/register"}>
            <span>{intl.messages["route_links.dont_have_an_account"]}</span>
          </UpdateAwareLink>
        </div>
      </AuthRoutesContainer>
    );
  }
}

const mapStateToProps = ({ session }: store.StoreState): StoreProps => ({
  isLoggedIn: session.authenticated,
  isAuthenticating: session.authenticating
});

const mapDispatchToProps = (dispatch: store.StoreDispatcher): DispatchProps => ({
  login: (usernameOrEmail: string, password: string, remember: boolean): void => {
    dispatch(login(usernameOrEmail, password, remember));
  }
});

export default injectIntl(
  connect<StoreProps, DispatchProps, LocalProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
