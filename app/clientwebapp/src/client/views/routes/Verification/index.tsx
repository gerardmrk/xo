import * as React from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { Redirect, RouteComponentProps } from "react-router-dom";

import styles from "./styles.less";
import { StoreState, StoreDispatcher } from "@client/store";
import { verifyCode } from "@client/store/user/async-actions";
import queryParamsToObj from "@client/utils/query-params-to-obj";
import { VerificationScope } from "@client/store/user/models";

export interface LocalProps extends RouteComponentProps<{ scope: VerificationScope }> {}

export interface StoreProps {}

export interface DispatchProps {
  verifyCode(code: string, scope: VerificationScope, cb: ErrorFirstCallback): void;
}

export type Props = LocalProps & StoreProps & DispatchProps;

export type State = {
  error?: Error;
  verifying: boolean;
};

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

  public render(): JSX.Element | null {
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

const mapStateToProps = (state: StoreState): StoreProps => ({});

const mapDispatchToProps = (dispatch: StoreDispatcher): DispatchProps => ({
  verifyCode: (code: string, scope: VerificationScope, cb: ErrorFirstCallback): void => {
    dispatch(verifyCode(code, scope, cb));
  }
});

export default connect<StoreProps, DispatchProps, LocalProps>(
  mapStateToProps,
  mapDispatchToProps
)(Verification);
