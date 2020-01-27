const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const buildDir = 'build';
const sourceDir = 'src';
const stylesDir = `${sourceDir}/styles`;

const config = {
  mode: process.env.NODE_ENV || 'development',
  devtool: false,
  entry: {
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
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: devMode,
          },
        }, {
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
            sassOptions: {
              includePaths: [path.resolve(__dirname, stylesDir)],
            },
          },
        }],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/env', {
              useBuiltIns: 'usage',
              corejs: 3,
              debug: true,
            }], '@babel/react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'js starter',
      favicon: `./${sourceDir}/images/favicon.ico`,
      template: `./${sourceDir}/index.ejs`,
    }),
    new MiniCssExtractPlugin({
      filename: `styles.bundle${devMode ? '' : '.[hash]'}.css`,
    }),
  ],
};

if (devMode) {
  config.plugins.push(new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
  }));
}

module.exports = config;
