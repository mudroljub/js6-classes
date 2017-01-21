var path = require('path');

const PUTANJE = {
  slike: path.join(__dirname, 'slike'),
  dist: path.join(__dirname, 'dist')
};

var config = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: PUTANJE.dist,
    filename: '[name].js',
    publicPath: '/dist/'
  },
  node: {
    __filename: true
  },
  watch: true,
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loaders: ['to-string-loader', 'css-loader']
    }, {
      test: /\.html$/,
      loader: "html"
    }, {
      test: /\.(jpg|png)$/,
      loader: 'url?limit=25000',
      include: PUTANJE.slike
    }, {
      test: /\.(jpg|png)$/,
      loader: 'file?name=[path][name].[hash].[ext]'
    }]
  }
};

module.exports = config;
