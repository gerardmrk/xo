# Contexts

These exists in an effort to keep the main application state small.

Given that the state object gets copied everytime there's an update, we try to take out state that isn't going to change a lot, and add them as contexts instead.

Think of them as clusters of less-frequently modified application state.
