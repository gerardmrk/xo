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
  email: string;
  password: string;
  passwordRepeat: string;
  agreeToTOS: boolean;
};

export class RegisterForm extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      agreeToTOS: false
    };
  }

  private onUsernameChange = (username: string): void => {
    this.setState({ username });
  };

  private onEmailChange = (email: string): void => {
    this.setState({ email });
  };

  private onPasswordChange = (password: string): void => {
    this.setState({ password });
  };

  private onPasswordRepeatChange = (passwordRepeat: string): void => {
    this.setState({ passwordRepeat });
  };

  private onAgreeToTOSChange = (): void => {
    this.setState({ agreeToTOS: !this.state.agreeToTOS });
  };

  private onFormSubmit = (e: React.SyntheticEvent): void => {
    this.props.onFormSubmit(this.state);
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
          validatorName={"passwordValidator"}
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
          <Form.Button primary={true} fluid={true} onClick={this.onFormSubmit}>
            {messages["actions.register_submit"]}
          </Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

export default injectIntl<LocalProps>(RegisterForm);
