import * as React from "react";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "semantic-ui-react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";
import AuthRoutesContainer from "@client/views/components/AuthRoutesContainer";

export interface LocalProps {}

export type Props = LocalProps & InjectedIntlProps;

export type State = {
  email: string;
};

export class ForgotPassword extends React.Component<Props, State> {
  public state = {
    email: ""
  };

  private onEmailChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    this.setState({ email: e.currentTarget.value });
  };

  private onFormSubmit = (e: React.SyntheticEvent): void => {};

  public render(): JSX.Element | null {
    // prettier-ignore
    const { intl: { messages } } = this.props;

    return (
      <AuthRoutesContainer title={"sections.forgot_password"}>
        <Form size={"big"} widths={"equal"}>
          <Form.Group>
            {/* prettier-ignore */}
            <Form.Input
              name={"email"}
              type={"email"}
              required={true}
              value={this.state.email}
              onChange={this.onEmailChange}
              label={messages["form_fields.forgot_password.enter_your_email_here"]}
            />
          </Form.Group>

          <Form.Group>
            <Form.Button
              primary={true}
              fluid={true}
              onClick={this.onFormSubmit}
            >
              {messages["actions.submit"]}
            </Form.Button>
          </Form.Group>
        </Form>

        <div className={styles.formFooter}>
          <Link to={"/login"}>
            <span>{messages["route_links.login"]}</span>
          </Link>
          <span>{" / "}</span>
          <Link to={"/register"}>
            <span>{messages["route_links.register"]}</span>
          </Link>
        </div>
      </AuthRoutesContainer>
    );
  }
}

export default injectIntl<Props>(ForgotPassword);
