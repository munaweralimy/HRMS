const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const {darkTheme} = require('@ant-design/dark-theme')

const pathsToClean = ["dist"];
const cleanOptions = {
  root: __dirname,
  verbose: true,
  dry: false,
  exclude: [],
};


module.exports = function (_env, argv) {
  const isProduction = _env.TARGET_ENV === "production";
  const isStaging = _env.TARGET_ENV === "staging";
  isStaging ? (isProduction = true) : null;

  const isLocal = _env.TARGET_ENV === "local";
  const isDevelopment = _env.TARGET_ENV === "dev" || isLocal;
  console.log("env", isProduction, isStaging, isLocal, isDevelopment);

  return {
    

    mode: "production",
    devtool: isDevelopment ? "cheap-module-source-map" : "source-map",
    entry: "./src/index.js",
    
    output: {
      
      path: path.resolve(__dirname, "dist"),
      filename: "assets/js/[name].[hash:8].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development",
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
        {
          test: /\.less$/,
          use: [
            { loader: "css-loader" },
            {
              loader: "less-loader",
              options: {
                javascriptEnabled: true,
                modifyVars: darkTheme,
              },
            },
            { loader: isProduction ? MiniCssExtractPlugin.loader : "style-loader" },
          ],
        },

        {
          test: /\.scss$/,
          issuer: { exclude: /\.less$/ },
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            { loader: "css-loader", options: { importLoaders: 1 } },
            "sass-loader",
          ],
        },

        {
          test: /\.scss$/,
          issuer: /\.less$/,
          use: {
            loader: "./sassVarsToLess.js",
          },
        },
        {
          test: /\.(woff(2)?|ttf|otf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "fonts/[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            "file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]",
            "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
          ],
        },
      ],
    },

    resolve: {
      extensions: [".mjs", ".js", ".jsx"],
        alias: {
          'Assets': path.resolve(__dirname, './src/assets/'),
          'Atoms': path.resolve(__dirname, './src/app/atoms/'),
          'Modules': path.resolve(__dirname, './src/app/modules/'),
          'Molecules': path.resolve(__dirname, './src/app/molecules/'),
          'Translate': path.resolve(__dirname, './src/translate/')
        },
      },

    plugins: [
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "assets/css/[name].[hash:8].css",
          chunkFilename: "assets/css/[name].[hash:8].chunk.css",
        }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/index.html"),
        inject: true,
      }),
      new CleanWebpackPlugin(cleanOptions),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        ),
      }),
      new Dotenv({
        path:
          isLocal && isDevelopment
            ? "./Environment/.env.local"
            : !isLocal && isDevelopment
            ? "./Environment/.env"
            : isStaging
            ? "./Environment/.env.stag"
            : "./Environment/.env.prod",
      }),
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              comments: false,
              ascii_only: true,
            },
            warnings: false,
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        automaticNameMaxLength: 30,
        name: true,
        cacheGroups: {
          default: false,
          // Custom common chunk
          bundle: {
            name: 'commons',
            chunks: 'all',
            minChunks: 3,
            reuseExistingChunk: false,
          },
          // Customer vendor
          vendors: {
            chunks: 'initial',
            name: 'vendors',
            test: 'vendors',
          },
          // Merge all the CSS into one file
          styles: {
            name: 'styles',
            test: /\.s?css$/,
            chunks: 'all',
            minChunks: 1,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
      runtimeChunk: "single",
    },
    devServer: {
      compress: true,
      hot: true,
      open: true,
      historyApiFallback: true,
      overlay: true,
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
