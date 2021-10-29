const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = [{
  mode: "production",
  target: "node",
  externals: [nodeExternals()],
  entry: {
    main: "./src/main.ts"
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "main.js",
    chunkFilename: "[name].main.js",
    libraryExport: "default",
    globalObject: 'this',
    libraryTarget: 'umd'
  },
  plugins: [],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
}];
