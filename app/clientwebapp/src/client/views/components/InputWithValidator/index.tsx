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

import withInputValidator, {
  InjectedValidatorProps
} from "@client/views/wrappers/withInputValidator";
import { FieldValidationResult } from "@client/utils/local-validators";

interface ProxiedInputProps {
  error?: boolean;
  onChange?(event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData): void;
}

// prettier-ignore
export interface LocalProps extends InjectedIntlProps, InjectedValidatorProps, Subtract<FormInputProps, ProxiedInputProps> {
  onChangeProxy(value: string, isValid: boolean): void;
}

export type Props = LocalProps;

export type State = FieldValidationResult & {
  showInvalidReason: boolean;
};

export class InputWithValidator extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      valid: true,
      showInvalidReason: false
    };
  }

  public validateAndSetInput = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;

    const { valid, invalidReason } = this.props.validateInput(value);
    this.setState({ valid, invalidReason }, () => {
      this.props.onChangeProxy(value, valid);
    });
  };

  public showInvalidReasonIfAny = (e: React.SyntheticEvent): void => {
    if (!this.state.valid) {
      this.setState({ showInvalidReason: true });
    }
  };

  public hideInvalidReason = (e: React.SyntheticEvent): void => {
    this.setState({ showInvalidReason: false });
  };

  // prettier-ignore
  public render(): React.ReactNode {
    const { intl, validateInput, onChangeProxy, ...otherProps } = this.props
    return (
      <Form.Group className={styles.main}>
        <Form.Input
          {...otherProps}
          error={!this.state.valid}
          onChange={this.validateAndSetInput}
          onBlur={this.showInvalidReasonIfAny}
          onFocus={this.hideInvalidReason}
        />
        {this.state.showInvalidReason && this.state.invalidReason && (
          <div className={styles.invalidReason}>
            <p><em>{intl.messages[this.state.invalidReason]}</em></p>
          </div>
        )}
      </Form.Group>
    )
  }
}

export default withInputValidator<Props>(injectIntl<Props>(InputWithValidator));
