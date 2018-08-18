/**
 * Flattens a nested translations object. Example:
 * example:
 *
 * IN: { "x": { "y": { "z": "msg" } } }
 * OUT: "x.y.z": "msg"
 */

// tslint:disable:no-unsafe-any
export function flattenTranslations(nestedTrans: object, prefix: string = "") {
  return Object.keys(nestedTrans).reduce((messages: { [k: string]: string }, key: string) => {
    const value: string = nestedTrans[key];
    const prefixedKey: string = !!prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenTranslations(value, prefixedKey));
    }

    return messages;
  }, {});
}

export default flattenTranslations;
