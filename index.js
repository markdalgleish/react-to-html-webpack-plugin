var React = require('react');
var each = require('lodash.foreach');
var evaluate = require('eval');

function ReactToHtmlWebpackPlugin(files) {
  this.files = files || {};
}

ReactToHtmlWebpackPlugin.prototype.apply = function(compiler) {
  var files = this.files;

  compiler.plugin('emit', function(compiler, done) {

    each(files, function(srcPath, destPath) {
      var source = compiler.assets[srcPath].source();
      var Component = evaluate(source);
      var html = React.renderToString(Component());
      compiler.assets[destPath] = createAssetFromContents(html);
    });

    done();
  });
};

var createAssetFromContents = function(contents) {
  return {
    source: function() {
      return contents;
    },
    size: function() {
      return contents.length;
    }
  };
};

module.exports = ReactToHtmlWebpackPlugin;
