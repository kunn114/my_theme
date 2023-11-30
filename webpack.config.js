const path = require('path');
const glob = require('glob');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const entryObj = glob.sync('./scss/index/**.scss').reduce((acc, p) => {
  const name = /.\/scss\/index\/(.*).scss/gm.exec(p)[1];
  acc[`${name}.build`] = path.resolve(__dirname, `scss/index/${name}.scss`);
  return acc;
}, glob.sync('./js/index/**.js').reduce((acc, p) => {
  const name = /.\/js\/index\/(.*).js/gm.exec(p)[1];
  acc[`${name}.build`] = path.resolve(__dirname, `js/index/${name}.js`);
  return acc;
}, {}));

console.log(entryObj);

module.exports = {
  mode: 'production',
  entry: entryObj,
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },
        'css-loader',
        'sass-loader'
      ],
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      options: { presets: ["@babel/env"] }
    },
    {
      test: /\.(ttf|woff|woff2)$/,
      type: 'asset/resource',
    },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    publicPath: ''
  }
};