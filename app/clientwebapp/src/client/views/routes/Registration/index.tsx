import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";

import AppTypes from "AppTypes";
import styles from "./styles.less";
import * as store from "@client/store";
import NavLink from "@client/views/connected/NavLink";
import RegisterForm from "@client/views/routes/Registration/RegisterForm";
import AuthRoutesContainer from "@client/views/components/AuthRoutesContainer";
import {
  RegistrationError,
  AlreadyRegisteredError
} from "@client/utils/custom-errors/registration-errors";

export interface LocalProps {}

export type StoreProps = {};

export interface DispatchProps {
  register(form: AppTypes.UserModels.RegistrationPayload, callback: ErrorFirstCallback): void;
  checkUsernameUniqueness(username: string, callback: ErrorFirstCallback<boolean>): void;
}

export interface Props extends InjectedIntlProps, LocalProps, StoreProps, DispatchProps {}

export interface State {
  registrationCompleted: boolean;
}

export class Registration extends React.Component<Props, State> {
  public state = {
    registrationCompleted: false
  };

  // prettier-ignore
  private checkUsernameUniqueness = (username: string, callback: ErrorFirstCallback<boolean>): void => {
    this.props.checkUsernameUniqueness(username, callback);
  };

  private handleFormSubmit = (form: AppTypes.UserModels.RegistrationPayload): void => {
    this.props.register(form, (error: Error | null) => {
      if (!!!error) {
        // registration successful.
        this.setState({ registrationCompleted: true });
        return;
      }

      if (!(error instanceof RegistrationError)) {
        // if this is not a registration error, e.g. a network-error, throw and let
        // it be handled by the next error-boundary.
        throw error;
      }

      switch (error.constructor) {
        case AlreadyRegisteredError:

        default:
          throw error;
      }
    });
  };

  public render(): React.ReactNode {
    const {
      intl: { messages }
    } = this.props;

    if (this.state.registrationCompleted) {
      return <Redirect to={"/instructions?preset=email"} />;
    }

    return (
      <AuthRoutesContainer title={"sections.register"}>
        <RegisterForm
          onFormSubmit={this.handleFormSubmit}
          checkUsernameUniqueness={this.checkUsernameUniqueness}
        />

        <div className={styles.formFooter}>
          <NavLink to={"/login"}>
            <span>{messages["route_links.already_have_an_account"]}</span>
          </NavLink>
        </div>
      </AuthRoutesContainer>
    );
  }
}

const mapStateToProps = (state: AppTypes.Store.State) => ({});

const mapDispatchToProps = (dispatch: AppTypes.Store.Dispatcher) => ({
  register: (form: AppTypes.UserModels.RegistrationPayload, callback: ErrorFirstCallback) => {
    dispatch(store.userAsyncActions.register(form, callback));
  },
  checkUsernameUniqueness: (username: string, callback: ErrorFirstCallback<boolean>) => {
    dispatch(store.userAsyncActions.checkUsernameUniqueness(username, callback));
  }
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Registration)
);
