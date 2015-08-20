module.exports = {
  entry: "./vue-typeahead.js",
  output: {
    path: './build',
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "html" },
    ]
  },
  devtool: '#source-map'
}
