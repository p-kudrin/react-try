var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var jeet = require('jeet');
var nib = require('nib');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3002/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Boot React',
      template: path.join(__dirname, 'assets/index-template.html')
    })
  ],
  resolve: {
    extensions: ['', '.js'],
    root: path.join(__dirname, 'src'),
    alias: {
    	BronoComponents: path.resolve(__dirname, '../../brono-components/src/')
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel?cacheDirectory'],
      include: [
    	  path.join(__dirname, 'src'),
    	  path.resolve(__dirname, '../../brono-components/src/')
      ]
    }, {
      test: /\.styl$/,
      loaders: ['style-loader', 'css-loader', 'stylus-loader']
    }, {
      test: /\.json/,
      loaders: ['json-loader'],
      include: [
    	  path.join(__dirname, 'assets/lang'),
    	  path.resolve(__dirname, '../../brono-components/assets/lang')
      ]
    }]
  },
  stylus: {
    use: [jeet(), nib()]
  }
};
