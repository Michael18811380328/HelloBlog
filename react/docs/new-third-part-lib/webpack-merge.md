
# webpack-merge 


### version
6.0.1 • 


### downloads
11,772,342 


### repository
github.com/survivejs/webpack-merge 


### homepage
github.com/survivejs/webpack-merge 


## default readme



[![Financial Contributors on Open
Collective](https://camo.githubusercontent.com/11d767fb3a864bc3dc424ee97eef05a26d040ec8360823582e72b1f52306c535/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f7765627061636b2d6d657267652f616c6c2f62616467652e7376673f6c6162656c3d66696e616e6369616c2b636f6e7472696275746f7273)](https://opencollective.com/webpack-
merge) [![Test](https://github.com/survivejs/webpack-
merge/actions/workflows/test.yml/badge.svg?branch=develop&event=push)](https://github.com/survivejs/webpack-
merge/actions/workflows/test.yml)
[![codecov](https://camo.githubusercontent.com/c59ea0b514ccc89d5a2af380d6918f796fd7ab44de8244a7098a20851ebcc7ce/68747470733a2f2f636f6465636f762e696f2f67682f737572766976656a732f7765627061636b2d6d657267652f6272616e63682f6d61737465722f67726170682f62616467652e737667)](https://codecov.io/gh/survivejs/webpack-
merge)

# webpack-merge - Merge designed for Webpack

**webpack-merge** provides a `merge` function that concatenates arrays and
merges objects creating a new object. If functions are encountered, it will
execute them, run the results through the algorithm, and then wrap the
returned values within a function again.

This behavior is particularly useful in configuring webpack although it has
uses beyond it. Whenever you need to merge configuration objects, **webpack-
merge** can come in handy.

## **`merge(...configuration | [...configuration])`**

`merge` is the core, and the most important idea, of the API. Often this is
all you need unless you want further customization.

    
    
    const { merge } = require('webpack-merge');
    
    // Default API
    const output = merge(object1, object2, object3, ...);
    
    // You can pass an array of objects directly.
    // This works with all available functions.
    const output = merge([object1, object2, object3]);
    
    // Keys matching to the right take precedence:
    const output = merge(
      { fruit: "apple", color: "red" },
      { fruit: "strawberries" }
    );
    console.log(output);
    // { color: "red", fruit: "strawberries"}

### Limitations

Note that `Promise`s are not supported! If you want to return a configuration
wrapped within a `Promise`, `merge` inside one. Example:
`Promise.resolve(merge({ ... }, { ... }))`.

The same goes for configuration level functions as in the example below:

**webpack.config.js**

    
    
    const commonConfig = { ... };
    
    const productionConfig = { ... };
    
    const developmentConfig = { ... };
    
    module.exports = (env, args) => {
      switch(args.mode) {
        case 'development':
          return merge(commonConfig, developmentConfig);
        case 'production':
          return merge(commonConfig, productionConfig);
        default:
          throw new Error('No matching configuration was found!');
      }
    }

You can choose the configuration you want by using `webpack --mode
development` assuming you are using _webpack-cli_.

## **`mergeWithCustomize({ customizeArray, customizeObject })(...configuration | [...configuration])`**

In case you need more flexibility, `merge` behavior can be customized per
field as below:

    
    
    const { mergeWithCustomize } = require('webpack-merge');
    
    const output = mergeWithCustomize(
      {
        customizeArray(a, b, key) {
          if (key === 'extensions') {
            return _.uniq([...a, ...b]);
          }
    
          // Fall back to default merging
          return undefined;
        },
        customizeObject(a, b, key) {
          if (key === 'module') {
            // Custom merging
            return _.merge({}, a, b);
          }
    
          // Fall back to default merging
          return undefined;
        }
      }
    )(object1, object2, object3, ...);

For example, if the previous code was invoked with only `object1` and
`object2` with `object1` as:

    
    
    {
        foo1: ['object1'],
        foo2: ['object1'],
        bar1: { object1: {} },
        bar2: { object1: {} },
    }

and `object2` as:

    
    
    {
        foo1: ['object2'],
        foo2: ['object2'],
        bar1: { object2: {} },
        bar2: { object2: {} },
    }

then `customizeArray` will be invoked for each property of `Array` type, i.e:

    
    
    customizeArray(["object1"], ["object2"], "foo1");
    customizeArray(["object1"], ["object2"], "foo2");

and `customizeObject` will be invoked for each property of `Object` type, i.e:

    
    
    customizeObject({ object1: {} }, { object2: {} }, bar1);
    customizeObject({ object1: {} }, { object2: {} }, bar2);

##  **`customizeArray`** and **`customizeObject`**

`customizeArray` and `customizeObject` provide small strategies to for
`mergeWithCustomize`. They support `append`, `prepend`, `replace`, and
wildcards for field names.

    
    
    const { mergeWithCustomize, customizeArray, customizeObject } = require('webpack-merge');
    
    const output = mergeWithCustomize({
      customizeArray: customizeArray({
        'entry.*': 'prepend'
      }),
      customizeObject: customizeObject({
        entry: 'prepend'
      })
    })(object1, object2, object3, ...);

## **`unique(<field>, <fields>, field => field)`**

`unique` is a strategy used for forcing uniqueness within configuration. It's
most useful with plugins when you want to make sure there's only one in place.

The first `<field>` is the config property to look through for duplicates.

`<fields>` represents the values that should be unique when you run the field
=> field function on each duplicate.

When the order of elements of the `<field>` in the first configuration differs
from the order in the second configuration, the latter is preserved.

    
    
    const { mergeWithCustomize, unique } = require("webpack-merge");
    
    const output = mergeWithCustomize({
      customizeArray: unique(
        "plugins",
        ["HotModuleReplacementPlugin"],
        (plugin) => plugin.constructor && plugin.constructor.name,
      ),
    })(
      {
        plugins: [new webpack.HotModuleReplacementPlugin()],
      },
      {
        plugins: [new webpack.HotModuleReplacementPlugin()],
      },
    );
    
    // Output contains only single HotModuleReplacementPlugin now and it's
    // going to be the last plugin instance.

## **`mergeWithRules`**

To support advanced merging needs (i.e. merging within loaders),
`mergeWithRules` includes additional syntax that allows you to match fields
and apply strategies to match. Consider the full example below:

    
    
    const a = {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [{ loader: "style-loader" }, { loader: "sass-loader" }],
          },
        ],
      },
    };
    const b = {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              {
                loader: "style-loader",
                options: {
                  modules: true,
                },
              },
            ],
          },
        ],
      },
    };
    const result = {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              {
                loader: "style-loader",
                options: {
                  modules: true,
                },
              },
              { loader: "sass-loader" },
            ],
          },
        ],
      },
    };
    
    assert.deepStrictEqual(
      mergeWithRules({
        module: {
          rules: {
            test: "match",
            use: {
              loader: "match",
              options: "replace",
            },
          },
        },
      })(a, b),
      result,
    );

