
# clean-webpack-plugin 


### version
4.0.0 • 


### downloads
1,900,327 


### repository
github.com/johnagan/clean-webpack-plugin 


### homepage
github.com/johnagan/clean-webpack-plugin 


## default readme



#  Clean plugin for webpack

[![npm](https://camo.githubusercontent.com/c11450664fc01812161b8ff72f573521b433e91a747912dda18e69124f070421/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f636c65616e2d7765627061636b2d706c7567696e2e7376673f6c6162656c3d6e706d25323076657273696f6e)](https://www.npmjs.com/package/clean-
webpack-plugin) [![MIT
License](https://camo.githubusercontent.com/d59450139b6d354f15a2252a47b457bb2cc43828/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f7365727665726c6573732e737667)](https://github.com/johnagan/clean-
webpack-plugin/blob/HEAD/LICENSE) [![Linux Build
Status](https://camo.githubusercontent.com/92018d338fa2eee117ebc25a74f70b6dee123f64c97787ab5ee8e888ac582b21/68747470733a2f2f696d672e736869656c64732e696f2f636972636c6563692f70726f6a6563742f6769746875622f6a6f686e6167616e2f636c65616e2d7765627061636b2d706c7567696e2f6d61737465722e7376673f6c6162656c3d6c696e75782532306275696c64)](https://circleci.com/gh/johnagan/clean-
webpack-plugin/tree/master) [![Windows Build
Status](https://camo.githubusercontent.com/eb595a6ca613ef4d19f8fed5510dc7040686d38a559ae87015ece5fd73d5fcda/68747470733a2f2f696d672e736869656c64732e696f2f6170707665796f722f63692f6a6f686e6167616e2f636c65616e2d7765627061636b2d706c7567696e2f6d61737465722e7376673f6c6162656c3d77696e646f77732532306275696c64)](https://ci.appveyor.com/project/johnagan/clean-
webpack-plugin/branch/master) [![Coveralls
Status](https://camo.githubusercontent.com/3043e79e1bb11495664a1f7fe44f60c5ea60caadede520e542ce7d0bec3fbadf/68747470733a2f2f696d672e736869656c64732e696f2f636f6465636f762f632f6769746875622f6a6f686e6167616e2f636c65616e2d7765627061636b2d706c7567696e2f6d61737465722e737667)](https://codecov.io/gh/johnagan/clean-
webpack-plugin/branch/master)

A webpack plugin to remove/clean your build folder(s).

> NOTE: Node v10+ and webpack v4+ are supported and tested.

##  About

By default, this plugin will remove all files inside webpack's `output.path`
directory, as well as all unused webpack assets after every successful
rebuild.

> Coming from `v1`? Please read about [additional v2
> information](https://github.com/johnagan/clean-webpack-plugin/issues/106).

##  Installation

`npm install --save-dev clean-webpack-plugin`

##  Usage

    
    
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    
    const webpackConfig = {
        plugins: [
            /**
             * All files inside webpack's output.path directory will be removed once, but the
             * directory itself will not be. If using webpack 4+'s default configuration,
             * everything under <PROJECT_DIR>/dist/ will be removed.
             * Use cleanOnceBeforeBuildPatterns to override this behavior.
             *
             * During rebuilds, all webpack assets that are not used anymore
             * will be removed automatically.
             *
             * See `Options and Defaults` for information
             */
            new CleanWebpackPlugin(),
        ],
    };
    
    module.exports = webpackConfig;

##  Options and Defaults (Optional)

    
    
    new CleanWebpackPlugin({
        // Simulate the removal of files
        //
        // default: false
        dry: true,
    
        // Write Logs to Console
        // (Always enabled when dry is true)
        //
        // default: false
        verbose: true,
    
        // Automatically remove all unused webpack assets on rebuild
        //
        // default: true
        cleanStaleWebpackAssets: false,
    
        // Do not allow removal of current webpack assets
        //
        // default: true
        protectWebpackAssets: false,
    
        // **WARNING**
        //
        // Notes for the below options:
        //
        // They are unsafe...so test initially with dry: true.
        //
        // Relative to webpack's output.path directory.
        // If outside of webpack's output.path directory,
        //    use full path. path.join(process.cwd(), 'build/**/*')
        //
        // These options extend del's pattern matching API.
        // See https://github.com/sindresorhus/del#patterns
        //    for pattern matching documentation
    
        // Removes files once prior to Webpack compilation
        //   Not included in rebuilds (watch mode)
        //
        // Use !negative patterns to exclude files
        //
        // default: ['**/*']
        cleanOnceBeforeBuildPatterns: [
            '**/*',
            '!static-files*',
            '!directoryToExclude/**',
        ],
        cleanOnceBeforeBuildPatterns: [], // disables cleanOnceBeforeBuildPatterns
    
        // Removes files after every build (including watch mode) that match this pattern.
        // Used for files that are not created directly by Webpack.
        //
        // Use !negative patterns to exclude files
        //
        // default: []
        cleanAfterEveryBuildPatterns: ['static*.*', '!static1.js'],
    
        // Allow clean patterns outside of process.cwd()
        //
        // requires dry option to be explicitly set
        //
        // default: false
        dangerouslyAllowCleanPatternsOutsideProject: true,
    });

##  Example Webpack Config

This is a modified version of [WebPack's Plugin
documentation](https://webpack.js.org/concepts/plugins/) that includes the
Clean Plugin.

    
    
    const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm
    const HtmlWebpackPlugin = require('html-webpack-plugin'); // installed via npm
    const webpack = require('webpack'); // to access built-in plugins
    const path = require('path');
    
    module.exports = {
        entry: './path/to/my/entry/file.js',
        output: {
            /**
             * With zero configuration,
             *   clean-webpack-plugin will remove files inside the directory below
             */
            path: path.resolve(process.cwd(), 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    loader: 'babel-loader',
                },
            ],
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({ template: './src/index.html' }),
        ],
    };





            