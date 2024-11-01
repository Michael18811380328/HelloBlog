
# case-sensitive-paths-webpack-plugin 


### version
2.4.0 • 


### downloads
7,375,253 


### repository
github.com/Urthen/case-sensitive-paths-webpack-plugin 


### homepage
github.com/Urthen/case-sensitive-paths-webpack-plugin#readme 


## default readme



#  Case Sensitive Paths - Webpack Plugin

This Webpack plugin enforces the entire path of all required modules match the
exact case of the actual path on disk. Using this plugin helps alleviate cases
where developers working on OSX, which does not follow strict path case
sensitivity, will cause conflicts with other developers or build boxes running
other operating systems which require correctly cased paths.

[Previous](https://gist.github.com/Morhaus/333579c2a5b4db644bd50)
[iterations](https://github.com/dcousineau/force-case-sensitivity-webpack-
plugin) on this same idea provide the basis for this plugin, but unfortunately
do not properly check case on the entire path. This plugin fixes that. Example
output:

> ERROR in ./src/containers/SearchProducts.js Module not found: Error:
> [CaseSensitivePathsPlugin]
> `/Users/example/yourproject/src/components/searchProducts/searchproducts.js`
> does not match the corresponding path on disk
> `/Users/example/yourproject/src/components/searchproducts` @
> ./src/containers/SearchProducts.js 9:22-84

##  Install

    
    
    npm install --save-dev case-sensitive-paths-webpack-plugin
    

##  Usage

    
    
    var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
    
    var webpackConfig = {
        plugins: [
            new CaseSensitivePathsPlugin()
            // other plugins ...
        ]
        // other webpack config ...
    }

Want more information? Pass `{debug: true}` to the plugin like so:

    
    
    new CaseSensitivePathsPlugin({debug: true})

It will output every directory it reads, as well as a sum total of filesystem
operations. This is mostly useful for internal debugging of the plugin, but if
you find it useful, more power to you.

##  Demo

Check the `/demo` directory for a working example of the plugin in action,
with tests demonstrating the effect of the plugin. See `/demo/README.md` for
more.
            