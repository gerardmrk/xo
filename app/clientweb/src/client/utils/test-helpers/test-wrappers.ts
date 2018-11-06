import * as React from "react";
import { intlShape, IntlProvider, InjectedIntl } from "react-intl";
import {
  mount,
  shallow,
  MountRendererProps,
  ShallowRendererProps,
  ShallowWrapper,
  ReactWrapper
} from "enzyme";

import messages from "@translations/en.json";

const intlProvder = new IntlProvider({ locale: "en", messages });
const { intl } = intlProvder.getChildContext();

const vnodeWithIntlProp = <P>(vnode: React.ReactElement<P>) => {
  // @ts-ignore
  return React.cloneElement<P & { intl: InjectedIntl }>(vnode, { intl });
};

// prettier-ignore
export const shallowWithIntl = <P, S>(
  vnode: React.ReactElement<P>,
  { context, ...additionalOpts }: ShallowRendererProps = {}
): ShallowWrapper<P, S> => {
  return shallow<P, S>(vnodeWithIntlProp<P>(vnode), {
    context: Object.assign({}, context, { intl }), // tslint:disable-line
    ...additionalOpts,
  });
};

// prettier-ignore
export const mountWithIntl = <P, S>(
  vnode: React.ReactElement<P>,
  { context, childContextTypes, ...additionalOpts }: MountRendererProps = {}
): ReactWrapper<P, S> => {
  return mount<P, S>(vnodeWithIntlProp<P>(vnode), {
    context: Object.assign({}, context, { intl }), // tslint:disable-line
    childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes), // tslint:disable-line
    ...additionalOpts,
  });
};
