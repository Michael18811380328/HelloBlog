
# terser-webpack-plugin 


### version
5.3.10 • 


### downloads
26,667,186 


### repository
github.com/webpack-contrib/terser-webpack-plugin 


### homepage
github.com/webpack-contrib/terser-webpack-plugin 


## default readme



[
![](https://camo.githubusercontent.com/b0573f87b0786eda63c76f2a9a1358e7a653783c25c03c6c908a00b70c713d78/68747470733a2f2f7765627061636b2e6a732e6f72672f6173736574732f69636f6e2d7371756172652d6269672e737667)
](https://github.com/webpack/webpack)

[![npm](https://camo.githubusercontent.com/6e0c1f35284601fbe45b577132801866989d1de181199a6060007f0984397e77/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7465727365722d7765627061636b2d706c7567696e2e737667)](https://npmjs.com/package/terser-
webpack-plugin)
[![node](https://camo.githubusercontent.com/02a0194918af6224bbcb6769198a1a569b680b15cf0a85f3cc0c07a5f80d9c33/68747470733a2f2f696d672e736869656c64732e696f2f6e6f64652f762f7465727365722d7765627061636b2d706c7567696e2e737667)](https://nodejs.org)
[![tests](https://github.com/webpack-contrib/terser-webpack-
plugin/workflows/terser-webpack-plugin/badge.svg)](https://github.com/webpack-
contrib/terser-webpack-plugin/actions)
[![cover](https://camo.githubusercontent.com/cb76a0e0ae1ba01162cb6f6f508a2b636a7282f77782f2937e0d132d9cc67b5d/68747470733a2f2f636f6465636f762e696f2f67682f7765627061636b2d636f6e747269622f7465727365722d7765627061636b2d706c7567696e2f6272616e63682f6d61737465722f67726170682f62616467652e737667)](https://codecov.io/gh/webpack-
contrib/terser-webpack-plugin)
[![discussion](https://camo.githubusercontent.com/7eb0718f4a3bdd19ef55cbe9d7e73b29ee2735271d2cd0c94aaccb1e8788ea79/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f64697363757373696f6e732f7765627061636b2f7765627061636b)](https://github.com/webpack/webpack/discussions)
[![size](https://camo.githubusercontent.com/6ddd3bd343f29fae649ca613ddd8b98aca238d2f1f467a856074766480a5a7f5/68747470733a2f2f7061636b61676570686f6269612e6e6f772e73682f62616467653f703d7465727365722d7765627061636b2d706c7567696e)](https://packagephobia.now.sh/result?p=terser-
webpack-plugin)

# terser-webpack-plugin

This plugin uses [terser](https://github.com/terser/terser) to minify/minimize
your JavaScript.

## Getting Started

Webpack v5 comes with the latest `terser-webpack-plugin` out of the box. If
you are using Webpack v5 or above and wish to customize the options, you will
still need to install `terser-webpack-plugin`. Using Webpack v4, you have to
install `terser-webpack-plugin` v4.

To begin, you'll need to install `terser-webpack-plugin`:

    
    
    npm install terser-webpack-plugin --save-dev

or

    
    
    yarn add -D terser-webpack-plugin

or

    
    
    pnpm add -D terser-webpack-plugin

Then add the plugin to your `webpack` config. For example:

**webpack.config.js**

    
    
    const TerserPlugin = require("terser-webpack-plugin");
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
    };

And run `webpack` via your preferred method.

## Note about source maps

**Works only with`source-map`, `inline-source-map`, `hidden-source-map` and
`nosources-source-map` values for the
[`devtool`](https://webpack.js.org/configuration/devtool/) option.**

Why?

  * `eval` wraps modules in `eval("string")` and the minimizer does not handle strings.
  * `cheap` has not column information and minimizer generate only a single line, which leave only a single mapping.

Using supported `devtool` values enable source map generation.

## Options

  * **`test`**
  * **`include`**
  * **`exclude`**
  * **`parallel`**
  * **`minify`**
  * **`terserOptions`**
  * **`extractComments`**

### `test`

Type:

    
    
    type test = string | RegExp | Array<string | RegExp>;

Default: `/\.m?js(\?.*)?$/i`

Test to match files against.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
          }),
        ],
      },
    };

### `include`

Type:

    
    
    type include = string | RegExp | Array<string | RegExp>;

Default: `undefined`

Files to include.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            include: /\/includes/,
          }),
        ],
      },
    };

### `exclude`

Type:

    
    
    type exclude = string | RegExp | Array<string | RegExp>;

Default: `undefined`

Files to exclude.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            exclude: /\/excludes/,
          }),
        ],
      },
    };

