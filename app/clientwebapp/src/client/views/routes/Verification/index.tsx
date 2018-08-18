import * as React from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { Redirect, RouteComponentProps } from "react-router-dom";

import AppTypes from "AppTypes";
import styles from "./styles.less";
import * as store from "@client/store";
import queryParamsToObj from "@client/utils/query-params-to-obj";

type VerificationScope = AppTypes.UserModels.VerificationScope;

export interface LocalProps extends RouteComponentProps<{ scope: VerificationScope }> {}

export interface StoreProps {}

export interface DispatchProps {
  verifyCode(code: string, scope: VerificationScope, cb: ErrorFirstCallback): void;
}

export interface Props extends LocalProps, StoreProps, DispatchProps {}

export interface State {
  error?: Error;
  verifying: boolean;
}

export class Verification extends React.Component<Props, State> {
  public state = {
    error: undefined,
    verifying: false
  };

  public componentDidMount(): void {
    // prettier-ignore
    this.setState({ verifying: true }, (): void => {
      this.props.verifyCode(
        queryParamsToObj(this.props.location.search).code,
        this.props.match.params.scope,
        (error: Error | null) => { this.setState({ error: error || undefined, verifying: false }) }
      );
    });
  }

  public render(): React.ReactNode {
    // don't need to display anything;
    // the global loading display is called from the async action
    if (this.state.verifying) return null;

    // display error page
    // TD: -> show one for expired code, and a generic catch-all for every other errors.
    if (this.state.error) {
      return (
        <Container>
          <div className={styles.main}>
            <h1>{"Verification Page"}</h1>
          </div>
        </Container>
      );
    }

    // redirects based on the context
    return <Redirect to={""} />;
  }
}

const mapStateToProps = (state: AppTypes.Store.State): StoreProps => ({});

const mapDispatchToProps = (dispatch: AppTypes.Store.Dispatcher): DispatchProps => ({
  verifyCode: (code: string, scope: VerificationScope, cb: ErrorFirstCallback): void => {
    dispatch(store.userAsyncActions.verifyCode(code, scope, cb));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verification);
