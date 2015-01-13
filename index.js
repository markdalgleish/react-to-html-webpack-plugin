var React = require('react');
var evaluate = require('eval');

function ReactToHtmlWebpackPlugin(destPath, srcPath) {
  this.srcPath = srcPath;
  this.destPath = destPath;
}

ReactToHtmlWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compiler, done) {

    try {
      var asset = compiler.assets[this.srcPath];

      if (asset === undefined) {
        throw new Error('Output file not found: "' + this.srcPath + '"');
      }

      var source = asset.source();
      var Component = evaluate(source);
      var html = React.renderToString(React.createElement(Component));
      compiler.assets[this.destPath] = createAssetFromContents(html);
    } catch (err) {
      return done(err);
    }

    done();
  }.bind(this));
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
