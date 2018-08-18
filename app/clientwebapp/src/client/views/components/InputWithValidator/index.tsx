/**
 * NOTE:
 * this is for input of type="text" only, and it must be compatible with any of
 * the validators in "@client/utils/local-validators".
 *
 * Calling this <TextInputWithValidator> would've been a mouthful.
 */
import * as React from "react";
import { Subtract } from "utility-types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Form, FormInputProps, InputOnChangeData } from "semantic-ui-react";

import styles from "./styles.less";
import { FieldValidationResult } from "@client/utils/local-validators";
import withInputValidator, { InjectedValidatorProps } from "@client/views/wrappers/withInputValidator"; // prettier-ignore

type ProxiedInputProps = {
  error?: boolean;
  onChange?(event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData): void;
};

export type Props = InjectedIntlProps &
  InjectedValidatorProps &
  Subtract<FormInputProps, ProxiedInputProps> & {
    // useful when you want to force-display the error message of this input externally.
    forceValidate?: false;
    // if you're additionally performing external validations and would like to display it
    // note that this will take precedence over the local invalidation message.
    externalInvalidationMessage?: string;
    // the input handler itself. value validity is passed as a second argument in case it's needed externally.
    onChangeProxy(value: string, isValid: boolean): void;
  };

export type State = FieldValidationResult & {
  showInvalidReason: boolean;
};

export class InputWithValidator extends React.Component<Props, State> {
  // tslint:disable-next-line:function-name
  public static getDerivedStateFromProps(props: Props, state: State): State | null {
    if (props.externalInvalidationMessage !== undefined) {
      return {
        ...state,
        valid: false,
        showInvalidReason: true,
        invalidReason: props.externalInvalidationMessage
      };
    }
    return null;
  }

  public invalidMsgDomRef: React.RefObject<HTMLDivElement>;

  public constructor(props: Props) {
    super(props);

    this.invalidMsgDomRef = React.createRef<HTMLDivElement>();
    this.state = {
      valid: true,
      showInvalidReason: false
    };
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.forceValidate !== this.props.forceValidate) {
      const { valid, invalidReason } = this.props.validateInput(this.props.value as string);
      this.setState({ valid, invalidReason });
    }
  }

  public onInputChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    const { valid, invalidReason } = this.props.validateInput(value);
    this.setState({ valid, invalidReason }, () => {
      this.props.onChangeProxy(value, valid);
    });
  };

  public onInputBlur = (e: React.SyntheticEvent): void => {
    if (!this.state.valid) {
      this.setState({ showInvalidReason: true }, () => {
        if (this.invalidMsgDomRef.current !== null) {
          this.invalidMsgDomRef.current.scrollIntoView();
        }
      });
    }
    if (this.props.onBlur !== undefined) {
      this.props.onBlur(e); // tslint:disable-line:no-unsafe-any
    }
  };

  public onInputFocus = (e: React.SyntheticEvent): void => {
    this.setState({ showInvalidReason: false });
  };

  public render(): React.ReactNode {
    // pluck out custom props that are not valid to either <Form.Input /> or <input/>,
    // and we can assume the rest of the props are safe to "object-spread" into the component.
    const {
      intl,
      validateInput,
      onChangeProxy,
      forceValidate,
      onBlur,
      externalInvalidationMessage,
      ...otherProps
    } = this.props;

    return (
      <Form.Group className={styles.main}>
        <Form.Input
          {...otherProps}
          error={!this.state.valid}
          onChange={this.onInputChange}
          onBlur={this.onInputBlur}
          onFocus={this.onInputFocus}
        />

        {this.state.showInvalidReason &&
          this.state.invalidReason !== undefined && (
            <div ref={this.invalidMsgDomRef} className={styles.invalidReason}>
              <p>
                <em>{intl.messages[this.state.invalidReason]}</em>
              </p>
            </div>
          )}
      </Form.Group>
    );
  }
}

export default withInputValidator(injectIntl(InputWithValidator));
