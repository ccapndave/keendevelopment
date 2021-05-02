---
layout: post
title: Restricting access to routes with react-router and guards
categories:
- JS
- React
tags:
- React
permalink: "/restricting-react-router-with-guards/"
---

A common requirement of a router is restricting access to particular routes based on some set of criteria, with probably the most common situation being to redirect a user away from a secured page when they are not logged in.

[react-router](https://github.com/rackt/react-router) doesn't offer any integrated way of enforcing routes within the route definitions themselves (although apparently if you don't mind abandoning the pretty JSX route definitions and instead write the routes directly in code you might be able to use the `onEnter` property to do this).

The provided examples for react-router include another, functional, solution which involves wrapping the component in another component implementing the [`willTransitionTo`](https://github.com/rackt/react-router/blob/master/docs/api/components/RouteHandler.md#willtransitiontotransition-params-query-callback) lifecycle method in order to implement the guard. You can see their solution at [https://github.com/rackt/react-router/blob/master/examples/auth-flow/app.js#L43](https://github.com/rackt/react-router/blob/master/examples/auth-flow/app.js#L43)

I ended up abstracting this pattern into a set of two simple generalised functions which accept any function as the guard, allowing them to be used in different situations. There is a synchronous version (in which the guard function returns true or false) and an asynchronous version (in which the guard returns a Promise).

```jsx
/**
 * Guard the Component router handler with the given function.  If the function fails
 * (i.e. returns a falsey value) then redirect to the given state and parameters.
 *
 * @param fn The guard function, returning true (if the transition is allowed) or false if not
 * @param Component The React component used as the route handler
 * @param state The name of the state to redirect to if the guard fails
 * @param params Optional parameters for the redirect state
 * @returns {*}
 */

const guardRoute = function(fn, Component, { state, params = {} }) {
    return React.createClass({
        statics: {
            willTransitionTo(transition, currentParams, currentQuery) {
                if (!fn(currentParams)) transition.redirect(state, params);
            }
        },

        render() {
            return <Component {...this.props} />;
        },

        displayName: `${Component.displayName}(Guarded)`
    });
};

/**
 * Asynchronously guard the Component router handler with the given function.  If the
 * function fails (i.e. the Promise resolves with a falsey value) then redirect to
 * the given state and parameters.
 *
 * @param fn The guard function, returning a Promise
 * @param Component The React component used as the route handler
 * @param state The name of the state to redirect to if the guard fails
 * @param params Optional parameters for the redirect state
 * @returns {*}
 */

const guardRouteAsync = function(fn, Component, { state, params = {} }) {
    return React.createClass({
        statics: {
            willTransitionTo(transition, currentParams, currentQuery, callback) {
                fn(currentParams).then(result => {
                    if (!result) transition.redirect(state, params);
                    callback();
                });
            }
        },

        render() {
            return <Component {...this.props} />;
        },

        displayName: `${Component.displayName}(Guarded)`
    });
};
```

Note that since the first parameter of the decorator functions is the guard itself, you can use partial application to create a new function with a particular guard already baked in:

```js
// With lodash's partial method
const isDaveLoggedInGuard = _.partial(guardRoute, () => loggedInUser === "dave");

// With bind
const isDaveLoggedInGuard = guardRoute.bind(this, () => loggedInUser === "dave");
```

The guards can then be applied by wrapping the route handler with the guard function:

```jsx
const routes =
    <Route name="app" path="/" handler={App}>
        <Route name="login" path="login" handler={Login} />
        <Route name="secret" path="secret" handler={isDaveLoggedInGuard(Secret, { state: "login" })} />
    </Route>;
```
