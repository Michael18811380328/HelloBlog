
# resolve-url-loader 


### version
5.0.0 • 


### downloads
7,309,909 


### repository
github.com/bholloway/resolve-url-loader 


### homepage
github.com/bholloway/resolve-url-loader/tree/v3-maintenance/packages/resolve-url-loader 


## default readme



#  Resolve URL Loader

[![NPM](https://camo.githubusercontent.com/77c379c38f12cc67385694e469bc7a6afa05fc97099a43a8bcd74711f11633e6/68747470733a2f2f6e6f6465692e636f2f6e706d2f7265736f6c76652d75726c2d6c6f616465722e706e67)](https://www.npmjs.com/package/resolve-
url-loader)

This **webpack loader** allows you to have a distributed set SCSS files and
assets co-located with those SCSS files.

##  Do you organise your SCSS and assets by feature?

Where are your assets?

  * ✅ I want my assets all over the place, next to my SCSS files.
  * ❌ My assets are in a single directory.

How complicated is your SASS?

  * ✅ I have a deep SASS composition with partials importing other partials.
  * ✅ My asset paths are constructed by functions or `@mixin`s.
  * ❌ I have a single SCSS file. The asset paths are just explicit in that.

What asset paths are you using?

  * ✅ Fully relative `url(./foo.png)` or `url(foo.png)`
  * ❌ Root relative `url(/foo.png)`
  * ❌ Relative to some package or webpack root `url(~stuff/foo.png`)
  * ❌ Relative to some variable which is your single asset directory `url($variable/foo.png)`

What webpack errors are you getting?

  * ✅ Webpack can't find the relative asset `foo.png` 😞
  * ❌ Webpack says it doesn't have a loader for `fully/resolved/path/foo.png` 😕

If you can tick at least 1 item in **all of these questions** then use this
loader. It will allow webpack to find assets with **fully relative paths**.

If for any question you can't tick _any_ items then webpack should be able to
already find your assets. You don't need this loader. 🤷

Once webpack resolves your assets (even if it complains about loading them)
then this loading is working correctly. 👍

##  What's the problem with SASS?

When you use **fully relative paths** in `url()` statements then Webpack
expects to find those assets next to the root SCSS file, regardless of where
you specify the `url()`.

To illustrate here are 3 simple examples of SASS and Webpack _without_
`resolve-url-loader`.

[![the basic problem](https://raw.githubusercontent.com/bholloway/resolve-url-
loader/v5/packages/resolve-url-loader/docs/basic-
problem.svg)](https://github.com/bholloway/resolve-url-
loader/blob/HEAD/packages/resolve-url-loader/docs/basic-problem.svg)

The first 2 cases are trivial and work fine. The asset is specified in the
root SCSS file and Webpack finds it.

But any practical SASS composition will have nested SCSS files, as in the 3rd
case. Here Webpack cannot find the asset.

    
    
    Module not found: Can't resolve './cool.png' in '/absolute/path/.../my-project/src/styles.scss'
    

The path we present to Webpack really needs to be `./subdir/cool.png` but we
don't want to write that in our SCSS. 😒

Luckily we can use `resolve-url-loader` to do the **url re-writing** and make
it work. 😊🎉

With functions and mixins and multiple nesting it gets more complicated. Read
more detail in [how the loader works](https://github.com/bholloway/resolve-
url-loader/blob/HEAD/packages/resolve-url-loader/docs/how-it-works.md). 🤓

##  Getting started

> **Upgrading?** the [changelog](https://github.com/bholloway/resolve-url-
> loader/blob/HEAD/packages/resolve-url-loader/CHANGELOG.md) shows how to
> migrate your webpack config.

###  Install

via npm

    
    
    npm install resolve-url-loader --save-dev

via yarn

    
    
    yarn add resolve-url-loader --dev

###  Configure Webpack

The typical use case is `resolve-url-loader` between `sass-loader` and `css-
loader`.

**⚠️ IMPORTANT**

  * **source-maps required** for loaders preceding `resolve-url-loader` (regardless of `devtool`).
  * Always use **full loader package name** (don't omit `-loader`) otherwise you can get errors that are hard to debug.

    
    
    rules: [
      {
        test: /\.scss$/,
        use: [
          ...
          {
            loader: 'css-loader',
            options: {...}
          }, {
            loader: 'resolve-url-loader',
            options: {...}
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // <-- !!IMPORTANT!!
            }
          }
        ]
      },
      ...
    ]

##  Options

The loader should work without options but use these as required.

option | type | default |  | description  
---|---|---|---|---  
`sourceMap` | boolean | `false` |  | Generate an outgoing source-map.  
`removeCR` | boolean |  `true` Windows OS  
`false` otherwise |  | Convert orphan CR to whitespace.  
See known issues below.  
`debug` | boolean | `false` |  | Display debug information.  
`silent` | boolean | `false` |  | Do **not** display warnings or deprecation messages.  
`root` | string | _unset_ |  | Similar to the (now defunct) option in `css-loader`.  
This string, possibly empty, is prepended to absolute URIs.  
Absolute URIs are only processed if this option is set.  
`join` | function | _inbuilt_ | advanced | Custom join function.  
Use custom javascript to fix asset paths on a per-case basis.  
Refer to the [advanced features](https://github.com/bholloway/resolve-url-
loader/blob/HEAD/packages/resolve-url-loader/docs/advanced-features.md) docs.  
  
##  Limitations

###  Compatibility

Tested `macOS` and `Windows`.

All `webpack@4`-`webpack@5` with contemporaneous loaders/plugins using
`node@12`.

Refer to `test` directory for full webpack configurations as used in automated
tests.

###  Known issues

Read the [troubleshooting](https://github.com/bholloway/resolve-url-
loader/blob/HEAD/packages/resolve-url-loader/docs/troubleshooting.md) docs
before raising an issue.





            