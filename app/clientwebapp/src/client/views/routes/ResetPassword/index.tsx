import * as React from "react";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { injectIntl, InjectedIntlProps } from "react-intl";

// import styles from "./styles.less";
import { StoreState, StoreDispatcher } from "@client/store";
import { resetPassword } from "@client/store/user/async-actions";
import AuthRoutesContainer from "@client/views/components/AuthRoutesContainer";

export interface LocalProps {}

export interface StoreProps {}

export interface DispatchProps {
  resetPassword(newPassword: string, callback: ErrorFirstCallback): void;
}

export type Props = LocalProps & StoreProps & DispatchProps;

export type State = {
  password: string;
  passwordRepeat: string;
};

export class ResetPassword extends React.Component<Props & InjectedIntlProps, State> {
  public state = {
    password: "",
    passwordRepeat: ""
  };

  private onPasswordChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    this.setState({ password: e.currentTarget.value });
  };

  private onPasswordRepeatChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    this.setState({ passwordRepeat: e.currentTarget.value });
  };

  private onFormSubmit = (e: React.SyntheticEvent): void => {
    this.props.resetPassword(this.state.password, (error: Error | null) => {});
  };

  public render(): JSX.Element | null {
    const {
      intl: { messages }
    } = this.props;

    return (
      <AuthRoutesContainer title={"sections.reset_password"}>
        <Form size={"small"} widths={"equal"}>
          <Form.Group>
            <Form.Input
              name={"password"}
              type={"password"}
              required={true}
              value={this.state.password}
              onChange={this.onPasswordChange}
              label={messages["form_fields.reset_password.enter_new_password"]}
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              name={"passwordRepeat"}
              type={"password"}
              required={true}
              value={this.state.passwordRepeat}
              onChange={this.onPasswordRepeatChange}
              label={messages["form_fields.reset_password.reenter_new_password"]}
            />
          </Form.Group>
        </Form>

        <Form.Group>
          <Form.Button primary={true} fluid={true} onClick={this.onFormSubmit}>
            {messages["actions.submit"]}
          </Form.Button>
        </Form.Group>
      </AuthRoutesContainer>
    );
  }
}

const mapStateToProps = ({ session }: StoreState): StoreProps => ({});

const mapDispatchToProps = (dispatch: StoreDispatcher): DispatchProps => ({
  resetPassword: (newPassword: string, callback: ErrorFirstCallback): void => {
    dispatch(resetPassword(newPassword, callback));
  }
});

export default injectIntl<LocalProps>(
  connect<StoreProps, DispatchProps, LocalProps>(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPassword)
);
