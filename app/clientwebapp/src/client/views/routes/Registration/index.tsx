import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.less";
import { register } from "@client/store/user/async-actions";
import { StoreState, StoreDispatcher } from "@client/store";
import { RegistrationPayload } from "@client/store/user/models";
import AuthRoutesContainer from "@client/views/components/AuthRoutesContainer";
import RegisterForm from "@client/views/routes/Registration/RegisterForm";

export interface LocalProps {}

export interface StoreProps {}

export interface DispatchProps {
  register(form: RegistrationPayload): void;
}

export type Props = InjectedIntlProps & LocalProps & StoreProps & DispatchProps;

export type State = {};

export class Registration extends React.Component<Props, State> {
  private handleFormSubmit = (form: RegistrationPayload): void => {
    this.props.register(form);
  };

  public render(): JSX.Element | null {
    const {
      intl: { messages }
    } = this.props;

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
  register: (form: RegistrationPayload): void => {
    dispatch(register(form));
  }
});

export default injectIntl(
  connect<StoreProps, DispatchProps, LocalProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Registration)
);
