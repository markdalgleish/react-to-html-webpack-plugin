var ReactToHtmlPlugin = require('../../index');
var ejs = require('ejs');

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
    new ReactToHtmlPlugin('index.html', 'index.js', {
      template: function(data) {
        return ejs.render('\
          <html>\
            <body>\
              <div id="app">\
                <%- html %>\
              </div>\
              <% for (var chunk in assets) { -%>\
              <script src="<%= assets[chunk] %>"></script>\
              <% } -%>\
            </body>\
          </html>\
        ', data);
      },
      static: true
    })
  ]

};