### `parallel`

Type:

    
    
    type parallel = boolean | number;

Default: `true`

Use multi-process parallel running to improve the build speed. Default number
of concurrent runs: `os.cpus().length - 1`.

> **Note**
>
> Parallelization can speedup your build significantly and is therefore
> **highly recommended**.

> **Warning**
>
> If you use **Circle CI** or any other environment that doesn't provide real
> available count of CPUs then you need to setup explicitly number of CPUs to
> avoid `Error: Call retries were exceeded` (see
> [#143](https://github.com/webpack-contrib/terser-webpack-plugin/issues/143),
> [#202](https://github.com/webpack-contrib/terser-webpack-
> plugin/issues/202)).

#### `boolean`

Enable/disable multi-process parallel running.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
          }),
        ],
      },
    };

#### `number`

Enable multi-process parallel running and set number of concurrent runs.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: 4,
          }),
        ],
      },
    };

### `minify`

Type:

    
    
    type minify = (
      input: {
        [file: string]: string;
      },
      sourceMap: import("@jridgewell/trace-mapping").SourceMapInput | undefined,
      minifyOptions: {
        module?: boolean | undefined;
        ecma?: import("terser").ECMA | undefined;
      },
      extractComments:
        | boolean
        | "all"
        | "some"
        | RegExp
        | ((
            astNode: any,
            comment: {
              value: string;
              type: "comment1" | "comment2" | "comment3" | "comment4";
              pos: number;
              line: number;
              col: number;
            }
          ) => boolean)
        | {
            condition?:
              | boolean
              | "all"
              | "some"
              | RegExp
              | ((
                  astNode: any,
                  comment: {
                    value: string;
                    type: "comment1" | "comment2" | "comment3" | "comment4";
                    pos: number;
                    line: number;
                    col: number;
                  }
                ) => boolean)
              | undefined;
            filename?: string | ((fileData: any) => string) | undefined;
            banner?:
              | string
              | boolean
              | ((commentsFile: string) => string)
              | undefined;
          }
        | undefined
    ) => Promise<{
      code: string;
      map?: import("@jridgewell/trace-mapping").SourceMapInput | undefined;
      errors?: (string | Error)[] | undefined;
      warnings?: (string | Error)[] | undefined;
      extractedComments?: string[] | undefined;
    }>;

Default: `TerserPlugin.terserMinify`

Allows you to override default minify function. By default plugin uses
[terser](https://github.com/terser/terser) package. Useful for using and
testing unpublished versions or forks.

> **Warning**
>
> **Always use`require` inside `minify` function when `parallel` option
> enabled**.

**webpack.config.js**

    
    
    // Can be async
    const minify = (input, sourceMap, minimizerOptions, extractsComments) => {
      // The `minimizerOptions` option contains option from the `terserOptions` option
      // You can use `minimizerOptions.myCustomOption`
    
      // Custom logic for extract comments
      const { map, code } = require("uglify-module") // Or require('./path/to/uglify-module')
        .minify(input, {
          /* Your options for minification */
        });
    
      return { map, code, warnings: [], errors: [], extractedComments: [] };
    };
    
    // Used to regenerate `fullhash`/`chunkhash` between different implementation
    // Example: you fix a bug in custom minimizer/custom function, but unfortunately webpack doesn't know about it, so you will get the same fullhash/chunkhash
    // to avoid this you can provide version of your custom minimizer
    // You don't need if you use only `contenthash`
    minify.getMinimizerVersion = () => {
      let packageJson;
    
      try {
        // eslint-disable-next-line global-require, import/no-extraneous-dependencies
        packageJson = require("uglify-module/package.json");
      } catch (error) {
        // Ignore
      }
    
      return packageJson && packageJson.version;
    };
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              myCustomOption: true,
            },
            minify,
          }),
        ],
      },
    };

### `terserOptions`

Type:

    
    
    type terserOptions = {
      compress?: boolean | CompressOptions;
      ecma?: ECMA;
      enclose?: boolean | string;
      ie8?: boolean;
      keep_classnames?: boolean | RegExp;
      keep_fnames?: boolean | RegExp;
      mangle?: boolean | MangleOptions;
      module?: boolean;
      nameCache?: object;
      format?: FormatOptions;
      /** @deprecated */
      output?: FormatOptions;
      parse?: ParseOptions;
      safari10?: boolean;
      sourceMap?: boolean | SourceMapOptions;
      toplevel?: boolean;
    };

