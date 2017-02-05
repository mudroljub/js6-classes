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
      core: path.resolve(__dirname, 'game-engine/src/core'),
      akcije: path.resolve(__dirname, 'game-engine/src/akcije/'),
      io: path.resolve(__dirname, 'game-engine/src/io/'),
      konstante: path.resolve(__dirname, 'game-engine/src/konstante'),
      utils: path.resolve(__dirname, 'game-engine/src/utils'),
      slike: path.resolve(__dirname, 'slike/')
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['to-string-loader', 'css-loader']
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    },
    // {
    //   test: /\.(jpg|png)$/,
    //   loader: 'url-loader',
    //   options: {
    //     limit: 25000,
    //   },
    //   include: path.join(__dirname, 'slike')
    // },
    {
      test: /\.(jpg|png|gif)$/,
      loader: 'file-loader',
      options: {
        name: '[path][name].[hash].[ext]'
      }
    }]
  }
}
