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
  resolve: {
    alias: {
      core: path.resolve(__dirname, 'src/core/'),
      akcije: path.resolve(__dirname, 'src/akcije/'),
      io: path.resolve(__dirname, 'src/io/')
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['to-string-loader', 'css-loader']
    }, {
      test: /\.html$/,
      use: 'html-loader'
    }, {
      test: /\.(jpg|png)$/,
      use: 'url-loader?limit=25000',
      include: path.join(__dirname, 'slike')
    }, {
      test: /\.(jpg|png)$/,
      use: 'file-loader?name=[path][name].[hash].[ext]'
    }]
  }
}
