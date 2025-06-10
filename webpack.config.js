const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('build'),
    filename: 'index.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!()\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,  // 이미지 파일 처리
        type: '/resources',
      },
       {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // resolve-url-loader를 위해 필요
            },
          },
        ],
      },
    ],
  },
};
