import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";
import { register } from "@client/store/user/async-actions";
import { StoreState, StoreDispatcher } from "@client/store";
import { RegistrationPayload, RegistrationError } from "@client/store/user/models";
import AuthRoutesContainer from "@client/views/components/AuthRoutesContainer";
import RegisterForm from "@client/views/routes/Registration/RegisterForm";

export interface LocalProps {}

export interface StoreProps {}

export interface DispatchProps {
  register(form: RegistrationPayload, callback: (error?: Error) => void): void;
}

export type Props = InjectedIntlProps & LocalProps & StoreProps & DispatchProps;

export type State = {
  registrationCompleted: boolean;
};

export class Registration extends React.Component<Props, State> {
  public state = {
    registrationCompleted: false
  };

  private handleFormSubmit = (form: RegistrationPayload): void => {
    this.props.register(form, (error?: Error) => {
      if (!error) {
        this.setState({ registrationCompleted: true });
      }

      if (error instanceof RegistrationError) {
        this.setState({ registrationCompleted: false });
      } else {
        throw error;
      }
    });
  };

  public render(): JSX.Element | null {
    const {
      intl: { messages }
    } = this.props;

    if (this.state.registrationCompleted) {
      return <Redirect to={"/instructions?preset=email"} />;
    }

    return (
      <AuthRoutesContainer title={"sections.register"}>
        <RegisterForm onFormSubmit={this.handleFormSubmit} />

        <div className={styles.formFooter}>
          <Link to={"/login"}>
            <span>{messages["route_links.already_have_an_account"]}</span>
          </Link>
        </div>
      </AuthRoutesContainer>
    );
  }
}

const mapStateToProps = (state: StoreState): StoreProps => ({});

const mapDispatchToProps = (dispatch: StoreDispatcher): DispatchProps => ({
  register: (form: RegistrationPayload, callback: (error?: Error) => void): void => {
    dispatch(register(form, callback));
  }
});

export default injectIntl(
  connect<StoreProps, DispatchProps, LocalProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Registration)
);
