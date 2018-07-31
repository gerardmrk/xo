import * as React from "react";
import { Link } from "react-router-dom";
import { Form } from "semantic-ui-react";
// import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";
import AuthRoutesContainer from "@client/views/components/AuthRoutesContainer";

export interface Props {}

export type State = {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  agreeToTOS: boolean;
};

export class Register extends React.Component<Props & InjectedIntlProps, State> {
  public constructor(props: Props & InjectedIntlProps) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      agreeToTOS: false
    };
  }

  private onUsernameChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    this.setState({ username: e.currentTarget.value });
  };

  private onEmailChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    this.setState({ email: e.currentTarget.value });
  };

  private onPasswordChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    this.setState({ password: e.currentTarget.value });
  };

  private onPasswordRepeatChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    this.setState({ passwordRepeat: e.currentTarget.value });
  };

  private onAgreeToTOSChange = (): void => {
    this.setState({ agreeToTOS: !this.state.agreeToTOS });
  };

  private onFormSubmit = (e: React.SyntheticEvent): void => {};

  public render(): JSX.Element | null {
    const {
      intl: { messages }
    } = this.props;

    return (
      <AuthRoutesContainer title={"sections.register"}>
        <Form size={"small"} widths={"equal"}>
          <Form.Group>
            <Form.Input
              name={"username"}
              type={"text"}
              required={true}
              icon={"user outline"}
              iconPosition={"left"}
              value={this.state.username}
              onChange={this.onUsernameChange}
              label={messages["form_fields.common.username"]}
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              name={"email"}
              type={"email"}
              required={true}
              icon={"at"}
              iconPosition={"left"}
              value={this.state.email}
              onChange={this.onEmailChange}
              label={messages["form_fields.common.email"]}
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              name={"password"}
              type={"password"}
              required={true}
              icon={"key"}
              iconPosition={"left"}
              value={this.state.password}
              onChange={this.onPasswordChange}
              label={messages["form_fields.common.password"]}
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              name={"passwordRepeat"}
              type={"password"}
              required={true}
              icon={"key"}
              iconPosition={"left"}
              value={this.state.passwordRepeat}
              onChange={this.onPasswordRepeatChange}
              label={messages["form_fields.register.reenter_password"]}
            />
          </Form.Group>

          <Form.Group>
            <Form.Checkbox
              required={true}
              checked={this.state.agreeToTOS}
              onChange={this.onAgreeToTOSChange}
              label={messages["form_fields.register.agree_to_terms_and_conditions"]}
            />
          </Form.Group>

          <Form.Group>
            <br />
          </Form.Group>

          <Form.Group>
            <Form.Button primary={true} fluid={true} onClick={this.onFormSubmit}>
              {messages["actions.register_submit"]}
            </Form.Button>
          </Form.Group>
        </Form>

        <div className={styles.formFooter}>
          <Link to={"/login"}>
            <span>{messages["route_links.already_have_an_account"]}</span>
          </Link>
        </div>
      </AuthRoutesContainer>
    );
  }
}

export default injectIntl<Props>(Register);
