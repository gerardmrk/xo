const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpackNodeExternals = require("webpack-node-externals");

const baseConfig = ({ paths, buildSettings, devMode, clientBuild, enableSourceMapsInProd }) => ({
  context: paths.rootDir,

  mode: buildSettings.mode,

  target: clientBuild ? "web" : "node",

  devtool: devMode
    ? "cheap-module-eval-source-map"
    : enableSourceMapsInProd
      ? "source-map"
      : !clientBuild
        ? "source-map"
        : false,

  entry: clientBuild
    ? { app: [`${paths.clientSource}/main.tsx`] }
    : { renderer: [`${paths.rendererSource}/index.tsx`] },

  output: clientBuild
    ? {
        path: `${paths.outputDir}/client`,
        filename: devMode ? "scripts/[name].js" : "scripts/[name].[chunkhash].js",
        publicPath: devMode ? "/" : "/assets/",
        crossOriginLoading: "anonymous"
      }
    : {
        path: `${paths.outputDir}/renderer`,
        filename: "[name].js",
        libraryTarget: "commonjs"
      },

  externals: clientBuild
    ? undefined
    : [
        webpackNodeExternals({
          whitelist: ["react-loadable", "is-webpack-bundle", "webpack-require-weak"]
        })
      ],

  optimization: {
    minimizer: [
      clientBuild &&
        new UglifyJsPlugin({
          parallel: true,
          exclude: [/dist/],
          sourceMap: devMode || enableSourceMapsInProd
        })
    ].filter(x => !!x),
    runtimeChunk: clientBuild ? "single" : undefined,
    splitChunks: clientBuild
      ? {
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
              maxSize: devMode ? undefined : 80000
            }
          }
        }
      : undefined
  },

  devServer: {
    hot: true,
    port: 4200,
    host: "127.0.0.1",
    publicPath: "/",
    contentBase: "/assets/",
    historyApiFallback: true,
    watchOptions: {
      poll: true
    },
    quiet: true
  },

  stats: {
    modules: false,
    children: false
  },

  resolve: {
    alias: {
      "@translations": paths.translationsDir,
      "@client": paths.clientSource,
      "@renderer": paths.rendererSource,
      "../../theme.config$": paths.themeConfig
    },
    mainFields: ["browser", "module", "main"],
    enforceExtension: false,
    extensions: [
      ".mjs",
      ".web.ts",
      ".ts",
      ".web.tsx",
      ".tsx",
      ".web.js",
      ".js",
      ".json",
      ".web.jsx",
      ".jsx"
    ]
  },

  module: {
    rules: []
  },

  plugins: []
});

module.exports = baseConfig;
