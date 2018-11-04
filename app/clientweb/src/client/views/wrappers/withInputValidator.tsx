/**
 * Works one of 2 ways:
 * - use a preset, or
 * - compareWith
 *
 * preset takes precedence over the comparevalues
 */
import * as React from "react";
import { Subtract } from "utility-types";

import {
  validators,
  Validators,
  FieldValidator,
  FieldValidationResult
} from "@client/utils/local-validators";

export interface InjectedProps {
  validateInput(input: string): FieldValidationResult;
}

export const withInputValidator = <WrappedProps extends InjectedProps>(
  WrappedComponent: React.ComponentType<WrappedProps>
) => {
  type WrapperProps = Subtract<WrappedProps, InjectedProps> & {
    required?: boolean;
    validatorName: keyof Validators;
    compareWith?: string; // this is only relevant if validatorName == "equalityValidator"
  };

  type WrapperState = {};

  return class WithInputValidator extends React.Component<
    WrapperProps,
    WrapperState
  > {
    public static displayName = `withInputValidator(${WrappedComponent.name})`;

    public static readonly WrappedComponent = WrappedComponent;

    private validate: FieldValidator;

    public constructor(props: WrapperProps) {
      super(props);
      this.validate = validators[props.validatorName]({
        required: props.required
      });
    }

    private validateInput = (value: string): FieldValidationResult => {
      return this.validate(value, this.props.compareWith);
    };

    public render(): React.ReactNode {
      const {
        validatorName,
        compareWith,
        compareFieldName,
        ...other // ---------> see issue -> https://github.com/Microsoft/TypeScript/pull/13288
      } = this.props as any; // tslint:disable-line:no-any no-unsafe-any

      return (
        <WrappedComponent
          {...other as WrapperProps}
          validateInput={this.validateInput}
        />
      );
    }
  };
};

export default withInputValidator;
