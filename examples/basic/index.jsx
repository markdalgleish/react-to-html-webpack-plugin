var React = require('react');
var MyComponent = require('./MyComponent.jsx');

if (typeof document !== 'undefined') {
  React.render(<MyComponent />, document);
}

/* IMPORTANT!
 * You must export a component: */
module.exports = MyComponent;
