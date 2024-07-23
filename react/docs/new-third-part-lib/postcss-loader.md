
# postcss-loader 


### version
8.1.1 • 


### downloads
14,030,520 


### repository
github.com/webpack-contrib/postcss-loader 


### homepage
github.com/webpack-contrib/postcss-loader 


## default readme


# postcss-loader

Loader to process CSS with [`PostCSS`](https://github.com/postcss/postcss).

## Getting Started

You need webpack v5 to use the latest version. For Webpack v4, you have to
install postcss-loader v4.

To begin, you'll need to install `postcss-loader` and `postcss`:

    
    
    npm install --save-dev postcss-loader postcss

or

    
    
    yarn add -D postcss-loader postcss

or

    
    
    pnpm add -D postcss-loader postcss

Then add the plugin to your `webpack` config. For example:

> In the following configuration the plugin [`postcss-preset-
> env`](https://github.com/csstools/postcss-preset-env) is used, which is not
> installed by default.

**file.js**

    
    
    import css from "file.css";

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        "postcss-preset-env",
                        {
                          // Options
                        },
                      ],
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
    };

Alternative use with config files:

**postcss.config.js**

    
    
    module.exports = {
      plugins: [
        [
          "postcss-preset-env",
          {
            // Options
          },
        ],
      ],
    };

The loader **automatically** searches for configuration files.

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader", "postcss-loader"],
          },
        ],
      },
    };

And run `webpack` via your preferred method.

## Options

  * `execute`
  * `postcssOptions`
  * `sourceMap`
  * `implementation`

### `execute`

Type:

    
    
    type execute = boolean;

Default: `undefined`

Enable PostCSS Parser support in `CSS-in-JS`. If you use JS styles the
[`postcss-js`](https://github.com/postcss/postcss-js) parser, add the
`execute` option.

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.style.js$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
              },
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    parser: "postcss-js",
                  },
                  execute: true,
                },
              },
            ],
          },
        ],
      },
    };

### `postcssOptions`

See the file [`./src/config.d.ts`](https://github.com/webpack-contrib/postcss-
loader/blob/HEAD/src/config.d.ts).

Type:

    
    
    import type { Config as PostCSSConfig } from "postcss-load-config";
    import type { LoaderContext } from "webpack";
    
    type PostCSSLoaderContext = LoaderContext<PostCSSConfig>;
    
    interface PostCSSLoaderAPI {
      mode: PostCSSLoaderContext["mode"];
      file: PostCSSLoaderContext["resourcePath"];
      webpackLoaderContext: PostCSSLoaderContext;
      env: PostCSSLoaderContext["mode"];
      options: PostCSSConfig;
    }
    
    export type PostCSSLoaderOptions =
      | PostCSSConfig
      | ((api: PostCSSLoaderAPI) => PostCSSConfig);

Default: `undefined`

Allows to set [`PostCSS options`](https://postcss.org/api/#processoptions) and
plugins.

All `PostCSS` options are supported. There is the special `config` option for
config files. How it works and how it can be configured is described below.

We recommend do not specify `from`, `to` and `map` options, because this can
lead to wrong path in source maps. If you need source maps please use the
`sourcemap` option.

For large projects, to optimize performance of the loader, it is better to
provide `postcssOptions` in loader config and specify `config: false`. This
approach removes the need to lookup and load external config files multiple
times during compilation.

#### `object`

Setup `plugins`:

**webpack.config.js** (**recommended**)

    
    
    const myOtherPostcssPlugin = require("postcss-my-plugin");
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.sss$/i,
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-import",
                  ["postcss-short", { prefix: "x" }],
                  require.resolve("my-postcss-plugin"),
                  myOtherPostcssPlugin({ myOption: true }),
                  // Deprecated and will be removed in the next major release
                  { "postcss-nested": { preserveEmpty: true } },
                ],
              },
            },
          },
        ],
      },
    };

**webpack.config.js** (**deprecated** , will be removed in the next major
release)

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.sss$/i,
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: {
                  "postcss-import": {},
                  "postcss-short": { prefix: "x" },
                },
              },
            },
          },
        ],
      },
    };