Default: [default](https://github.com/terser/terser#minify-options)

Terser [options](https://github.com/terser/terser#minify-options).

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: undefined,
              parse: {},
              compress: {},
              mangle: true, // Note `mangle.properties` is `false` by default.
              module: false,
              // Deprecated
              output: null,
              format: null,
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_classnames: undefined,
              keep_fnames: false,
              safari10: false,
            },
          }),
        ],
      },
    };

### `extractComments`

Type:

    
    
    type extractComments =
      | boolean
      | string
      | RegExp
      | ((
          astNode: any,
          comment: {
            value: string;
            type: "comment1" | "comment2" | "comment3" | "comment4";
            pos: number;
            line: number;
            col: number;
          }
        ) => boolean)
      | {
          condition?:
            | boolean
            | "all"
            | "some"
            | RegExp
            | ((
                astNode: any,
                comment: {
                  value: string;
                  type: "comment1" | "comment2" | "comment3" | "comment4";
                  pos: number;
                  line: number;
                  col: number;
                }
              ) => boolean)
            | undefined;
          filename?: string | ((fileData: any) => string) | undefined;
          banner?:
            | string
            | boolean
            | ((commentsFile: string) => string)
            | undefined;
        };

Default: `true`

Whether comments shall be extracted to a separate file, (see
[details](https://github.com/webpack/webpack/commit/71933e979e51c533b432658d5e37917f9e71595a)).
By default extract only comments using `/^\**!|@preserve|@license|@cc_on/i`
regexp condition and remove remaining comments. If the original file is named
`foo.js`, then the comments will be stored to `foo.js.LICENSE.txt`. The
`terserOptions.format.comments` option specifies whether the comment will be
preserved, i.e. it is possible to preserve some comments (e.g. annotations)
while extracting others or even preserving comments that have been extracted.

#### `boolean`

Enable/disable extracting comments.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: true,
          }),
        ],
      },
    };

#### `string`

Extract `all` or `some` (use `/^\**!|@preserve|@license|@cc_on/i` RegExp)
comments.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: "all",
          }),
        ],
      },
    };

#### `RegExp`

All comments that match the given expression will be extracted to the separate
file.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: /@extract/i,
          }),
        ],
      },
    };

#### `function`

All comments that match the given expression will be extracted to the separate
file.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: (astNode, comment) => {
              if (/@extract/i.test(comment.value)) {
                return true;
              }
    
              return false;
            },
          }),
        ],
      },
    };

#### `object`

Allow to customize condition for extract comments, specify extracted file name
and banner.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: {
              condition: /^\**!|@preserve|@license|@cc_on/i,
              filename: (fileData) => {
                // The "fileData" argument contains object with "filename", "basename", "query" and "hash"
                return `${fileData.filename}.LICENSE.txt${fileData.query}`;
              },
              banner: (licenseFile) => {
                return `License information can be found in ${licenseFile}`;
              },
            },
          }),
        ],
      },
    };

##### `condition`

Type:

    
    
    type condition =
      | boolean
      | "all"
      | "some"
      | RegExp
      | ((
          astNode: any,
          comment: {
            value: string;
            type: "comment1" | "comment2" | "comment3" | "comment4";
            pos: number;
            line: number;
            col: number;
          }
        ) => boolean)
      | undefined;

Condition what comments you need extract.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: {
              condition: "some",
              filename: (fileData) => {
                // The "fileData" argument contains object with "filename", "basename", "query" and "hash"
                return `${fileData.filename}.LICENSE.txt${fileData.query}`;
              },
              banner: (licenseFile) => {
                return `License information can be found in ${licenseFile}`;
              },
            },
          }),
        ],
      },
    };

##### `filename`

Type:

    
    
    type filename = string | ((fileData: any) => string) | undefined;

Default: `[file].LICENSE.txt[query]`

Available placeholders: `[file]`, `[query]` and `[filebase]` (`[base]` for
webpack 5).

The file where the extracted comments will be stored. Default is to append the
suffix `.LICENSE.txt` to the original filename.

> **Warning**
>
> We highly recommend using the `txt` extension. Using `js`/`cjs`/`mjs`
> extensions may conflict with existing assets which leads to broken code.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: {
              condition: /^\**!|@preserve|@license|@cc_on/i,
              filename: "extracted-comments.js",
              banner: (licenseFile) => {
                return `License information can be found in ${licenseFile}`;
              },
            },
          }),
        ],
      },
    };

##### `banner`

Type:

    
    
    type banner = string | boolean | ((commentsFile: string) => string) | undefined;

Default: `/*! For license information please see ${commentsFile} */`

