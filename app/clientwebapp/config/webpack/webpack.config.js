const webpack = require("webpack");
const OfflinePlugin = require("offline-plugin");
const CleanCSSPlugin = require("less-plugin-clean-css");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const LodashWebpackPlugin = require("lodash-webpack-plugin");
// const ClosureWebpackPlugin = require("closure-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const PrepackWebpackPlugin = require("prepack-webpack-plugin").default;
const SubresourceIntegrityPlugin = require("webpack-subresource-integrity");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const RemoveServiceWorkerPlugin = require("webpack-remove-serviceworker-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

const ConfigBuilder = require("./builder");
const { DEV: DEV_ONLY, PRO: PROD_ONLY } = ConfigBuilder.Modes;
const { CLIENT: CLIENT_ONLY, RENDERER: RENDERER_ONLY } = ConfigBuilder.Sources;

const conf = new ConfigBuilder();

// #####################################################################################################################
//
//    *** MODULE LOADING RULES ***
//    - https://webpack.js.org/concepts/modules
//    - https://webpack.js.org/concepts/loaders
//
//    Modules rules instructs Webpack how to handle modules (just files) imported
//    within your code, i.e. what to do with this: `import { Strain } from ./andromeda.toml`
//
//    E.G. your rules could tell Webpack to transform
//      - *.toml and *.json files to a plain JS object
//      - *.ts/tsx to plain JS code
//      - *.jpg files to inlined data URIs
//
//   Rule order matters (see plugins description for more info).
//
// #####################################################################################################################

// [MODULES] *.ts, *.tsx
// [LOADERS] ts-loader
// prettier-ignore
conf.addModuleRule(({ paths, isDevMode, isClientBuild, settings: { build: { targets } } }) => ({
  test: /\.tsx?$/,
  exclude: [/node_modules/],
  use: [
    {
      loader: "ts-loader",
      options: { transpileOnly: true }
    },
    {
      loader: "babel-loader",
      options: {
        babelrc: false,
        cacheDirectory: `${paths.rootDir}/.cache`,
        presets: [
          ["@babel/preset-env", {
            modules: false,
            loose: true,
            useBuiltIns: "usage",
            targets: isClientBuild ? { browsers: targets.browsers } : { node: targets.node }
          }],
          "@babel/preset-react",
          "@babel/preset-typescript"
        ],
        plugins: [
          ["lodash", { id: "lodash-compat" }],
          ["transform-imports", {
            "lodash": { transform: "lodash/${member}", preventFullImport: true },
            "react-router": { transform: "react-router/${member}", preventFullImport: true }
          }],
          "@babel/plugin-syntax-dynamic-import",
          "@babel/plugin-transform-runtime",
          !isDevMode && "transform-react-remove-prop-types",
          isClientBuild && "react-hot-loader/babel",
          "react-loadable/babel"
        ].filter(x => !!x),
      }
    }
  ]
}));

// [MODULES] *.less
// [LOADERS] less-loader -> css-loader -> (style-loader | MiniCssExtractPlugin.loader)
conf.addModuleRule(({ isDevMode, isClientBuild, settings: { build } }) => ({
  test: /\.less$/,
  exclude: [/node_modules/],
  use: [
    !isDevMode && isClientBuild && MiniCssExtractPlugin.loader,
    isDevMode &&
      isClientBuild && {
        loader: "style-loader",
        options: {
          sourceMap: isDevMode || build.enableSourcemaps,
          hmr: true,
          insertInto: "head",
          insertAt: "bottom"
        }
      },
    {
      loader: "css-loader",
      options: {
        sourceMap: isDevMode || build.enableSourcemaps,
        modules: true,
        importLoaders: 1,
        camelCase: true,
        localIdentName: isDevMode ? "[name]_[local]_[hash:base64:7]" : "[hash:base64:7]"
      }
    },
    {
      loader: "postcss-loader",
      options: {
        sourceMap: isDevMode || build.enableSourcemaps,
        plugins: () => [require("autoprefixer")()]
      }
    },
    {
      loader: "less-loader",
      options: {
        strictMath: false,
        noIeCompat: true,
        sourceMap: isDevMode || build.enableSourcemaps,
        plugins: [!isDevMode && new CleanCSSPlugin({ advanced: true })].filter(x => !!x)
      }
    }
  ].filter(x => !!x)
}));

// [MODULES] *.png, *.jpg, *.jpeg, *.gif, *.ico, *.svg
// [LOADERS] (url-loader | file-loader)
// prettier-ignore
conf.addModuleRule(({ isDevMode, isClientBuild }) => ({
  test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
  exclude: [/node_modules/],
  oneOf: [
    {
      resourceQuery: /noembed/, // asset.(*)\?noembed :: disable inlining for images with this query
      use: [{
          loader: "file-loader",
          options: {
            emitFile: isClientBuild,
            name: isDevMode ? "images/[name].[ext]" : "images/[name].[ext]?[hash]"
          }
      }]
    },
    {
      use: [
        isDevMode && {
          loader: "file-loader",
          options: { name: "images/[name].[ext]", emitFile: isClientBuild }
        },
        !isDevMode && {
          loader: "url-loader",
          options: {
            name: "images/[name].[ext]?[hash]",
            limit: 10000,
            emitFile: isClientBuild
          }
        }
      ].filter(x => !!x)
    }
  ]
}));

// [MODULES] *.woff, *.woff2
// [LOADERS] (url-loader | file-loader)
conf.addModuleRule(({ isDevMode, isClientBuild }) => ({
  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  exclude: [/node_modules/],
  use: [
    isDevMode && {
      loader: "file-loader",
      options: { name: "fonts/[name].[ext]", emitFile: isClientBuild }
    },
    !isDevMode && {
      loader: "url-loader",
      options: {
        name: "fonts/[name].[ext]",
        limit: 10000,
        mimetype: "application/font-woff",
        emitFile: isClientBuild
      }
    }
  ].filter(x => !!x)
}));

// [MODULES] *.ttf*, *.eot*
// [LOADERS] file-loader
// prettier-ignore
conf.addModuleRule(({ isClientBuild }) => ({
  test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  exclude: [/node_modules/],
  use: [{
    loader: "file-loader",
    options: { name: "fonts/[name].[ext]", emitFile: isClientBuild }
  }]
}));

// [MODULES] *.otf*
// [LOADERS] file-loader
// prettier-ignore
conf.addModuleRule(({ isClientBuild }) => ({
  test: /\.otf(\?.*)?$/,
  exclude: [/node_modules/],
  use: [{
    loader: "file-loader",
    options: {
      name: "fonts/[name].[ext]",
      mimetype: "application/font-otf",
      emitFile: isClientBuild
    }
  }]
}));

// #####################################################################################################################
//
//    *** PLUGINS ***
//    - https://webpack.js.org/concepts/plugins
//
//    Plugins enhances Webpack functionalities and adds extra features.
//
//    As with module rules, be wary of switching declaration order of plugins; it matters for
//    certain plugins (at least in Webpack 1-2 days, e.g. back then adding compression-webpack-plugin
//    before html-webpack-plugin or the latter before favicons-webpack-plugin broke the build steps).
//
// #####################################################################################################################

// -- webpack.DefinePlugin
// -- https://webpack.js.org/plugins/define-plugin
// This plugin injects global variables (constants) as defined below into your app
// which is then accessible in your code. E.G. for entry `ISOMORPHIC: true`, the
// constant can be referenced like so: `if (ISOMORPHIC === "true") { do something.. }`
conf.addPlugin(({ isDevMode, appStage, settings }) => {
  return new webpack.DefinePlugin({
    DEV_MODE: isDevMode,
    APP_STAGE: appStage,
    INJECTED_SETTINGS: JSON.stringify(settings)
  });
});

// -- webpack.EnvironmentPlugin
// -- https://webpack.js.org/plugins/environment-plugin
// This plugin provides similar functionality to the plugin above: it maps actual
// environment variables from your system which is then accessible from your code,
// e.g. for entry `DEBUG`, the env can be accessed like so: `process.env.DEBUG`
conf.addPlugin(() => {
  return new webpack.EnvironmentPlugin({
    // APP_STAGE: appStage
  });
});

// -- CleanWebpackPlugin (production mode only)
// -- https://github.com/johnagan/clean-webpack-plugin
// This plugin is responsible for purging the dist/build directory before every new
// production build; the old files won't simply get overwritten with the new files like in
// normal cases, as they all have unique hashes in their filenames for cache-busting purposes.
conf.addPlugin(PROD_ONLY, ({ paths, buildSource }) => {
  return new CleanWebpackPlugin(
    [
      `dist/${buildSource}/scripts/*`,
      `dist/${buildSource}/styles/*`,
      `dist/${buildSource}/images/*`
    ],
    {
      root: paths.rootDir,
      exclude: ["index.html", "sw.js", "report.html"]
    }
  );
});

// -- webpack.BannerPlugin
// -- https://webpack.js.org/plugins/banner-plugin/
// This plugin adds a top-level import statement to the compiled renderer bundle
// and the subsequent install() invocation to enable sourcemaps on the server side.
conf.addPlugin(PROD_ONLY, RENDERER_ONLY, () => {
  return new webpack.BannerPlugin({
    raw: true,
    entryOnly: false,
    banner: 'require("source-map-support").install();'
  });
});

// -- ForkTsCheckerWebpackPlugin
// -- https://github.com/Realytics/fork-ts-checker-webpack-plugin
// This plugin runs the type checker on a separate thread to avoid clogging up
// the main thread where the build tool resides, for performance reasons.
conf.addPlugin(({ paths }) => {
  return new ForkTsCheckerWebpackPlugin({
    tslint: `${paths.linterRulesDir}/tslint.json`
  });
});

// -- CaseSensitivePathsPlugin
// -- https://github.com/Urthen/case-sensitive-paths-webpack-plugin
// This plugin enforce case-sensitive import paths to better avoid
// platform-specific bugs when using import statements case-insensitively.
conf.addPlugin(() => {
  return new CaseSensitivePathsPlugin();
});

// -- webpack.ContextReplacementPlugin
// -- https://webpack.js.org/plugins/context-replacement-plugin/
// This plugin is used to prevent the entirety of react-intl lib's locales from
// being included into the client bundle as it would dramatically increase the size.
conf.addPlugin(({ settings }) => {
  return new webpack.ContextReplacementPlugin(
    /react-intl[/\\]locale-data$/,
    new RegExp(settings.app.intl.supportedLanguages.join("|"))
  );
});

// -- webpack.HotModuleReplacementPlugin (development mode only)
// -- https://webpack.js.org/plugins/hot-module-replacement-plugin
// This plugin enables hot-module reloading for development efficiency. HMR means you can
// make changes to your frontend code and changes are immediate without needing a hard refresh.
conf.addPlugin(DEV_ONLY, CLIENT_ONLY, () => {
  return new webpack.HotModuleReplacementPlugin();
});

// -- ReactLoadablePlugin (production only)
// -- https://github.com/jamiebuilds/react-loadable#webpack-plugin
// This plugin instructs Webpack to output a list of asynchronously-loadable
// React components into a JSON file, which can then be consumed server side.
conf.addPlugin(PROD_ONLY, CLIENT_ONLY, ({ paths }) => {
  return new ReactLoadablePlugin({
    filename: paths.asyncModuleStats
  });
});

// -- LodashWebpackPlugin
// -- https://github.com/lodash/lodash-webpack-plugin
// This plugin finds and replaces lodash import statements with smaller alternatives,
// since many packages depend on Lodash and typically import the whole 80+kb library.
conf.addPlugin(() => {
  return new LodashWebpackPlugin({
    exotics: true,
    deburring: true,
    unicode: true,
    cloning: true,
    currying: true,
    shorthands: true,
    collections: true,
    placeholders: true
  });
});

// -- webpack.HashedModuleIdsPlugin (production only)
// -- https://webpack.js.org/plugins/hashed-module-ids-plugin/
// This plugin prevents hash changes on the vendor bundle if code changes only occurred
// in the main app bundle.
conf.addPlugin(PROD_ONLY, () => {
  return new webpack.HashedModuleIdsPlugin();
});

// -- CopyWebpackPlugin
// --
// This plugin copies over normalize.css into our build directory, then subsequently
// referenced from the root HTML file via HtmlWebpackIncludeAssetsPlugin.
conf.addPlugin(CLIENT_ONLY, ({ paths }) => {
  return new CopyWebpackPlugin([
    {
      from: "node_modules/normalize.css/normalize.css",
      to: `${paths.outputDir}/client/styles/normalize.css`
    }
  ]);
});

// -- MiniCssExtractPlugin (production only)
// -- https://github.com/webpack-contrib/mini-css-extract-plugin
// This plugin is responsible for extracting all processed CSS rules into a separate
// CSS file and referenced from the root HTML file via link tag(s).
conf.addPlugin(PROD_ONLY, CLIENT_ONLY, () => {
  return new MiniCssExtractPlugin({
    filename: "styles/[name].[chunkhash].css",
    chunkFilename: "styles/[id].[chunkhash].css"
  });
});

// -- HtmlWebpackPlugin
// -- https://github.com/jantimon/html-webpack-plugin
// This plugin is used to generate the final root index.html with the resulting compiled
// filenames included in script and style tags; as with CleanWebpackPlugin, this can't
// be manually written due to the file hashes which is only determined after compilation.
conf.addPlugin(CLIENT_ONLY, ({ paths }) => {
  return new HtmlWebpackPlugin({
    filename: "index.html",
    template: paths.rootHTMLTemplate,
    vars: {
      seosPlaceholder: "",
      criticalCSSPlaceholder: "",
      appPlaceholder: "",
      preloadablesPlaceholder: "",
      initialStatePlaceholder: "undefined"
    }
  });
});
conf.addPlugin(PROD_ONLY, CLIENT_ONLY, ({ paths }) => {
  return new HtmlWebpackPlugin({
    filename: "index.gohtml",
    template: paths.rootHTMLTemplate,
    vars: {
      seosPlaceholder: "{{.SeoElements}}",
      criticalCSSPlaceholder: "{{.CriticalCSS}}",
      appPlaceholder: "{{.App}}",
      preloadablesPlaceholder: "{{.Preloadables}}",
      initialStatePlaceholder: "{{.InitialState}}"
    }
  });
});

// -- FaviconsWebpackPlugin
// -- https://github.com/jantimon/favicons-webpack-plugin
// This plugin generates 30+ different icons for different devices from a default logo.png.
// For optimal results, its recommended to use 500x500 PNG image for the logo.
conf.addPlugin(PROD_ONLY, CLIENT_ONLY, ({ paths, settings }) => {
  return new FaviconsWebpackPlugin({
    logo: `${paths.clientSource}/logo.png`,
    prefix: `icons-[hash]/`,
    emitStats: true,
    statsFilename: `iconstats-[hash].json`,
    persistentCache: true,
    inject: true,
    background: "#fff",
    title: settings.app.name,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: false,
      favicons: true,
      firefox: false,
      opengraph: true,
      twitter: false,
      yandex: false,
      windows: false
    }
  });
});