Setup `syntax`:

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.sss$/i,
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // Can be `string`
                syntax: "sugarss",
                // Can be `object`
                syntax: require("sugarss"),
              },
            },
          },
        ],
      },
    };

Setup `parser`:

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.sss$/i,
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // Can be `string`
                parser: "sugarss",
                // Can be `object`
                parser: require("sugarss"),
                // Can be `function`
                parser: require("sugarss").parse,
              },
            },
          },
        ],
      },
    };

Setup `stringifier`:

**webpack.config.js**

    
    
    const Midas = require("midas");
    const midas = new Midas();
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.sss$/i,
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // Can be `string`
                stringifier: "sugarss",
                // Can be `object`
                stringifier: require("sugarss"),
                // Can be `function`
                stringifier: midas.stringifier,
              },
            },
          },
        ],
      },
    };

#### `function`

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.(css|sss)$/i,
            loader: "postcss-loader",
            options: {
              postcssOptions: (loaderContext) => {
                if (/\.sss$/.test(loaderContext.resourcePath)) {
                  return {
                    parser: "sugarss",
                    plugins: [
                      ["postcss-short", { prefix: "x" }],
                      "postcss-preset-env",
                    ],
                  };
                }
    
                return {
                  plugins: [
                    ["postcss-short", { prefix: "x" }],
                    "postcss-preset-env",
                  ],
                };
              },
            },
          },
        ],
      },
    };

#### `config`

Type:

    
    
    type config = boolean | string;

Default: `true`

Allows to set options using config files. Options specified in the config file
are combined with options passed to the loader, the loader options overwrite
options from config.

##### Config Files

The loader will search up the directory tree for configuration in the
following places:

  * a `postcss` property in `package.json`
  * a `.postcssrc` file in JSON or YAML format
  * a `.postcssrc.json`, `.postcssrc.yaml`, `.postcssrc.yml`, `.postcssrc.js`, or `.postcssrc.cjs` file
  * a `postcss.config.js` or `postcss.config.cjs` CommonJS module exporting an object (**recommended**)

##### Examples of Config Files

Using `object` notation:

**postcss.config.js** (**recommend**)

    
    
    module.exports = {
      // You can specify any options from https://postcss.org/api/#processoptions here
      // parser: 'sugarss',
      plugins: [
        // Plugins for PostCSS
        ["postcss-short", { prefix: "x" }],
        "postcss-preset-env",
      ],
    };

Using `function` notation:

**postcss.config.js** (**recommend**)

    
    
    module.exports = (api) => {
      // `api.file` - path to the file
      // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
      // `api.webpackLoaderContext` - loader context for complex use cases
      // `api.env` - alias `api.mode` for compatibility with `postcss-cli`
      // `api.options` - the `postcssOptions` options
    
      if (/\.sss$/.test(api.file)) {
        return {
          // You can specify any options from https://postcss.org/api/#processoptions here
          parser: "sugarss",
          plugins: [
            // Plugins for PostCSS
            ["postcss-short", { prefix: "x" }],
            "postcss-preset-env",
          ],
        };
      }
    
      return {
        // You can specify any options from https://postcss.org/api/#processoptions here
        plugins: [
          // Plugins for PostCSS
          ["postcss-short", { prefix: "x" }],
          "postcss-preset-env",
        ],
      };
    };

**postcss.config.js** (**deprecated** , will be removed in the next major
release)

    
    
    module.exports = {
      // You can specify any options from https://postcss.org/api/#processoptions here
      // parser: 'sugarss',
      plugins: {
        // Plugins for PostCSS
        "postcss-short": { prefix: "x" },
        "postcss-preset-env": {},
      },
    };

##### Config Cascade

You can use different `postcss.config.js` files in different directories.
Config lookup starts from `path.dirname(file)` and walks the file tree upwards
until a config file is found.

    
    
    |– components
    | |– component
    | | |– index.js
    | | |– index.png
    | | |– style.css (1)
    | | |– postcss.config.js (1)
    | |– component
    | | |– index.js
    | | |– image.png
    | | |– style.css (2)
    |
    |– postcss.config.js (1 && 2 (recommended))
    |– webpack.config.js
    |
    |– package.json
    

