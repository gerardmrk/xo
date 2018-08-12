// tslint:disable: typedef no-unsafe-any
import * as React from "react";
import { mount, shallow } from "enzyme";
import { IntlProvider, intlShape } from "react-intl";

/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import messages from "@translations/en.json";

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider: IntlProvider = new IntlProvider({ locale: "en", messages }, {});
export const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}

/**
 * Export these methods.
 */
export function shallowWithIntl(node) {
  return shallow(nodeWithIntlProp(node), { context: { intl } });
}

export function mountWithIntl(node) {
  return mount(nodeWithIntlProp(node), {
    context: { intl },
    childContextTypes: { intl: intlShape }
  });
}
