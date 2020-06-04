const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/src/utils/index.js'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'utils.js'
  },
  module: {},
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, ''),
    }
  },
};
