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
    publicPath: 'http://localhost:3000/'
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
    }),
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ])
  ],
  resolve: {
    extensions: ['', '.js'],
    root: [path.join(__dirname, "bower_components"), path.join(__dirname, "src")],
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
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      loader: 'url-loader?limit=100000',
      include: [
    	  path.join(__dirname, 'assets/fonts'),
    	  path.join(__dirname, 'node_modules/bootstrap/fonts')
      ]
    }, {
      test: /\.less$/,
      loaders: ["style-loader","css-loader", "less-loader"]
    }]
  },
  stylus: {
    use: [jeet(), nib()]
  }
};