// -- HtmlWebpackIncludeAssetsPlugin
// -- https://github.com/jharris4/html-webpack-include-assets-plugin
// This plugin works in conjunction with HtmlWebpackPlugin and includes references
// to resources not under webpack control, but included with CopyWebpackPlugin
conf.addPlugin(CLIENT_ONLY, () => {
  return new HtmlWebpackIncludeAssetsPlugin({
    append: false,
    assets: []
  });
});

// -- SubresourceIntegrityPlugin (production only)
// -- https://github.com/waysact/webpack-subresource-integrity
// This plugin works in conjunction with HtmlWebpackPlugin and utilizes browser's
// SRI features, which ensures assets aren't tempered with inflight.
conf.addPlugin(PROD_ONLY, CLIENT_ONLY, () => {
  return new SubresourceIntegrityPlugin({
    enabled: true,
    hashFuncNames: ["sha256", "sha512"]
  });
});

// -- CompressionWebpackPlugin (production only)
// -- https://github.com/webpack-contrib/compression-webpack-plugin
// This plugin compresses all outputs matching the regex with gzip.
conf.addPlugin(PROD_ONLY, CLIENT_ONLY, () => {
  return new CompressionWebpackPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: new RegExp("\\.(js|css)$"),
    minRatio: 0.8
  });
});

