module.exports = {
  resolve: {
    extensions: ['', '.ts', '.js', ".tsx"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};
