const path = require('path')

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
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
      test: /\.css$/,
      loaders: ['to-string-loader', 'css-loader']
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.(jpg|png)$/,
      loader: 'url-loader?limit=25000',
      include: path.join(__dirname, 'slike')
    }, {
      test: /\.(jpg|png)$/,
      loader: 'file-loader?name=[path][name].[hash].[ext]'
    }]
  }
}
