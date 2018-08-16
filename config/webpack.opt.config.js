const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            keep_fnames: true
          },
          compress: {
            warnings: false, // Suppress uglification warnings
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true
          },
          output: {
            comments: false
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
  ],
  performance: {
    hints: false,
    // 400 KiB
    maxEntrypointSize: 400000
  }
};
