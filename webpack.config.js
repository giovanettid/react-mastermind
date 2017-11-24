const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildDir = 'build';
const sourceDir = 'src';
const stylesDir = `${sourceDir}/styles`;

const config = {
  entry: {
    polyfill: ['babel-polyfill'],
    app: [`./${sourceDir}/components/main.jsx`],
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, buildDir),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.resolve(__dirname, stylesDir)],
            },
          }],
        }),
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[hash].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, sourceDir), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, sourceDir),
  },
  plugins: [
    new CleanWebpackPlugin([buildDir]),
    new HtmlWebpackPlugin({
      title: 'js starter',
      favicon: `./${sourceDir}/images/favicon.ico`,
      template: `./${sourceDir}/index.ejs`,
    }),
    new ExtractTextPlugin('styles.[hash].bundle.css'),
  ],
};

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    exclude: /polyfill.*\.js$/,
  }));
}

module.exports = config;
