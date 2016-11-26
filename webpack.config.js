const path = require('path');

const buildDirectory = './client/dist/';

module.exports = {
  entry: [
    './client/index.jsx',
  ],
  eslint: {
    configFile: './.eslintrc',
  },
  output: {
    path: path.resolve(buildDirectory),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
