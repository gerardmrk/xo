# Views

This directory is solely concerned with the view layer of the app.

## View Types

### components

UI Components that are pure by definition; they may maintain their own local state, but are not hooked up to the application store.

### connected

UI Components that are directly connected to the store state or/and the store's action dispatcher.

Can either be standalone or reusable component.

### contexts

These are not true UI components, but top-level components that inject a given standalone state object into the whole component tree.

### routes

Routes are route page components. Since they can either be connected or pure, it doesn't make sense to add them to their respective directories but rather place them under one directory where it's easier to navigate

### theme

Togglable UI theme (incomplete)

### wrappers

Higher order components. These are generally not true UI components. They function as a wrapper for a UI component and provide some sort of feature or functionality to the component they wrap.

### <App/>

This is a special component

## Quick References

### Enzyme Matchers

- [toBeChecked()](#tobechecked)
- [toBeDisabled()](#tobedisabled)
- [toBeEmptyRender()](#tobeemptyrender)
- [toExist()](#toexist)
- [toContainReact()](#tocontainreact)
- [toHaveClassName()](#tohaveclassname)
- [toHaveHTML()](#tohavehtml)
- [toHaveProp()](#tohaveprop)
- [toHaveRef()](#tohaveref)
- [toHaveState()](#tohavestate)
- [toHaveStyle()](#tohavestyle)
- [toHaveTagName()](#tohavetagname)
- [toHaveText()](#tohavetext)
- [toIncludeText()](#toincludetext)
- [toHaveValue()](#tohavevalue)
- [toMatchElement()](#tomatchelement)
- [toMatchSelector()](#tomatchselector)