After setting up your `postcss.config.js`, add `postcss-loader` to your
`webpack.config.js`. You can use it standalone or in conjunction with `css-
loader` (recommended).

Use it **before** `css-loader` and `style-loader`, but **after** other
preprocessor loaders like e.g `sass|less|stylus-loader`, if you use any (since
[webpack loaders evaluate right to left/bottom to
top](https://webpack.js.org/concepts/loaders/#configuration)).

**webpack.config.js** (**recommended**)

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                },
              },
              "postcss-loader",
            ],
          },
        ],
      },
    };

#### `boolean`

Enables/Disables autoloading config.

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: false,
              },
            },
          },
        ],
      },
    };

#### String

Allows to specify the path to the config file.

**webpack.config.js**

    
    
    const path = require("path");
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "custom.config.js"),
              },
            },
          },
        ],
      },
    };

### `sourceMap`

Type:

    
    
    type sourceMap = boolean;

Default: depends on the `compiler.devtool` value

By default generation of source maps depends on the
[`devtool`](https://webpack.js.org/configuration/devtool/) option. All values
enable source map generation except `eval` and `false` value.

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader", options: { sourceMap: true } },
              { loader: "postcss-loader", options: { sourceMap: true } },
              { loader: "sass-loader", options: { sourceMap: true } },
            ],
          },
        ],
      },
    };

Alternative setup:

**webpack.config.js**

    
    
    module.exports = {
      devtool: "source-map",
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
              { loader: "postcss-loader" },
              { loader: "sass-loader" },
            ],
          },
        ],
      },
    };

### `implementation`

Type:

    
    
    type implementation = object;

type of `implementation` should be the same as
[postcss.d.ts](https://github.com/postcss/postcss/blob/main/lib/postcss.d.ts)

Default: `postcss`

The special `implementation` option determines which implementation of PostCSS
to use. Overrides the locally installed `peerDependency` version of `postcss`.

**This option is only really useful for downstream tooling authors to ease the
PostCSS 7-to-8 transition.**

#### `function`

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
              {
                loader: "postcss-loader",
                options: { implementation: require("postcss") },
              },
              { loader: "sass-loader" },
            ],
          },
        ],
      },
    };

#### String

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
              {
                loader: "postcss-loader",
                options: { implementation: require.resolve("postcss") },
              },
              { loader: "sass-loader" },
            ],
          },
        ],
      },
    };

## Examples

### SugarSS

You'll need to install `sugarss`:

    
    
    npm install --save-dev sugarss

Using [`SugarSS`](https://github.com/postcss/sugarss) syntax.

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.sss$/i,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: { importLoaders: 1 },
              },
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    parser: "sugarss",
                  },
                },
              },
            ],
          },
        ],
      },
    };

### Autoprefixer

You'll need to install `autoprefixer`:

    
    
    npm install --save-dev autoprefixer

Add vendor prefixes to CSS rules using
[`autoprefixer`](https://github.com/postcss/autoprefixer).

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: { importLoaders: 1 },
              },
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        "autoprefixer",
                        {
                          // Options
                        },
                      ],
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
    };

> **Warning**
>
> [`postcss-preset-env`](https://github.com/csstools/postcss-preset-env)
> includes [`autoprefixer`](https://github.com/postcss/autoprefixer), so
> adding it separately is not necessary if you already use the preset. More
> [information](https://github.com/csstools/postcss-preset-env#autoprefixer)

### PostCSS Preset Env

You'll need to install `postcss-preset-env`:

    
    
    npm install --save-dev postcss-preset-env

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: { importLoaders: 1 },
              },
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        "postcss-preset-env",
                        {
                          // Options
                        },
                      ],
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
    };

### CSS Modules

What is `CSS Modules`? Please [read](https://github.com/webpack-contrib/css-
loader#modules).

No additional options required on the `postcss-loader` side. To make them work
properly, either add the `css-loader`’s `importLoaders` option.

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  importLoaders: 1,
                },
              },
              "postcss-loader",
            ],
          },
        ],
      },
    };

### CSS-in-JS and [`postcss-js`](https://github.com/postcss/postcss-js)

