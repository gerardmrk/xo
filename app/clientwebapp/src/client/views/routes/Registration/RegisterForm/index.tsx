import * as React from "react";
import { Form } from "semantic-ui-react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";
import * as store from "@client/store";
import Input from "@client/views/components/InputWithValidator";

export interface LocalProps {
  onFormSubmit(form: store.userModels.RegistrationPayload): void;
  checkUsernameUniqueness(username: string, cb: ErrorFirstCallback<boolean>): void;
}

export interface Props extends LocalProps, InjectedIntlProps {}

export interface State {
  // form fields
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  agreeToTOS: boolean;
  // meta
  forceValidate: boolean;
  usernameNotUniqueMessage?: string;
  checkingUsernameUniqueness: boolean;
}

export class RegisterForm extends React.Component<Props, State> {
  // keep "isValid" flags out of local state;
  // since this registration form is going to update a boatload (not just from value change), it makes
  // sense to keep local state object as minimal as possible, whereever possible.
  private formValidity = {
    username: false,
    email: false,
    password: false,
    passwordRepeat: false,
    agreeToTOS: false
  };

  public constructor(props: Props) {
    super(props);

    this.state = {
      // form fields
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      agreeToTOS: false,
      // meta
      forceValidate: false,
      usernameNotUniqueMessage: undefined,
      checkingUsernameUniqueness: false
    };
  }

  // The next four methods handle their respective input text fields on the form.

  private onUsernameChange = (username: string, isValid: boolean): void => {
    this.setState({ username, forceValidate: false, usernameNotUniqueMessage: undefined }, () => {
      this.formValidity.username = isValid;
    });
  };

  private onEmailChange = (email: string, isValid: boolean): void => {
    this.setState({ email, forceValidate: false }, () => {
      this.formValidity.email = isValid;
    });
  };

  private onPasswordChange = (password: string, isValid: boolean): void => {
    this.setState({ password, forceValidate: false }, () => {
      this.formValidity.password = isValid;
    });
  };

  private onPasswordRepeatChange = (passwordRepeat: string, isValid: boolean): void => {
    this.setState({ passwordRepeat, forceValidate: false }, () => {
      this.formValidity.passwordRepeat = isValid;
    });
  };

  // handler for the "Agree to ToS" checkbox
  private onAgreeToTOSChange = (): void => {
    this.setState({ agreeToTOS: !this.state.agreeToTOS, forceValidate: false }, () => {
      this.formValidity.agreeToTOS = this.state.agreeToTOS === true;
    });
  };

  // handler to check for username uniqueness
  private onUsernameBlur = (): void => {
    if (this.state.username !== "" && this.formValidity.username === true) {
      this.setState({ checkingUsernameUniqueness: true }, () => {
        // prettier-ignore
        this.props.checkUsernameUniqueness(this.state.username, (error: Error | null, isValid: boolean) => {
          const isUsernameUnique = !!!error && isValid;
          this.formValidity.username = isUsernameUnique;
          this.setState({
            checkingUsernameUniqueness: false,
            usernameNotUniqueMessage: isUsernameUnique ? undefined : "validation_rules.username.uniqueness"
          });
        });
      });
    }
  };

  // handler for the form-submit button
  private onFormSubmit = (e: React.SyntheticEvent): void => {
    if (Object.values(this.formValidity).some((valid: boolean) => !valid)) {
      this.setState({ forceValidate: true });
    } else {
      this.props.onFormSubmit(this.state);
    }
  };

  public render(): React.ReactNode {
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
          onBlur={this.onUsernameBlur}
          label={messages["form_fields.common.username"]}
          forceValidate={this.state.forceValidate}
          loading={this.state.checkingUsernameUniqueness}
          externalInvalidationMessage={this.state.usernameNotUniqueMessage}
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
          forceValidate={this.state.forceValidate}
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
          forceValidate={this.state.forceValidate}
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
          forceValidate={this.state.forceValidate}
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
