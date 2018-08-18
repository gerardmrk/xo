import * as React from "react";
import { intlShape, IntlProvider } from "react-intl";
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

export const shallowWithIntl = <P, S>(
  vnode: React.ReactElement<P>,
  { context, ...additionalOptions }: ShallowRendererProps
): ShallowWrapper<P, S> => {
  return shallow<P, S>(React.cloneElement<P>(vnode, <any>{ intl }), {
    context: { ...context, ...{ intl } },
    ...additionalOptions
  });
};

export const mountWithIntl = <P, S>(
  vnode: React.ReactElement<P>,
  { context, childContextTypes, ...additionalOptions }: MountRendererProps
): ReactWrapper<P, S> => {
  return mount<P, S>(React.cloneElement<P>(vnode, <any>{ intl }), {
    context: { ...context, ...{ intl } },
    childContextTypes: { ...{ intl: intlShape }, ...childContextTypes },
    ...additionalOptions
  });
};

/*
function cloneElement<P>(
  element: SFCElement<P>,
  props?: Partial<P> & Attributes,
  ...children: ReactNode[]
): SFCElement<P>;

function cloneElement<P, T extends Component<P, ComponentState>>(
  element: CElement<P, T>,
  props?: Partial<P> & ClassAttributes<T>,
  ...children: ReactNode[]
): CElement<P, T>;

function cloneElement<P>(
  element: ReactElement<P>,
  props?: Partial<P> & Attributes,
  ...children: ReactNode[]
): ReactElement<P>;
*/

/**
 * Shallow rendering is useful to constrain yourself to testing a component as a unit, and to ensure that
 * your tests aren't indirectly asserting on behavior of child components.
 *
 * export function shallow<C extends Component, P = C['props'], S = C['state']>(
 *   node: ReactElement<P>,
 *   options?: ShallowRendererProps
 * ): ShallowWrapper<P, S, C>;
 *
 * export function shallow<P>(
 *   node: ReactElement<P>,
 *   options?: ShallowRendererProps
 * ): ShallowWrapper<P, any>;
 *
 * export function shallow<P, S>(
 *   node: ReactElement<P>,
 *   options?: ShallowRendererProps
 * ): ShallowWrapper<P, S>;
 */

/**
 * Mounts and renders a react component into the document and provides a testing wrapper around it.
 *
 * export function mount<C extends Component, P = C['props'], S = C['state']>(
 *   node: ReactElement<P>,
 *   options?: MountRendererProps
 * ): ReactWrapper<P, S, C>;
 *
 * export function mount<P>(
 *   node: ReactElement<P>,
 *   options?: MountRendererProps
 * ): ReactWrapper<P, any>;
 *
 * export function mount<P, S>(
 *   node: ReactElement<P>,
 *   options?: MountRendererProps
 * ): ReactWrapper<P, S>;
 */
