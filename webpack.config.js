module.exports = {
  entry: './js/main.js',
  output: {
    path: './build',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: { presets: ['es2015'] }
      },
      { test: /\.html$/, loader: 'html-loader' }
    ]
  }
}
