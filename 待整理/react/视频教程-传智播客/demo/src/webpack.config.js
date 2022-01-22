const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'),
  filename: 'index.html'
});

module.exports = {
  mode: 'development',
  plugins: [
    htmlPlugin,
  ],
  module: {
    rules: [
      { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css/, use: ['style-loader', 'css-loader?modules&localIndentName=[path][name]-[local]-[hash:5]'] },
      { test: /\.less/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.jpg|png|gif$/, use: ['url-loader'] }
    ]
  },
  resolve: {
    extensions: ['js', 'jsx', 'json'],
    alias: {
      "@": path.join(__dirname, './src'),
    }
  }
};