
# postcss-normalize 


### version
10.0.1 • 


### downloads
3,122,883 


### repository
github.com/csstools/postcss-normalize 


### homepage
github.com/csstools/postcss-normalize#readme 


## default readme



#  PostCSS Normalize
[![PostCSS](https://camo.githubusercontent.com/eefaf3856d60dff5cecdaa97c2447067c2d705e9b87951f9b5f21185a445774f/68747470733a2f2f706f73746373732e6769746875622e696f2f706f73746373732f6c6f676f2e737667)](https://github.com/postcss/postcss)

[![npm
version](https://camo.githubusercontent.com/d0c4bfc628c3242243d13d4ac3c751ef1082a05b92cc4cf48c112a194138617a/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f706f73746373732d6e6f726d616c697a652e737667)](https://www.npmjs.com/package/postcss-
normalize) [![build
status](https://camo.githubusercontent.com/f8238486f247fab84fe475fc78c98b787ed203d44d66b0c4fc6c2e87db532679/68747470733a2f2f696d672e736869656c64732e696f2f7472617669732f637373746f6f6c732f706f73746373732d6e6f726d616c697a652f6d61696e2e737667)](https://travis-
ci.org/csstools/postcss-normalize) [![support
chat](https://camo.githubusercontent.com/1afa6341548226d43d9fd9093c2161b2dd22cb79bc2c95263245730abf987915/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f737570706f72742d636861742d626c75652e737667)](https://gitter.im/postcss/postcss)

[PostCSS Normalize](https://github.com/csstools/postcss-normalize) lets you
use the parts of [normalize.css](https://github.com/csstools/normalize.css) or
[sanitize.css](https://github.com/csstools/sanitize.css) that you need from
your [browserslist](http://browserl.ist/).

    
    
    @import "normalize.css";
    
    
    @import "sanitize.css";

**PostCSS Normalize** uses a non-opinionated version of
[normalize.css](https://github.com/csstools/normalize.css), but an opinionated
version may also be used.

    
    
    @import "normalize.css/opinionated.css";

###  Examples

Here is a sample of what **normalize.css** looks like when the
**browserslist** is `ie >= 9`:

    
    
    /**
     * Add the correct display in IE 9-.
     */
    
    audio,
    video {
      display: inline-block;
    }
    
    /**
     * Remove the border on images inside links in IE 10-.
     */
    
    img {
      border-style: none;
    }

And here is the same sample when the **browserslist** is `ie >= 10`:

    
    
    /**
     * Remove the border on images inside links in IE 10-.
     */
    
    img {
      border-style: none;
    }

##  Usage

Add [PostCSS Normalize](https://github.com/csstools/postcss-normalize) to your
project:

    
    
    npm install postcss-normalize --save-dev

Add a [browserslist](http://browserl.ist/) entry in `package.json`:

    
    
    {
      "browserslist": "last 2 versions"
    }

Use **PostCSS Normalize** to process your CSS:

    
    
    const postcssNormalize = require('postcss-normalize')
    
    postcssNormalize.process(YOUR_CSS /*, processOptions, pluginOptions */)

Or use it as a [PostCSS](https://github.com/postcss/postcss) plugin:

    
    
    const postcss = require('postcss')
    const postcssNormalize = require('postcss-normalize')
    
    postcss([
      postcssNormalize(/* pluginOptions */)
    ]).process(YOUR_CSS /*, processOptions */)

**PostCSS Normalize** runs in all Node environments, with special instructions
for:

[Node](https://github.com/csstools/postcss-normalize/blob/HEAD/INSTALL.md#node) | [PostCSS CLI](https://github.com/csstools/postcss-normalize/blob/HEAD/INSTALL.md#postcss-cli) | [Webpack](https://github.com/csstools/postcss-normalize/blob/HEAD/INSTALL.md#webpack) | [Create React App](https://github.com/csstools/postcss-normalize/blob/HEAD/INSTALL.md#create-react-app) | [Gulp](https://github.com/csstools/postcss-normalize/blob/HEAD/INSTALL.md#gulp) | [Grunt](https://github.com/csstools/postcss-normalize/blob/HEAD/INSTALL.md#grunt)  
---|---|---|---|---|---  
  
##  PostCSS Import Usage

**PostCSS Normalize** includes a `postcssImport` function to configure
[PostCSS Import](https://github.com/postcss/postcss-import) and allow you to
continue using the `@import` syntax.

    
    
    const postcss = require('postcss')
    const postcssImport = require('postcss-import')
    const postcssNormalize = require('postcss-normalize')
    
    postcss([
      postcssImport(
        postcssNormalize(
          /* pluginOptions (for PostCSS Normalize) */
        ).postcssImport(
          /* pluginOptions (for PostCSS Import) */
        )
      )
    ]) // now you can use @import "normalize.css", etc. again

Alternatively, use `@import-normalize` or `@import-sanitize` to avoid
conflicts with `@import` transforms.

    
    
    @import-normalize;
    
    
    @import-normalize "opinionated.css";
    
    
    @import-sanitize;

##  Options

###  allowDuplicates

The `allowDuplicates` option determines whether multiple, duplicate insertions
of CSS libraries are allowed. By default, duplicate libraries are omitted.

    
    
    postcssNormalize({ allowDuplicates: true })

###  forceImport

The `forceImport` option defines CSS libraries that will be inserted at the
beginning of the CSS file. Unless overriden by `allowDuplicates`, duplicate
CSS libraries would still be omitted.

    
    
    postcssNormalize({ forceImport: true })

Specific CSS libraries may be defined.

    
    
    postcssNormalize({
      forceImport: 'sanitize.css'
    })

###  browsers

The `browsers` option defines an override of the project’s **browserslist**
for **PostCSS Normalize**. This option should be avoided in leui of a
browserslist file.

    
    
    postcssNormalize({ browsers: 'last 2 versions' })

##  CSS Libraries

**PostCSS Normalize** can include
[normalize.css](https://github.com/csstools/normalize.css) or
[sanitize.css](https://github.com/csstools/sanitize.css) and configure either
with the following combinations:

    
    
    @import "normalize"; /* also, @import "normalize.css" */
    @import "normalize/opinionated"; /* also, @import "normalize.css/opinionated.css", @import "normalize.css/*" */
    @import "sanitize"; /* also, @import "sanitize.css" */
    @import "sanitize/assets"; /* also, @import "sanitize.css/assets.css" */
    @import "sanitize/forms"; /* also, @import "sanitize.css/forms.css" */
    @import "sanitize/reduce-motion"; /* also, @import "sanitize.css/reduce-motion.css" */
    @import "sanitize/system-ui"; /* also, @import "sanitize.css/system-ui.css" */
    @import "sanitize/typography"; /* also, @import "sanitize.css/typography.css" */
    @import "sanitize/ui-monospace"; /* also, @import "sanitize.css/ui-monospace.css" */
    @import "sanitize/*"; /* also, @import "sanitize.css/*" (sanitize + all additions) */





            