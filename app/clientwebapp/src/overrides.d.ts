/// <reference types="react" />

// import * as Enzyme from 'enzyme';
// ^^^^^^ this is the problem
// declare global {
//    var shallow: typeof Enzyme.shallow;
//    var mount: typeof Enzyme.mount;
//    var render: typeof Enzyme.render;
// }

declare namespace jest {
  interface Matchers<R> {
    toBeChecked(): void;
    toBeDisabled(): void;
    toBeEmptyRender(): void;
    toContainReact(component: React.ReactElement<any>): void;
    toExist(): void;
    toHaveClassName(className: string): void;
    toHaveHTML(html: string): void;
    toHaveProp(propKey: object | string, propValue?: any): void;
    toHaveRef(refName: string): void;
    toHaveState(stateKey: object | string, stateValue?: any): void;
    toHaveStyle(styleKey: object | string, styleValue?: any): void;
    toHaveTagName(tagName: string): void;
    toHaveText(text: string): void;
    toHaveValue(value: any): void;
    toIncludeText(text: string): void;
    toMatchElement(element: React.ReactElement<any>): void;
    toMatchSelector(selector: string): void;
  }
}
