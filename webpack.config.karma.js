module.exports = {
  entry: {
    app: __dirname + '/src/Index.tsx'
  },
  output: {
    path: __dirname + '/dist',
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: ['', '.ts', '.js', ".tsx"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};
