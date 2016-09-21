var ReactToHtmlPlugin = require('../../index');

module.exports = {

  entry: './index.jsx',

  output: {
    filename: 'index.js',
    path: 'dist',
    /* IMPORTANT!
     * You must compile to UMD or CommonJS
     * so it can be required in a Node context: */
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader' }
    ]
  },

  plugins: [
    new ReactToHtmlPlugin('index.html', 'index.js')
  ]

};
