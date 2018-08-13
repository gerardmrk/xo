import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";
import { register, checkUsernameUniqueness } from "@client/store/user/async-actions";
import { StoreState, StoreDispatcher } from "@client/store";
import { RegistrationPayload } from "@client/store/user/models";
import RegisterForm from "@client/views/routes/Registration/RegisterForm";
import UpdateAwareLink from "@client/views/connected/UpdateAwareLink";
import AuthRoutesContainer from "@client/views/components/AuthRoutesContainer";
import {
  RegistrationError,
  AlreadyRegisteredError
} from "@client/utils/custom-errors/registration-errors";

export interface LocalProps {}

export interface StoreProps {}

export interface DispatchProps {
  register(form: RegistrationPayload, callback: ErrorFirstCallback): void;
  checkUsernameUniqueness(username: string, callback: ErrorFirstCallback<boolean>): void;
}

export type Props = InjectedIntlProps & LocalProps & StoreProps & DispatchProps;

export type State = {
  registrationCompleted: boolean;
};

export class Registration extends React.Component<Props, State> {
  public state = {
    registrationCompleted: false
  };

  // prettier-ignore
  private checkUsernameUniqueness = (username: string, callback: ErrorFirstCallback<boolean>): void => {
    this.props.checkUsernameUniqueness(username, callback);
  };

  private handleFormSubmit = (form: RegistrationPayload): void => {
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

  public render(): JSX.Element | null {
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
          <UpdateAwareLink to={"/login"}>
            <span>{messages["route_links.already_have_an_account"]}</span>
          </UpdateAwareLink>
        </div>
      </AuthRoutesContainer>
    );
  }
}

const mapStateToProps = (state: StoreState): StoreProps => ({});

const mapDispatchToProps = (dispatch: StoreDispatcher): DispatchProps => ({
  register: (form: RegistrationPayload, callback: ErrorFirstCallback): void => {
    dispatch(register(form, callback));
  },
  checkUsernameUniqueness: (username: string, callback: ErrorFirstCallback<boolean>): void => {
    dispatch(checkUsernameUniqueness(username, callback));
  }
});

export default injectIntl(
  connect<StoreProps, DispatchProps, LocalProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Registration)
);
