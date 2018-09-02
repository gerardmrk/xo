const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpackNodeExternals = require("webpack-node-externals");

const baseConfig = ({ paths, settings, buildMode, isDevMode, isClientBuild }) => ({
  context: paths.rootDir,

  mode: buildMode,

  target: isClientBuild ? "web" : "node",

  devtool: isDevMode
    ? "cheap-module-eval-source-map"
    : settings.build.enableSourcemaps
      ? "source-map"
      : !isClientBuild
        ? "source-map"
        : false,

  entry: isClientBuild
    ? { app: [`${paths.clientSource}/main.tsx`] }
    : { renderer: [`${paths.rendererSource}/index.ts`] },

  output: isClientBuild
    ? {
        path: `${paths.outputDir}/client`,
        filename: isDevMode ? "scripts/[name].js" : "scripts/[name].[chunkhash].js",
        publicPath: isDevMode ? "/" : "/assets/",
        crossOriginLoading: "anonymous"
      }
    : {
        path: `${paths.outputDir}/renderer`,
        filename: "[name].js",
        libraryTarget: "commonjs"
      },

  externals: isClientBuild
    ? undefined
    : [
        webpackNodeExternals({
          whitelist: ["react-loadable", "is-webpack-bundle", "webpack-require-weak"]
        })
      ],

  optimization: {
    minimizer: [
      isClientBuild &&
        new UglifyJsPlugin({
          parallel: true,
          exclude: [/dist/],
          sourceMap: isDevMode || settings.build.enableSourcemaps
        })
    ].filter(x => !!x),
    runtimeChunk: isClientBuild ? "single" : undefined,
    splitChunks: isClientBuild
      ? {
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all"
              // ,maxSize: isDevMode ? undefined : 80000
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
      "@proto/js": paths.protoSpec,
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
