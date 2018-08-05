import * as React from "react";
import { Subtract } from "utility-types";

import {
  validators,
  Validators,
  FieldValidator,
  FieldValidationResult
} from "@client/utils/local-validators";

export interface InjectedValidatorProps {
  validateInput(input: string): FieldValidationResult;
}

// prettier-ignore
export const withInputValidator = <WrappedComponentProps extends InjectedValidatorProps>(WrappedComponent: React.ComponentType<WrappedComponentProps>) => { // tslint:disable-line:typedef
  type WrapperProps = Subtract<WrappedComponentProps, InjectedValidatorProps> & {
    validatorName: keyof Validators;
  };

  type WrapperState = {};

  return class WithInputValidator extends React.PureComponent<WrapperProps, WrapperState> {
    public static displayName = `withInputValidator(${WrappedComponent.name})`;
    public static readonly WrappedComponent = WrappedComponent;

    private validate: FieldValidator;

    public constructor(props: WrapperProps) {
      super(props);
      this.validate = validators[props.validatorName]();
    }

    public render(): JSX.Element {
      // see issue -> https://github.com/Microsoft/TypeScript/pull/13288
      const { validatorName, ...other } = this.props as any // tslint:disable-line:no-any no-unsafe-any
      return (
        <WrappedComponent
          {...other as WrapperProps}
          validateInput={this.validate}
        />
      );
    }
  };
};

export default withInputValidator;