// -- RemoveServiceWorkerPlugin
// -- https://github.com/NekR/self-destroying-sw/tree/master/packages/webpack-remove-serviceworker-plugin
// This plugin essentially invalidates service worker caches during development
conf.addPlugin(CLIENT_ONLY, () => {
  return new RemoveServiceWorkerPlugin();
});

// -- OfflinePlugin
// -- https://github.com/NekR/offline-plugin
// This plugin creates a service worker script specifically for SPAs.
conf.addPlugin(CLIENT_ONLY, ({ isDevMode }) => {
  return new OfflinePlugin({
    caches: "all",
    appShell: "/",
    responseStrategy: isDevMode ? "network-first" : "cache-first",
    excludes: ["**/*.map", "index.gohtml"],
    autoUpdate: 1000 * 60 * 3,
    AppCache: false,
    ServiceWorker: {
      events: true,
      minify: false,
      navigateFallbackURL: "/"
    }
  });
});

// -- BundleAnalyzerPlugin (production only)
// -- https://github.com/webpack-contrib/webpack-bundle-analyzer
// This plugin will output a HTML file containing stats of the build output
// the information is useful for analysing bundle sizes and bloat culprits
conf.addPlugin(PROD_ONLY, ({ paths, buildSource }) => {
  return new BundleAnalyzerPlugin({
    analyzerMode: "static",
    openAnalyzer: !!!process.env.CI,
    generateStatsFile: true,
    statsFilename: `${paths.outputDir}/${buildSource}/bundlestats.json`,
    reportFilename: `${paths.outputDir}/${buildSource}/bundlestats.html`
  });
});

/// #####################################################################################################################
//
//    *** ENTRYPOINT ***
//
// #####################################################################################################################

// the main entrypoint for webpack
// see -> https://webpack.js.org/configuration/
// settings are derived from the `--env.[...]` flags passed from the
// CLI. E.G. --env.mode translates to settings.mode

// the return value is the full webpack config as a JS object
// see the link above for a full example of what the object looks like
// alternatively, start here to get a proper grasp of the webpack tool itself
// https://webpack.js.org/concepts/
module.exports = async settings => await conf.build(settings);
