# React-To-Html Webpack Plugin

## Usage Example

```js
var ReactToHtmlPlugin = require('react-to-html-webpack-plugin');

module.exports = {

  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: 'dist',
    library: 'MyComponent',
    libraryTarget: 'umd'
  },

  plugins: [
    new ReactToHtmlPlugin('index.html', 'index.js')
  ]

}
```

### index.js

```js
var React = require('react');
var MyComponent = React.createFactory(require('./MyComponent.jsx'));

if (typeof document !== 'undefined') {
  React.render(MyComponent(), document);
}

module.exports = MyComponent;
```

## License

[MIT License](http://markdalgleish.mit-license.org)
