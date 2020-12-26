
const path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'docs')
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.jsx', '.json'],
  },
};
