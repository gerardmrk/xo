import * as React from "react";
import { Form } from "semantic-ui-react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";
import Input from "@client/views/components/InputWithValidator";
import { RegistrationPayload } from "@client/store/user/models";

export interface LocalProps {
  onFormSubmit(form: RegistrationPayload): void;
}

export type Props = LocalProps & InjectedIntlProps;

export type State = {
  username: string;
  usernameValid: boolean;
  email: string;
  emailValid: boolean;
  password: string;
  passwordValid: boolean;
  passwordRepeat: string;
  passwordRepeatValid: boolean;
  agreeToTOS: boolean;
};

export class RegisterForm extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      usernameValid: false,
      email: "",
      emailValid: false,
      password: "",
      passwordValid: false,
      passwordRepeat: "",
      passwordRepeatValid: false,
      agreeToTOS: false
    };
  }

  private onUsernameChange = (username: string, usernameValid: boolean): void => {
    this.setState({ username, usernameValid });
  };

  private onEmailChange = (email: string, emailValid: boolean): void => {
    this.setState({ email, emailValid });
  };

  private onPasswordChange = (password: string, passwordValid: boolean): void => {
    this.setState({ password, passwordValid });
  };

  private onPasswordRepeatChange = (passwordRepeat: string, passwordRepeatValid: boolean): void => {
    this.setState({ passwordRepeat, passwordRepeatValid });
  };

  private onAgreeToTOSChange = (): void => {
    this.setState({ agreeToTOS: !this.state.agreeToTOS });
  };

  private onFormSubmit = (e: React.SyntheticEvent): void => {
    if (!Object.values(this.state).some((v: string | boolean) => v === "" || v === false)) {
      this.props.onFormSubmit(this.state);
    }
  };

  public render(): JSX.Element | null {
    const {
      intl: { messages }
    } = this.props;

    return (
      <Form size={"small"} widths={"equal"}>
        <Input
          name={"username"}
          type={"text"}
          required={true}
          icon={"user outline"}
          iconPosition={"left"}
          value={this.state.username}
          validatorName={"usernameValidator"}
          onChangeProxy={this.onUsernameChange}
          label={messages["form_fields.common.username"]}
        />

        <Input
          name={"email"}
          type={"email"}
          required={true}
          icon={"at"}
          iconPosition={"left"}
          value={this.state.email}
          validatorName={"emailValidator"}
          onChangeProxy={this.onEmailChange}
          label={messages["form_fields.common.email"]}
        />

        <Input
          name={"password"}
          type={"password"}
          required={true}
          icon={"key"}
          iconPosition={"left"}
          value={this.state.password}
          validatorName={"passwordValidator"}
          onChangeProxy={this.onPasswordChange}
          label={messages["form_fields.common.password"]}
        />

        <Input
          name={"passwordRepeat"}
          type={"password"}
          required={true}
          icon={"key"}
          iconPosition={"left"}
          value={this.state.passwordRepeat}
          validatorName={"passwordRepeatValidator"}
          compareWith={this.state.password}
          onChangeProxy={this.onPasswordRepeatChange}
          label={messages["form_fields.register.reenter_password"]}
        />

        <Form.Group className={styles.checkboxWrapper}>
          <Form.Checkbox
            required={true}
            checked={this.state.agreeToTOS}
            onChange={this.onAgreeToTOSChange}
            label={messages["form_fields.register.agree_to_terms_and_conditions"]}
          />
        </Form.Group>

        <Form.Group>
          <Form.Button
            primary={true}
            fluid={true}
            disabled={Object.values(this.state).some(
              (v: string | boolean) => v === "" || v === false
            )}
            onClick={this.onFormSubmit}
          >
            {messages["actions.register_submit"]}
          </Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

export default injectIntl<LocalProps>(RegisterForm);
