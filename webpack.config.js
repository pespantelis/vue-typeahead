module.exports = {
  entry: './js/main.js',
  output: {
    path: './build',
    filename: 'build.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'esnext' }
    ]
  }
}
