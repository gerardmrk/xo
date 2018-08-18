import * as React from "react";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";

import AppTypes from "AppTypes";
import styles from "./styles.less";
import * as store from "@client/store";
import NavLink from "@client/views/connected/NavLink";
import AuthRoutesContainer from "@client/views/components/AuthRoutesContainer";

export interface LocalProps {}

export interface StoreProps {}

export interface DispatchProps {
  requestPasswordReset(usernameOrEmail: string, callback: ErrorFirstCallback): void;
}

export interface Props extends LocalProps, InjectedIntlProps, StoreProps, DispatchProps {}

export interface State {
  usernameOrEmail: string;
  redirect: boolean;
}

export class ForgotPassword extends React.Component<Props, State> {
  public state = {
    usernameOrEmail: "",
    redirect: false
  };

  private onUsernameOrEmailChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    this.setState({ usernameOrEmail: e.currentTarget.value });
  };

  private onFormSubmit = (): void => {
    this.props.requestPasswordReset(this.state.usernameOrEmail, () => {
      this.setState({ redirect: true });
    });
  };

  public render(): React.ReactNode {
    // prettier-ignore
    const { intl: { messages } } = this.props;

    if (this.state.redirect) {
      return <Redirect to={"/affirmation?preset=forgotpassword"} />;
    }

    return (
      <AuthRoutesContainer title={"sections.forgot_password"}>
        <Form size={"big"} widths={"equal"}>
          <Form.Group>
            <Form.Input
              name={"email"}
              type={"email"}
              required={true}
              value={this.state.usernameOrEmail}
              onChange={this.onUsernameOrEmailChange}
              label={messages["form_fields.forgot_password.enter_your_email_here"]}
            />
          </Form.Group>

          <Form.Group>
            <Form.Button primary={true} fluid={true} onClick={this.onFormSubmit}>
              {messages["actions.submit"]}
            </Form.Button>
          </Form.Group>
        </Form>

        <div className={styles.formFooter}>
          <NavLink to={"/login"}>
            <span>{messages["route_links.login"]}</span>
          </NavLink>
          <span>{" / "}</span>
          <NavLink to={"/register"}>
            <span>{messages["route_links.register"]}</span>
          </NavLink>
        </div>
      </AuthRoutesContainer>
    );
  }
}

const mapStateToProps = (state: AppTypes.Store.State): StoreProps => ({});

const mapDispatchToProps = (dispatch: AppTypes.Store.Dispatcher): DispatchProps => ({
  requestPasswordReset: (usernameOrEmail: string, callback: ErrorFirstCallback): void => {
    dispatch(store.userAsyncActions.requestPasswordReset(usernameOrEmail, callback));
  }
});

export default injectIntl<LocalProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ForgotPassword)
);
