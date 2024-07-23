
# eslint-plugin-import 


### version
2.29.1 • 


### downloads
22,682,558 


### repository
github.com/import-js/eslint-plugin-import 


### homepage
github.com/import-js/eslint-plugin-import 


## default readme



# eslint-plugin-import

[![github
actions](https://camo.githubusercontent.com/f05316c40ec1878db11cfc44ca4a785fd76fb42bb3967592b815e5ab4aa88a5c/68747470733a2f2f696d672e736869656c64732e696f2f656e64706f696e743f75726c3d68747470733a2f2f6769746875622d616374696f6e732d62616467652d75336a6e347466706f6363682e72756e6b69742e73682f696d706f72742d6a732f65736c696e742d706c7567696e2d696d706f7274)](https://github.com/import-
js/eslint-plugin-import) [![travis-
ci](https://camo.githubusercontent.com/6d7ddcd2fbfdc9118ee6a882b8426f91f25f09b9c57ec27078f85299ac1f29a1/68747470733a2f2f7472617669732d63692e6f72672f696d706f72742d6a732f65736c696e742d706c7567696e2d696d706f72742e7376673f6272616e63683d6d61696e)](https://travis-
ci.org/import-js/eslint-plugin-import)
[![coverage](https://camo.githubusercontent.com/bc6f04fd44aa439166ec0f903403ab27a8b00dbc33fa1b10d556fac9b31cad8b/68747470733a2f2f636f6465636f762e696f2f67682f696d706f72742d6a732f65736c696e742d706c7567696e2d696d706f72742f6272616e63682f6d61696e2f6772617068732f62616467652e737667)](https://app.codecov.io/gh/import-
js/eslint-plugin-import/) [![win32 build
status](https://camo.githubusercontent.com/407d0e3d8e53ccfa991046652249fc21069a7ff27ca80423eceb40d377c1689b/68747470733a2f2f63692e6170707665796f722e636f6d2f6170692f70726f6a656374732f7374617475732f336d7732666966616c6d6a6c716635362f6272616e63682f6d61696e3f7376673d74727565)](https://ci.appveyor.com/project/import-
js/eslint-plugin-import/branch/main)
[![npm](https://camo.githubusercontent.com/e31a23b1bb0b09ceeb452195d01b5700cb42beeb81adf79cc250a024b3a38a7f/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f65736c696e742d706c7567696e2d696d706f72742e737667)](https://www.npmjs.com/package/eslint-
plugin-import) [![npm
downloads](https://camo.githubusercontent.com/9a9556f5b18b51813b9bc113478e791d36ee709508bf619c242b8705fc62963f/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f64742f65736c696e742d706c7567696e2d696d706f72742e7376673f6d61784167653d32353932303030)](https://www.npmtrends.com/eslint-
plugin-import)

This plugin intends to support linting of ES2015+ (ES6+) import/export syntax,
and prevent issues with misspelling of file paths and import names. All the
goodness that the ES2015+ static module syntax intends to provide, marked up
in your editor.

**IF YOU ARE USING THIS WITH SUBLIME** : see the bottom section for important
info.

## Rules

💼 Configurations enabled in.  
⚠️ Configurations set to warn in.  
🚫 Configurations disabled in.  
❗ Set in the `errors` configuration.  
☑️ Set in the `recommended` configuration.  
⌨️ Set in the `typescript` configuration.  
🚸 Set in the `warnings` configuration.  
🔧 Automatically fixable by the [`--fix` CLI
option](https://eslint.org/docs/user-guide/command-line-interface#--fix).  
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-
guide/working-with-rules#providing-suggestions).  
❌ Deprecated.

### Helpful warnings

Name  | Description | 💼 | ⚠️ | 🚫 | 🔧 | 💡 | ❌  
---|---|---|---|---|---|---|---  
[export](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/export.md) | Forbid any invalid exports, i.e. re-export of the same name. | ❗ ☑️ |  |  |  |  |   
[no-deprecated](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-deprecated.md) | Forbid imported names marked with `@deprecated` documentation tag. |  |  |  |  |  |   
[no-empty-named-blocks](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-empty-named-blocks.md) | Forbid empty named import blocks. |  |  |  | 🔧 | 💡 |   
[no-extraneous-dependencies](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-extraneous-dependencies.md) | Forbid the use of extraneous packages. |  |  |  |  |  |   
[no-mutable-exports](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-mutable-exports.md) | Forbid the use of mutable exports with `var` or `let`. |  |  |  |  |  |   
[no-named-as-default](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-named-as-default.md) | Forbid use of exported name as identifier of default export. |  | ☑️ 🚸 |  |  |  |   
[no-named-as-default-member](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-named-as-default-member.md) | Forbid use of exported name as property of default export. |  | ☑️ 🚸 |  |  |  |   
[no-unused-modules](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-unused-modules.md) | Forbid modules without exports, or exports without matching import in another module. |  |  |  |  |  |   
  
### Module systems

Name  | Description | 💼 | ⚠️ | 🚫 | 🔧 | 💡 | ❌  
---|---|---|---|---|---|---|---  
[no-amd](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-amd.md) | Forbid AMD `require` and `define` calls. |  |  |  |  |  |   
[no-commonjs](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-commonjs.md) | Forbid CommonJS `require` calls and `module.exports` or `exports.*`. |  |  |  |  |  |   
[no-import-module-exports](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-import-module-exports.md) | Forbid import statements with CommonJS module.exports. |  |  |  | 🔧 |  |   
[no-nodejs-modules](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-nodejs-modules.md) | Forbid Node.js builtin modules. |  |  |  |  |  |   
[unambiguous](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/unambiguous.md) | Forbid potentially ambiguous parse goal (`script` vs. `module`). |  |  |  |  |  |   
  
### Static analysis

Name  | Description | 💼 | ⚠️ | 🚫 | 🔧 | 💡 | ❌  
---|---|---|---|---|---|---|---  
[default](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/default.md) | Ensure a default export is present, given a default import. | ❗ ☑️ |  |  |  |  |   
[named](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/named.md) | Ensure named imports correspond to a named export in the remote file. | ❗ ☑️ |  | ⌨️ |  |  |   
[namespace](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/namespace.md) | Ensure imported namespaces contain dereferenced properties as they are dereferenced. | ❗ ☑️ |  |  |  |  |   
[no-absolute-path](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-absolute-path.md) | Forbid import of modules using absolute paths. |  |  |  | 🔧 |  |   
[no-cycle](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-cycle.md) | Forbid a module from importing a module with a dependency path back to itself. |  |  |  |  |  |   
[no-dynamic-require](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-dynamic-require.md) | Forbid `require()` calls with expressions. |  |  |  |  |  |   
[no-internal-modules](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-internal-modules.md) | Forbid importing the submodules of other modules. |  |  |  |  |  |   
[no-relative-packages](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-relative-packages.md) | Forbid importing packages through relative paths. |  |  |  | 🔧 |  |   
[no-relative-parent-imports](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-relative-parent-imports.md) | Forbid importing modules from parent directories. |  |  |  |  |  |   
[no-restricted-paths](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-restricted-paths.md) | Enforce which files can be imported in a given folder. |  |  |  |  |  |   
[no-self-import](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-self-import.md) | Forbid a module from importing itself. |  |  |  |  |  |   
[no-unresolved](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-unresolved.md) | Ensure imports point to a file/module that can be resolved. | ❗ ☑️ |  |  |  |  |   
[no-useless-path-segments](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-useless-path-segments.md) | Forbid unnecessary path segments in import and require statements. |  |  |  | 🔧 |  |   
[no-webpack-loader-syntax](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-webpack-loader-syntax.md) | Forbid webpack loader syntax in imports. |  |  |  |  |  |   
  
### Style guide

Name  | Description | 💼 | ⚠️ | 🚫 | 🔧 | 💡 | ❌  
---|---|---|---|---|---|---|---  
[consistent-type-specifier-style](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/consistent-type-specifier-style.md) | Enforce or ban the use of inline type-only markers for named imports. |  |  |  | 🔧 |  |   
[dynamic-import-chunkname](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/dynamic-import-chunkname.md) | Enforce a leading comment with the webpackChunkName for dynamic imports. |  |  |  |  |  |   
[exports-last](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/exports-last.md) | Ensure all exports appear after other statements. |  |  |  |  |  |   
[extensions](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/extensions.md) | Ensure consistent use of file extension within the import path. |  |  |  |  |  |   
[first](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/first.md) | Ensure all imports appear before other statements. |  |  |  | 🔧 |  |   
[group-exports](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/group-exports.md) | Prefer named exports to be grouped together in a single export declaration |  |  |  |  |  |   
[imports-first](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/imports-first.md) | Replaced by `import/first`. |  |  |  | 🔧 |  | ❌  
[max-dependencies](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/max-dependencies.md) | Enforce the maximum number of dependencies a module can have. |  |  |  |  |  |   
[newline-after-import](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/newline-after-import.md) | Enforce a newline after import statements. |  |  |  | 🔧 |  |   
[no-anonymous-default-export](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-anonymous-default-export.md) | Forbid anonymous values as default exports. |  |  |  |  |  |   
[no-default-export](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-default-export.md) | Forbid default exports. |  |  |  |  |  |   
[no-duplicates](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-duplicates.md) | Forbid repeated import of the same module in multiple places. |  | ☑️ 🚸 |  | 🔧 |  |   
[no-named-default](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-named-default.md) | Forbid named default exports. |  |  |  |  |  |   
[no-named-export](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-named-export.md) | Forbid named exports. |  |  |  |  |  |   
[no-namespace](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-namespace.md) | Forbid namespace (a.k.a. "wildcard" `*`) imports. |  |  |  | 🔧 |  |   
[no-unassigned-import](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-unassigned-import.md) | Forbid unassigned imports |  |  |  |  |  |   
[order](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/order.md) | Enforce a convention in module import order. |  |  |  | 🔧 |  |   
[prefer-default-export](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/prefer-default-export.md) | Prefer a default export if module exports a single name or multiple names. |  |  |  |  |  |   
  
##  `eslint-plugin-import` for enterprise

Available as part of the Tidelift Subscription.

The maintainers of `eslint-plugin-import` and thousands of other packages are
working with Tidelift to deliver commercial support and maintenance for the
open source dependencies you use to build your applications. Save time, reduce
risk, and improve code health, while paying the maintainers of the exact
dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-
eslint-plugin-import?utm_source=npm-eslint-plugin-
import&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)

## Installation

    
    
    # inside your project's working tree
    npm install eslint-plugin-import --save-dev

All rules are off by default. However, you may configure them manually in your
`.eslintrc.(yml|json|js)`, or extend one of the canned configs:

    
    
    ---
    extends:
      - eslint:recommended
      - plugin:import/recommended
      # alternatively, 'recommended' is the combination of these two rule sets:
      - plugin:import/errors
      - plugin:import/warnings
    
    # or configure manually:
    plugins:
      - import
    
    rules:
      import/no-unresolved: [2, {commonjs: true, amd: true}]
      import/named: 2
      import/namespace: 2
      import/default: 2
      import/export: 2
      # etc...

## TypeScript

You may use the following snippet or assemble your own config using the
granular settings described below it.

Make sure you have installed [`@typescript-
eslint/parser`](https://github.com/typescript-eslint/typescript-
eslint/tree/HEAD/packages/parser) and [`eslint-import-resolver-
typescript`](https://github.com/import-js/eslint-import-resolver-typescript)
which are used in the following configuration.

    
    
    extends:
      - eslint:recommended
      - plugin:import/recommended
    # the following lines do the trick
      - plugin:import/typescript
    settings:
      import/resolver:
        # You will also need to install and configure the TypeScript resolver
        # See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: true
        node: true

## Resolvers

With the advent of module bundlers and the current state of modules and module
syntax specs, it's not always obvious where `import x from 'module'` should
look to find the file behind `module`.

Up through v0.10ish, this plugin has directly used substack's
[`resolve`](https://www.npmjs.com/package/resolve) plugin, which implements
Node's import behavior. This works pretty well in most cases.

However, webpack allows a number of things in import module source strings
that Node does not, such as loaders (`import 'file!./whatever'`) and a number
of aliasing schemes, such as
[`externals`](https://webpack.github.io/docs/library-and-externals.html):
mapping a module id to a global name at runtime (allowing some modules to be
included more traditionally via script tags).

In the interest of supporting both of these, v0.11 introduces resolvers.

Currently [Node](https://www.npmjs.com/package/eslint-import-resolver-node)
and [webpack](https://www.npmjs.com/package/eslint-import-resolver-webpack)
resolution have been implemented, but the resolvers are just npm packages, so
[third party packages are supported](https://github.com/import-js/eslint-
plugin-import/wiki/Resolvers) (and encouraged!).

You can reference resolvers in several ways (in order of precedence):

  * as a conventional `eslint-import-resolver` name, like `eslint-import-resolver-foo`:

    
    
    # .eslintrc.yml
    settings:
      # uses 'eslint-import-resolver-foo':
      import/resolver: foo
    
    
    // .eslintrc.js
    module.exports = {
      settings: {
        'import/resolver': {
          foo: { someConfig: value }
        }
      }
    }

  * with a full npm module name, like `my-awesome-npm-module`:

    
    
    # .eslintrc.yml
    settings:
      import/resolver: 'my-awesome-npm-module'
    
    
    // .eslintrc.js
    module.exports = {
      settings: {
        'import/resolver': {
          'my-awesome-npm-module': { someConfig: value }
        }
      }
    }

  * with a filesystem path to resolver, defined in this example as a `computed property` name:

    
    
    // .eslintrc.js
    module.exports = {
      settings: {
        'import/resolver': {
          [path.resolve('../../../my-resolver')]: { someConfig: value }
        }
      }
    }

Relative paths will be resolved relative to the source's nearest
`package.json` or the process's current working directory if no `package.json`
is found.

If you are interesting in writing a resolver, see the
[spec](https://github.com/import-js/eslint-plugin-
import/blob/HEAD/resolvers/README.md) for more details.

## Settings

You may set the following settings in your `.eslintrc`:

### `import/extensions`

A list of file extensions that will be parsed as modules and inspected for
`export`s.

This defaults to `['.js']`, unless you are using the `react` shared config, in
which case it is specified as `['.js', '.jsx']`. Despite the default, if you
are using TypeScript (without the `plugin:import/typescript` config described
above) you must specify the new extensions (`.ts`, and also `.tsx` if using
React).

    
    
    "settings": {
      "import/extensions": [
        ".js",
        ".jsx"
      ]
    }

If you require more granular extension definitions, you can use:

    
    
    "settings": {
      "import/resolver": {
        "node": {
          "extensions": [
            ".js",
            ".jsx"
          ]
        }
      }
    }

Note that this is different from (and likely a subset of) any
`import/resolver` extensions settings, which may include `.json`, `.coffee`,
etc. which will still factor into the `no-unresolved` rule.

Also, the following `import/ignore` patterns will overrule this list.

### `import/ignore`

A list of regex strings that, if matched by a path, will not report the
matching module if no `export`s are found. In practice, this means rules other
than [`no-unresolved`](https://github.com/import-js/eslint-plugin-
import/blob/HEAD/docs/rules/no-unresolved.md#ignore) will not report on any
`import`s with (absolute filesystem) paths matching this pattern.

`no-unresolved` has its own [`ignore`](https://github.com/import-js/eslint-
plugin-import/blob/HEAD/docs/rules/no-unresolved.md#ignore) setting.

    
    
    settings:
      import/ignore:
        - \.coffee$          # fraught with parse errors
        - \.(scss|less|css)$ # can't parse unprocessed CSS modules, either

### `import/core-modules`

An array of additional modules to consider as "core" modules--modules that
should be considered resolved but have no path on the filesystem. Your
resolver may already define some of these (for example, the Node resolver
knows about `fs` and `path`), so you need not redefine those.

For example, Electron exposes an `electron` module:

    
    
    import 'electron'  // without extra config, will be flagged as unresolved!

that would otherwise be unresolved. To avoid this, you may provide `electron`
as a core module:

    
    
    # .eslintrc.yml
    settings:
      import/core-modules: [ electron ]

In Electron's specific case, there is a shared config named `electron` that
specifies this for you.

Contribution of more such shared configs for other platforms are welcome!

### `import/external-module-folders`

An array of folders. Resolved modules only from those folders will be
considered as "external". By default - `["node_modules"]`. Makes sense if you
have configured your path or webpack to handle your internal paths differently
and want to consider modules from some folders, for example `bower_components`
or `jspm_modules`, as "external".

This option is also useful in a monorepo setup: list here all directories that
contain monorepo's packages and they will be treated as external ones no
matter which resolver is used.

If you are using `yarn` PnP as your package manager, add the `.yarn` folder
and all your installed dependencies will be considered as `external`, instead
of `internal`.

Each item in this array is either a folder's name, its subpath, or its
absolute prefix path:

  * `jspm_modules` will match any file or folder named `jspm_modules` or which has a direct or non-direct parent named `jspm_modules`, e.g. `/home/me/project/jspm_modules` or `/home/me/project/jspm_modules/some-pkg/index.js`.

  * `packages/core` will match any path that contains these two segments, for example `/home/me/project/packages/core/src/utils.js`.

  * `/home/me/project/packages` will only match files and directories inside this directory, and the directory itself.

Please note that incomplete names are not allowed here so `components` won't
match `bower_components` and `packages/ui` won't match `packages/ui-utils`
(but will match `packages/ui/utils`).

### `import/parsers`

A map from parsers to file extension arrays. If a file extension is matched,
the dependency parser will require and use the map key as the parser instead
of the configured ESLint parser. This is useful if you're inter-op-ing with
TypeScript directly using webpack, for example:

    
    
    # .eslintrc.yml
    settings:
      import/parsers:
        "@typescript-eslint/parser": [ .ts, .tsx ]

In this case, [`@typescript-
eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser) must
be installed and require-able from the running `eslint` module's location
(i.e., install it as a peer of ESLint).

This is currently only tested with `@typescript-eslint/parser` (and its
predecessor, `typescript-eslint-parser`) but should theoretically work with
any moderately ESTree-compliant parser.

It's difficult to say how well various plugin features will be supported, too,
depending on how far down the rabbit hole goes. Submit an issue if you find
strange behavior beyond here, but steel your heart against the likely outcome
of closing with `wontfix`.

### `import/resolver`

See resolvers.

### `import/cache`

Settings for cache behavior. Memoization is used at various levels to avoid
the copious amount of `fs.statSync`/module parse calls required to correctly
report errors.

For normal `eslint` console runs, the cache lifetime is irrelevant, as we can
strongly assume that files should not be changing during the lifetime of the
linter process (and thus, the cache in memory)

For long-lasting processes, like
[`eslint_d`](https://www.npmjs.com/package/eslint_d) or [`eslint-
loader`](https://www.npmjs.com/package/eslint-loader), however, it's important
that there be some notion of staleness.

If you never use [`eslint_d`](https://www.npmjs.com/package/eslint_d) or
[`eslint-loader`](https://www.npmjs.com/package/eslint-loader), you may set
the cache lifetime to `Infinity` and everything should be fine:

    
    
    # .eslintrc.yml
    settings:
      import/cache:
        lifetime: ∞  # or Infinity

Otherwise, set some integer, and cache entries will be evicted after that many
seconds have elapsed:

    
    
    # .eslintrc.yml
    settings:
      import/cache:
        lifetime: 5  # 30 is the default

### `import/internal-regex`

A regex for packages should be treated as internal. Useful when you are
utilizing a monorepo setup or developing a set of packages that depend on each
other.

By default, any package referenced from `import/external-module-folders` will
be considered as "external", including packages in a monorepo like yarn
workspace or lerna environment. If you want to mark these packages as
"internal" this will be useful.

For example, if your packages in a monorepo are all in `@scope`, you can
configure `import/internal-regex` like this

    
    
    # .eslintrc.yml
    settings:
      import/internal-regex: ^@scope/

## SublimeLinter-eslint

SublimeLinter-eslint introduced a change to support `.eslintignore` files
which altered the way file paths are passed to ESLint when linting during
editing. This change sends a relative path instead of the absolute path to the
file (as ESLint normally provides), which can make it impossible for this
plugin to resolve dependencies on the filesystem.

This workaround should no longer be necessary with the release of ESLint 2.0,
when `.eslintignore` will be updated to work more like a `.gitignore`, which
should support proper ignoring of absolute paths via `--stdin-filename`.

In the meantime, see [roadhump/SublimeLinter-
eslint#58](https://github.com/roadhump/SublimeLinter-eslint/issues/58) for
more details and discussion, but essentially, you may find you need to add the
following `SublimeLinter` config to your Sublime project file:

    
    
    {
        "folders":
        [
            {
                "path": "code"
            }
        ],
        "SublimeLinter":
        {
            "linters":
            {
                "eslint":
                {
                    "chdir": "${project}/code"
                }
            }
        }
    }

Note that `${project}/code` matches the `code` provided at `folders[0].path`.

The purpose of the `chdir` setting, in this case, is to set the working
directory from which ESLint is executed to be the same as the directory on
which SublimeLinter-eslint bases the relative path it provides.

See the SublimeLinter docs on
[`chdir`](https://www.sublimelinter.com/en/latest/linter_settings.html#chdir)
for more information, in case this does not work with your project.

If you are not using `.eslintignore`, or don't have a Sublime project file,
you can also do the following via a `.sublimelinterrc` file in some ancestor
directory of your code:

    
    
    {
      "linters": {
        "eslint": {
          "args": ["--stdin-filename", "@"]
        }
      }
    }

I also found that I needed to set `rc_search_limit` to `null`, which removes
the file hierarchy search limit when looking up the directory tree for
`.sublimelinterrc`:

In Package Settings / SublimeLinter / User Settings:

    
    
    {
      "user": {
        "rc_search_limit": null
      }
    }

I believe this defaults to `3`, so you may not need to alter it depending on
your project folder max depth.





            