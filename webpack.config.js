// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js', // Change this to your entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transpile .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Other loaders can be added here
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser', // Provide the process variable globally
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these file extensions
  },
  // Additional configurations like devServer can go here
};
