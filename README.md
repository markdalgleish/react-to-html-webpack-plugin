[![npm](https://img.shields.io/npm/v/react-to-html-webpack-plugin.svg?style=flat-square)](https://npmjs.org/package/react-to-html-webpack-plugin) [![Dependency Status](https://img.shields.io/david/markdalgleish/react-to-html-webpack-plugin.svg?style=flat-square)](https://david-dm.org/markdalgleish/react-to-html-webpack-plugin)

# React-to-HTML Webpack Plugin

Webpack plugin that renders a React component to an HTML file.

Components are rendered after all source files have been compiled, so JSX works without any issues.

*Warning! This plugin executes your code in a Node context after each compilation.*

## Install

```bash
$ npm install --save-dev react-to-html-webpack-plugin
```

## Usage Example

### webpack.config.js

```js
var ReactToHtmlPlugin = require('react-to-html-webpack-plugin');

module.exports = {

  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: 'dist',
    /* IMPORTANT!
     * You must compile to UMD or CommonJS
     * so it can be required in a Node context: */
    library: 'MyComponent',
    libraryTarget: 'umd'
  },

  plugins: [
    new ReactToHtmlPlugin('index.html', 'index.js')
  ]

};
```

### index.js

```js
var React = require('react');
var MyComponent = React.createFactory(require('./MyComponent.jsx'));

if (typeof document !== 'undefined') {
  React.render(MyComponent(), document);
}

/* IMPORTANT!
 * You must export a component: */
module.exports = MyComponent;
```

## License

[MIT License](http://markdalgleish.mit-license.org)