The way it works is that you should annotate fields to match using `match` (or
`CustomizeRule.Match` if you are using TypeScript) matching your configuration
structure and then use specific strategies to define how particular fields
should be transformed. If a match doesn't exist above a rule, then it will
apply the rule automatically.

**Supported annotations:**

  * `match` (`CustomizeRule.Match`) - Optional matcher that scopes merging behavior to a specific part based on similarity (think DOM or jQuery selectors)
  * `append` (`CustomizeRule.Append`) - Appends items
  * `prepend` (`CustomizeRule.Prepend`) - Prepends items
  * `replace` (`CustomizeRule.Replace`) - Replaces items
  * `merge` (`CustomizeRule.Merge`) - Merges objects (shallow merge)

## Using with TypeScript

**webpack-merge** supports TypeScript out of the box. You should pass
`Configuration` type from webpack to it as follows:

    
    
    import { Configuration } from "webpack";
    import { merge } from "webpack-merge";
    
    const config = merge<Configuration>({...}, {...});
    
    ...

## Development

  1. `nvm use`
  2. `npm i`
  3. `npm run build -- --watch` in one terminal
  4. `npm t -- --watch` in another one

Before contributing, please [open an
issue](https://github.com/survivejs/webpack-merge/issues/new) where to
discuss.

## Further Information and Support

Check out [SurviveJS - Webpack 5](http://survivejs.com/) to dig deeper into
webpack. The free book uses **webpack-merge** extensively and shows you how to
compose your configuration to keep it maintainable.

I am also available as a consultant in case you require specific assistance. I
can contribute particularly in terms of improving maintainability of the setup
while speeding it up and pointing out better practices. In addition to
improving developer productivity, the work has impact on the end users of the
product in terms of reduced application size and loading times.

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute.
[[Contribute](https://github.com/survivejs/webpack-
merge/blob/HEAD/CONTRIBUTING.md)].
[![](https://camo.githubusercontent.com/2ac31a2a69b604d865233275b2ab85bdf13c8be4a7f514c5502296a2b2ee18e3/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f7765627061636b2d6d657267652f636f6e7472696275746f72732e7376673f77696474683d38393026627574746f6e3d66616c7365)](https://github.com/survivejs/webpack-
merge/graphs/contributors)

### Financial Contributors

Become a financial contributor and help us sustain our community.
[[Contribute](https://opencollective.com/webpack-merge/contribute)]

#### Individuals

[![](https://camo.githubusercontent.com/fdf666b4118176833d0ec784ab34d66d6eeae5ac9da25dad31a51891042901bd/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f7765627061636b2d6d657267652f696e646976696475616c732e7376673f77696474683d383930)](https://opencollective.com/webpack-
merge)

#### Organizations

Support this project with your organization. Your logo will show up here with
a link to your website. [[Contribute](https://opencollective.com/webpack-
merge/contribute)]

[![](https://camo.githubusercontent.com/d258118aba4383f49897b1f346454b72f28fa2ad20580dfda7fd336434aa99b4/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f7765627061636b2d6d657267652f6f7267616e697a6174696f6e2f302f6176617461722e737667)](https://opencollective.com/webpack-
merge/organization/0/website)
[![](https://camo.githubusercontent.com/a7977698ce670192713b9df07acb73fb085aa4c877fd2dd3b06c082bc943c60d/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f7765627061636b2d6d657267652f6f7267616e697a6174696f6e2f312f6176617461722e737667)](https://opencollective.com/webpack-
merge/organization/1/website)
[![](https://camo.githubusercontent.com/3893d550c2bc79731419255de3123a0d0d875981fd33f73c05e4dca794f2fd76/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f7765627061636b2d6d657267652f6f7267616e697a6174696f6e2f322f6176617461722e737667)](https://opencollective.com/webpack-
merge/organization/2/website)
[![](https://camo.githubusercontent.com/17eafe29a179ebc14157b797984288575db56831b79a9c0cc5ea48565cd3d278/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f7765627061636b2d6d657267652f6f7267616e697a6174696f6e2f332f6176617461722e737667)](https://opencollective.com/webpack-
merge/organization/3/website)
[![](https://camo.githubusercontent.com/befe263f6679fd6a96b53d64ac6c454d1dac31b197413514f2f835bcee175b5e/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f7765627061636b2d6d657267652f6f7267616e697a6174696f6e2f342f6176617461722e737667)](https://opencollective.com/webpack-
merge/organization/4/website)
[![](https://camo.githubusercontent.com/9417c368a9a84d1f09e862a3dc52acfb862de9070bebd098c43f03496b7dc94f/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f7765627061636b2d6d657267652f6f7267616e697a6174696f6e2f352f6176617461722e737667)](https://opencollective.com/webpack-
merge/organization/5/website)
[![](https://camo.githubusercontent.com/c38ad30f7a9f25cebb4f96b8ae1c45259f78c67f9a90dfb13b852cb1f1fc970b/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f7765627061636b2d6d657267652f6f7267616e697a6174696f6e2f362f6176617461722e737667)](https://opencollective.com/webpack-
merge/organization/6/website)
[![](https://camo.githubusercontent.com/f99b885f725db0b3fa7b4e739e3a886386ea8619275ac540d17c703e389aa315/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f7765627061636b2d6d657267652f6f7267616e697a6174696f6e2f372f6176617461722e737667)](https://opencollective.com/webpack-
merge/organization/7/website)
[![](https://camo.githubusercontent.com/5f680ae8b6e2201aa1bf022bafea3884df91546c66408d7b8f5454b5b8ae17a7/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f7765627061636b2d6d657267652f6f7267616e697a6174696f6e2f382f6176617461722e737667)](https://opencollective.com/webpack-
merge/organization/8/website)
[![](https://camo.githubusercontent.com/11711613da0a7e9db1efe742ec9a18ac396bd1e459b0c996491bf89e99bff8c0/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f7765627061636b2d6d657267652f6f7267616e697a6174696f6e2f392f6176617461722e737667)](https://opencollective.com/webpack-
merge/organization/9/website)

## License

**webpack-merge** is available under MIT. See LICENSE for more details.





            