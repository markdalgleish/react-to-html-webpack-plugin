[![npm](https://img.shields.io/npm/v/react-to-html-webpack-plugin.svg?style=flat-square)](https://npmjs.org/package/react-to-html-webpack-plugin) [![Dependency Status](https://img.shields.io/david/markdalgleish/react-to-html-webpack-plugin.svg?style=flat-square)](https://david-dm.org/markdalgleish/react-to-html-webpack-plugin)

# React-to-HTML Webpack Plugin

Webpack plugin that renders React components to HTML files.

Components are rendered after all source files have been compiled, so JSX works without any issues.

*Warning! This plugin executes your code in a Node context after each compilation.*

## Install

```bash
$ npm install --save-dev react-to-html-webpack-plugin
```

## Basic Usage

This basic example assumes that the React component renders `<html>` as the root element. This works for simple cases, but if you need more fine grained control of the entire document, use the [`template`](#template-function) option instead.

### webpack.config.js

```js
var ReactToHtmlPlugin = require('react-to-html-webpack-plugin');

module.exports = {

  entry: './index.jsx',

  output: {
    filename: 'index.js',
    path: 'dist',
    /* IMPORTANT!
     * You must compile to UMD or CommonJS
     * so it can be required in a Node context: */
    library: 'MyComponentExample',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  },

  plugins: [
    new ReactToHtmlPlugin('index.html', 'index.js')
  ]

};
```

### index.jsx

```js
var React = require('react');
var MyComponent = require('./MyComponent.jsx');

if (typeof document !== 'undefined') {
  React.render(<MyComponent />, document);
}

/* IMPORTANT!
 * You must export a component: */
module.exports = MyComponent;
```

## Using a hashed source file

### webpack.config.js

```js
var ReactToHtmlPlugin = require('react-to-html-webpack-plugin');

module.exports = {

  entry: {
    main: './index.js'
  },

  output: {
    filename: 'assets/[hash].js',
    path: 'dist',
    /* IMPORTANT!
     * You must compile to UMD or CommonJS
     * so it can be required in a Node context: */
    library: 'MyComponentExample',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  },

  plugins: [
    // Note: "index.js" is not used, instead use "main" which is the name of the entry
    // Using "index.js" would result in a file not found error because it has been hashed
    new ReactToHtmlPlugin('index.html', 'main')
  ]

};
```

## API

```js
new ReactToHtmlPlugin('index.html', 'index.js', { options... });
```

### Options

#### template (`function`)

You can optionally provide a function that returns an HTML string.

The template is called with the following data:

```js
{
  html: '...',
  assets: {
    chunkName: assetPath,
    ...
  }
}
```

For example:

```js
var ejs = require('ejs'); // or whatever you like ;)

...

new ReactToHtmlPlugin('index.html', 'index.js', {
  template: function(data) {
    return ejs.render(`
      <html>
        ...
        <body>
          <div id="app">
            <%- html %>
          </div>
          <% for (var chunk in assets) { -%>
          <script src="<%= assets[chunk] %>"></script>
          <% } -%>
        </body>
      </html>
    `, data);
  }
});
```

#### static (`boolean`)

Optionally enable usage of [renderToStaticMarkup](https://facebook.github.io/react/docs/top-level-api.html#react.rendertostaticmarkup). This is recommended when you don't plan to run React on the client.

## License

[MIT License](http://markdalgleish.mit-license.org)
