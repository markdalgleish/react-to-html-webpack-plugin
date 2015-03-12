var React = require('react');
var evaluate = require('eval');

function ReactToHtmlWebpackPlugin(destPath, srcPath, options) {
  this.srcPath = srcPath;
  this.destPath = destPath;
  this.options = typeof options === 'object' ? options : {};
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

      var template = this.options.template;

      if (template != null && typeof template !== 'function') {
        throw new Error('Template must be a function');
      }

      var output = typeof template === 'function' ?
        template({
          html: html,
          assets: getAssetsFromCompiler(compiler)
        }) :
        html;

      compiler.assets[this.destPath] = createAssetFromContents(output);
    } catch (err) {
      return done(err);
    }

    done();
  }.bind(this));
};

// Shamelessly stolen from html-webpack-plugin - Thanks @ampedandwired :)
var getAssetsFromCompiler = function(compiler) {
  var assets = {};
  var webpackStatsJson = compiler.getStats().toJson();
  for (var chunk in webpackStatsJson.assetsByChunkName) {
    var chunkValue = webpackStatsJson.assetsByChunkName[chunk];

    // Webpack outputs an array for each chunk when using sourcemaps
    if (chunkValue instanceof Array) {
      // Is the main bundle always the first element?
      chunkValue = chunkValue[0];
    }

    if (compiler.options.output.publicPath) {
      chunkValue = compiler.options.output.publicPath + chunkValue;
    }
    assets[chunk] = chunkValue;
  }

  return assets;
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
