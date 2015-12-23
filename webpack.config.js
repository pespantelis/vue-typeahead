module.exports = {
  entry: './vue-typeahead.js',
  output: {
    path: './build',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015'] }
      }
    ]
  },
  devtool: '#source-map'
}
