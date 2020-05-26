# Multi-layered nav tool

React-based tool to display multi-layered navigable menus.

It takes a menu object with the following format:

```javascript
const menu = {
    'About': {
        'Menu': 'back',
        'History': {
            'Go back': 'back',
            '1990s': '/history#d1990',
            '2000s': '/history#d2000',
            '2010s': '/history#d2010'
        },
        'Our mission': '/mission'
    },
    'Careers': {
        'Menu': 'back',
        'Office jobs': '/jobs#office',
        'Jobs in the field': '/jobs#field'
    }
    'Contact us!': '/contact'
}
```

Each key-value pair represents a route. The key is the exact text to be displayed on-screen. The value can be one of the following:
* A string with a route: creates an `<a>` tag with a 'href' attribute containing the route.
* An object with a new section: creates a `<span>` tag with a onClick event listener that'll switch to containing menu.
* A string 'back': creates a `<span>` tag with a onClick event listener that'll switch to the previous menu.

## The files

There are two versions of the tool: a basic one and one that switches states to apply transitions. The files are, respectively, `/src/nav-tool.js` and `/src/nav-tool-transitions.js`. All you need to do is paste them into your project and import them as React components.

## Parameters

The tool accepts a small set of parameters as props:

* **`navigationChain`** **(required)**: it's the only necessary parameter. It takes an object with the menu structure.
* **`prefix`**: a String that'll be used to prefix all the classes the tool will assign. Defaults to 'ntl'.
* **`levelClasses`**: a Boolean that states whether or to not assign the created elements a class indicating how many levels deep they are into the menu. Defaults to false.

### Transitions parameters

The version with transitions aditionally accepts the following parameters:

* `time`: Number. A duration in milliseconds for both the entering and exiting animations. Defaults to 1000 (1 second).
* `timeExit`: Number. A duration in milliseconds for the entering animation. Defaults to 1000 (1 second).
* `timeEnter`: Number. A duration in milliseconds for the exiting animation. Defaults to 1000 (1 second).
* `matchTransitionDuration`: Boolean. If `true` it'll state an in-line `transitionDuration` CSS property in the base `<nav>` element that matches the script's durations. Defaults to false.

## Transitions

All the version with transitions does is assign an extra class to the base `<nav>` element with the current state of the animation (with the prefix prepended). This way the user can set specific styles to those classes. These states can be:

* `ntl-entered`: Default state; no animation should be executed.
* `ntl-exiting`: Exiting state. It's assigned when the user clicks on a navigation route and remains for the duration stated with timeExit or time (default: 1 second). Once the time passes the current navigation items are removed and replaced with the new ones.
* `ntl-entering`: Entering state. It's assigned once the exiting state's time has elapsed and the previous navigation elements have been replaced with the new ones. It remains for the duration stated with timeExit or time (default: 1 second). Once the time is elapsed the state goes back to `ntl-entered`.

## Try it out

`$ git clone https://github.com/fpc97/nav-tool`

`$ cd nav-tool`

`$ npm install`

`$ npm start`