You'll need to install `postcss-js`:

    
    
    npm install --save-dev postcss-js

If you want to process styles written in JavaScript, use the [`postcss-
js`](https://github.com/postcss/postcss-js) parser.

**webpack.config.js**

    
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.style.js$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2,
                },
              },
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    parser: "postcss-js",
                  },
                  execute: true,
                },
              },
              "babel-loader",
            ],
          },
        ],
      },
    };

As result you will be able to write styles in the following way

    
    
    import colors from "./styles/colors";
    
    export default {
      ".menu": {
        color: colors.main,
        height: 25,
        "&_link": {
          color: "white",
        },
      },
    };

> **Warning**
>
> If you are using Babel you need to do the following in order for the setup
> to work

>   1. Add [`babel-plugin-add-module-
> exports`](https://github.com/59naga/babel-plugin-add-module-exports) to your
> configuration.
>   2. You need to have only one **default** export per style module.
>

### Extract CSS

Using [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-
extract-plugin).

**webpack.config.js**

    
    
    const isProductionMode = process.env.NODE_ENV === "production";
    
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    
    module.exports = {
      mode: isProductionMode ? "production" : "development",
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              isProductionMode ? MiniCssExtractPlugin.loader : "style-loader",
              "css-loader",
              "postcss-loader",
            ],
          },
        ],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: isProductionMode ? "[name].[contenthash].css" : "[name].css",
        }),
      ],
    };

### Emit assets

To write a asset from PostCSS plugin to the webpack, need to add a message in
`result.messages`.

The message should contain the following fields:

  * `type` = `asset` \- Message type (require, should be equal `asset`)
  * `file` \- file name (require)
  * `content` \- file content (require)
  * `sourceMap` \- sourceMap
  * `info` \- asset info

**webpack.config.js**

    
    
    const postcssCustomPlugin = (opts = {}) => {
      return {
        postcssPlugin: "postcss-custom-plugin",
        Once: (root, { result }) => {
          result.messages.push({
            type: "asset",
            file: "sprite.svg",
            content: "<svg>...</svg>",
          });
        },
      };
    };
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [postcssCustomPlugin()],
                  },
                },
              },
            ],
          },
        ],
      },
    };

### Add dependencies, contextDependencies, buildDependencies,
missingDependencies

The dependencies are necessary for webpack to understand when it needs to run
recompilation on the changed files.

There are two way to add dependencies:

  1. (Recommended). The plugin may emit messages in `result.messages`.

The message should contain the following fields:

  * `type` = `dependency` \- Message type (require, should be equal `dependency`, `context-dependency`, `build-dependency` or `missing-dependency`)
  * `file` \- absolute file path (require)

**webpack.config.js**

    
    
    const path = require("path");
    
    const postcssCustomPlugin = (opts = {}) => {
      return {
        postcssPlugin: "postcss-custom-plugin",
        Once: (root, { result }) => {
          result.messages.push({
            type: "dependency",
            file: path.resolve(__dirname, "path", "to", "file"),
          });
        },
      };
    };
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [postcssCustomPlugin()],
                  },
                },
              },
            ],
          },
        ],
      },
    };

Or you can use ready-made plugin [postcss-add-
dependencies](https://www.npmjs.com/package/postcss-add-dependencies).

  2. Pass `loaderContext` in plugin.

**webpack.config.js**

    
    
    const path = require("path");
    
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    config: path.resolve(__dirname, "path/to/postcss.config.js"),
                  },
                },
              },
            ],
          },
        ],
      },
    };

**postcss.config.js**

    
    
    module.exports = (api) => ({
      plugins: [
        require("path/to/postcssCustomPlugin.js")({
          loaderContext: api.webpackLoaderContext,
        }),
      ],
    });

**postcssCustomPlugin.js**

    
    
    const path = require("path");
    
    const postcssCustomPlugin = (opts = {}) => {
      return {
        postcssPlugin: "postcss-custom-plugin",
        Once: (root, { result }) => {
          opts.loaderContext.addDependency(
            path.resolve(__dirname, "path", "to", "file"),
          );
        },
      };
    };
    
    postcssCustomPlugin.postcss = true;
    module.exports = postcssCustomPlugin;