The banner text that points to the extracted file and will be added on top of
the original file. Can be `false` (no banner), a `String`, or a
`Function<(string) -> String>` that will be called with the filename where
extracted comments have been stored. Will be wrapped into comment.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: {
              condition: true,
              filename: (fileData) => {
                // The "fileData" argument contains object with "filename", "basename", "query" and "hash"
                return `${fileData.filename}.LICENSE.txt${fileData.query}`;
              },
              banner: (commentsFile) => {
                return `My custom banner about license information ${commentsFile}`;
              },
            },
          }),
        ],
      },
    };

## Examples

### Preserve Comments

Extract all legal comments (i.e. `/^\**!|@preserve|@license|@cc_on/i`) and
preserve `/@license/i` comments.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: /@license/i,
              },
            },
            extractComments: true,
          }),
        ],
      },
    };

### Remove Comments

If you avoid building with comments, use this config:

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false,
              },
            },
            extractComments: false,
          }),
        ],
      },
    };

### [`uglify-js`](https://github.com/mishoo/UglifyJS)

[`UglifyJS`](https://github.com/mishoo/UglifyJS) is a JavaScript parser,
minifier, compressor and beautifier toolkit.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            minify: TerserPlugin.uglifyJsMinify,
            // `terserOptions` options will be passed to `uglify-js`
            // Link to options - https://github.com/mishoo/UglifyJS#minify-options
            terserOptions: {},
          }),
        ],
      },
    };

### [`swc`](https://github.com/swc-project/swc)

[`swc`](https://github.com/swc-project/swc) is a super-fast compiler written
in rust; producing widely-supported javascript from modern standards and
typescript.

> **Warning**
>
> the `extractComments` option is not supported and all comments will be
> removed by default, it will be fixed in future

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            minify: TerserPlugin.swcMinify,
            // `terserOptions` options will be passed to `swc` (`@swc/core`)
            // Link to options - https://swc.rs/docs/config-js-minify
            terserOptions: {},
          }),
        ],
      },
    };

### [`esbuild`](https://github.com/evanw/esbuild)

[`esbuild`](https://github.com/evanw/esbuild) is an extremely fast JavaScript
bundler and minifier.

> **Warning**
>
> the `extractComments` option is not supported and all legal comments (i.e.
> copyright, licenses and etc) will be preserved

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            minify: TerserPlugin.esbuildMinify,
            // `terserOptions` options will be passed to `esbuild`
            // Link to options - https://esbuild.github.io/api/#minify
            // Note: the `minify` options is true by default (and override other `minify*` options), so if you want to disable the `minifyIdentifiers` option (or other `minify*` options) please use:
            // terserOptions: {
            //   minify: false,
            //   minifyWhitespace: true,
            //   minifyIdentifiers: false,
            //   minifySyntax: true,
            // },
            terserOptions: {},
          }),
        ],
      },
    };

### Custom Minify Function

Override default minify function - use `uglify-js` for minification.

**webpack.config.js**

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            minify: (file, sourceMap) => {
              // https://github.com/mishoo/UglifyJS2#minify-options
              const uglifyJsOptions = {
                /* your `uglify-js` package options */
              };
    
              if (sourceMap) {
                uglifyJsOptions.sourceMap = {
                  content: sourceMap,
                };
              }
    
              return require("uglify-js").minify(file, uglifyJsOptions);
            },
          }),
        ],
      },
    };

### Typescript

With default terser minify function:

    
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: true,
            },
          }),
        ],
      },
    };

With built-in minify functions:

    
    
    import type { JsMinifyOptions as SwcOptions } from "@swc/core";
    import type { MinifyOptions as UglifyJSOptions } from "uglify-js";
    import type { TransformOptions as EsbuildOptions } from "esbuild";
    import type { MinifyOptions as TerserOptions } from "terser";
    
    module.exports = {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin<SwcOptions>({
            minify: TerserPlugin.swcMinify,
            terserOptions: {
              // `swc` options
            },
          }),
          new TerserPlugin<UglifyJSOptions>({
            minify: TerserPlugin.uglifyJsMinify,
            terserOptions: {
              // `uglif-js` options
            },
          }),
          new TerserPlugin<EsbuildOptions>({
            minify: TerserPlugin.esbuildMinify,
            terserOptions: {
              // `esbuild` options
            },
          }),
    
          // Alternative usage:
          new TerserPlugin<TerserOptions>({
            minify: TerserPlugin.terserMinify,
            terserOptions: {
              // `terser` options
            },
          }),
        ],
      },
    };

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet
done so.

[CONTRIBUTING](https://github.com/webpack-contrib/terser-webpack-
plugin/blob/HEAD/.github/CONTRIBUTING.md)

## License

[MIT](https://github.com/webpack-contrib/terser-webpack-
plugin/blob/HEAD/LICENSE)





            