import * as React from "react";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";
import { StoreState, StoreDispatcher } from "@client/store";
import UpdateAwareLink from "@client/views/connected/UpdateAwareLink";
import { requestPasswordReset } from "@client/store/user/async-actions";
import AuthRoutesContainer from "@client/views/components/AuthRoutesContainer";

export interface LocalProps {}

export interface StoreProps {}

export interface DispatchProps {
  requestPasswordReset(usernameOrEmail: string, callback: (success: boolean) => void): void;
}

export type Props = LocalProps & InjectedIntlProps & StoreProps & DispatchProps;

export type State = {
  usernameOrEmail: string;
  redirect: boolean;
};

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

  public render(): JSX.Element | null {
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
          <UpdateAwareLink to={"/login"}>
            <span>{messages["route_links.login"]}</span>
          </UpdateAwareLink>
          <span>{" / "}</span>
          <UpdateAwareLink to={"/register"}>
            <span>{messages["route_links.register"]}</span>
          </UpdateAwareLink>
        </div>
      </AuthRoutesContainer>
    );
  }
}

const mapStateToProps = (state: StoreState): StoreProps => ({});

const mapDispatchToProps = (dispatch: StoreDispatcher): DispatchProps => ({
  requestPasswordReset: (usernameOrEmail: string, callback: (success: boolean) => void): void => {
    dispatch(requestPasswordReset(usernameOrEmail, callback));
  }
});

export default injectIntl<LocalProps>(
  connect<StoreProps, DispatchProps, LocalProps>(
    mapStateToProps,
    mapDispatchToProps
  )(ForgotPassword)
);
