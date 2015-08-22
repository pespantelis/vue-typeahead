module.exports = {
  entry: "./vue-typeahead.js",
  output: {
    path: './build',
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'esnext' }
    ]
  },
  devtool: '#source-map'
}
