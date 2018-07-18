import { render } from "@renderer/render";

// check how this is being exposed
export { render };

// REMINDER FOR TOMORROW
//
// eliminate all posibilities:
// - its possible promises aren't being transformed properly to require calls
// for Node. use airbnb's babel plugin to take care of that.
// - possible that react-loadable does not account for manually assigned chunk names.
// remove and see what happens.
// - all else fails, try the fork mentioned in the pull request.
