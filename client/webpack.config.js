const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// DONE: Add and configure workbox plugins for a service worker and manifest file.
// DONE: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    //Entry point
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      new InjectManifest(),
      new WebpackPwaManifest({
        name: 'PWA Text Editor',
        short_name: 'Text Editor',
        description: 'Write things and edit them',
        background_color: '#61F6D9',
        theme_color: '#61F6D9',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('src', 'icons'),
          },
        ],
      }),
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
                    }
              }
        }
      ],
    },
  };
};
