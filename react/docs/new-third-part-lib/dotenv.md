
# dotenv 


#### version
16.4.5  


#### downloads
39,118,297 


#### repository
github.com/motdotla/dotenv 


#### homepage
github.com/motdotla/dotenv#readme 






🎉 announcing [dotenvx](https://github.com/dotenvx/dotenvx). _run anywhere,
multi-environment, encrypted envs_.

[Dotenv is supported by the community.](https://github.com/sponsors/motdotla)

Special thanks to:  
  
[
![Warp](https://camo.githubusercontent.com/f9bdd8b4d0f5a18e109363fd3c98f8fb2162114e4f219e04de0b71a7d11bbceb/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f646f74656e762d6f72672f696d6167652f75706c6f61642f76313636313938303730392f776172705f6869386f716a2e706e67)
**Warp is a blazingly fast, Rust-based terminal reimagined to work like a
modern app.** Get more done in the CLI with real text editing, block-based
output, and AI command search.
](https://www.warp.dev/?utm_source=github&utm_medium=referral&utm_campaign=dotenv_p_20220831)  
[
![WorkOS](https://camo.githubusercontent.com/7c094793114b9911da051802f0c86cea61f48e5cb3c0fa42fb5150c5d8f3bafd/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f646f74656e762d6f72672f696d6167652f75706c6f61642f635f7363616c652c775f3430302f76313636353630353439362f3638373437343730373333613266326637333639366536343732363537333666373236383735373332653633366636643266363137333733363537343733326637343638363136653662373332663737366637323662366637333264366336663637366632643737363836393734363532643632363732653733373636375f7a646d7362752e737667)
**Your App, Enterprise Ready.** Add Single Sign-On, Multi-Factor Auth, and
more, in minutes instead of months.
](https://workos.com/?utm_campaign=github_repo&utm_medium=referral&utm_content=dotenv&utm_source=github)  
[ ![Alloy
Automation](https://camo.githubusercontent.com/7b7c85b7fb7fefb3864fd38e43f62bc4726161c1ff95253ca63d770f34297d39/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f646f74656e762d6f72672f696d6167652f75706c6f61642f635f63726f702c675f63656e7465722c685f36352c775f3239302c785f302c795f302f76313730343235383738372f416c6c6f794175746f6d6174696f6e2d6c6f676f5f6471696e38632e737667)
**Launch user-facing integrations faster** Easily spin up hundreds of
integrations. Sign up free or read our docs first
](https://runalloy.com/?utm_source=github&utm_medium=referral&utm_campaign=1224_dotenv)

* * *

# dotenv [![NPM
version](https://camo.githubusercontent.com/1053084e449f13ef512a5f7fc7e2bd21c66ceb67d94a3f0e9fdc079a3e7d8786/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f646f74656e762e7376673f7374796c653d666c61742d737175617265)](https://www.npmjs.com/package/dotenv)

[![dotenv](https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg)](https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg)

Dotenv is a zero-dependency module that loads environment variables from a
`.env` file into
[`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env).
Storing configuration in the environment separate from code is based on [The
Twelve-Factor App](https://12factor.net/config) methodology.

[![js-standard-
style](https://camo.githubusercontent.com/7b54067ec60121abdad2d4a791e128245dc4671331f3b76fc834ad071dba7772/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d7374616e646172642d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265)](https://github.com/feross/standard)
[![LICENSE](https://camo.githubusercontent.com/2217373584ac15058ac5a24c77596a3019a9fc69f6a015a59fbfdcbd86dfad14/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f6d6f74646f746c612f646f74656e762e737667)](https://github.com/motdotla/dotenv/blob/HEAD/LICENSE)
[![codecov](https://camo.githubusercontent.com/8f2747c4553a395c9e7f7e18c2784f7e3b23e7863101f4da2ff3cbc68935715b/68747470733a2f2f636f6465636f762e696f2f67682f6d6f74646f746c612f646f74656e762d657870616e642f67726170682f62616467652e7376673f746f6b656e3d706177574579614d6667)](https://codecov.io/gh/motdotla/dotenv-
expand)

  * 🌱 Install
  * 🏗️ Usage (.env)
  * 🌴 Multiple Environments 
  * 🚀 Deploying (.env.vault) 
  * 📚 Examples
  * 📖 Docs
  * ❓ FAQ
  * [⏱️ Changelog](https://github.com/motdotla/dotenv/blob/HEAD/CHANGELOG.md)

## 🌱 Install

    
    
    # install locally (recommended)
    npm install dotenv --save

Or installing with yarn? `yarn add dotenv`

## 🏗️ Usage

[ ![how to use dotenv video
tutorial](https://camo.githubusercontent.com/80e2374766ec7ff9cb10bdcb6dc0afe24f3bc53cc45d07a2a8aa233bdc867e6e/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f59746b5a52304e466431672f687164656661756c742e6a7067)
![youtube/@dotenvorg](https://camo.githubusercontent.com/e4be5abc2a6e7a2bde430214d624e3dbb2669d123fcbeeefe5225cb6288fcd03/68747470733a2f2f73696d706c6569636f6e732e76657263656c2e6170702f796f75747562652f666630303030)
](https://www.youtube.com/watch?v=YtkZR0NFd1g)

Create a `.env` file in the root of your project:

    
    
    S3_BUCKET="YOURS3BUCKET"
    SECRET_KEY="YOURSECRETKEYGOESHERE"

As early as possible in your application, import and configure dotenv:

    
    
    require('dotenv').config()
    console.log(process.env) // remove this after you've confirmed it is working

.. or using ES6?

    
    
    import 'dotenv/config'

That's it. `process.env` now has the keys and values you defined in your
`.env` file:

    
    
    require('dotenv').config()
    
    ...
    
    s3.getBucketCors({Bucket: process.env.S3_BUCKET}, function(err, data) {})

### Multiline values

If you need multiline variables, for example private keys, those are now
supported (`>= v15.0.0`) with line breaks:

    
    
    PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
    ...
    Kh9NV...
    ...
    -----END RSA PRIVATE KEY-----"

Alternatively, you can double quote strings and use the `\n` character:

    
    
    PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nKh9NV...\n-----END RSA PRIVATE KEY-----\n"

### Comments

Comments may be added to your file on their own line or inline:

    
    
    # This is a comment
    SECRET_KEY=YOURSECRETKEYGOESHERE # comment
    SECRET_HASH="something-with-a-#-hash"

Comments begin where a `#` exists, so if your value contains a `#` please wrap
it in quotes. This is a breaking change from `>= v15.0.0` and on.

### Parsing

The engine which parses the contents of your file containing environment
variables is available to use. It accepts a String or Buffer and will return
an Object with the parsed keys and values.

    
    
    const dotenv = require('dotenv')
    const buf = Buffer.from('BASIC=basic')
    const config = dotenv.parse(buf) // will return an object
    console.log(typeof config, config) // object { BASIC : 'basic' }

### Preload

> Note: Consider using [`dotenvx`](https://github.com/dotenvx/dotenvx) instead
> of preloading. I am now doing (and recommending) so.
>
> It serves the same purpose (you do not need to require and load dotenv),
> adds better debugging, and works with ANY language, framework, or platform.
> – [motdotla](https://github.com/motdotla)

You can use the `--require` (`-r`) [command line
option](https://nodejs.org/api/cli.html#-r---require-module) to preload
dotenv. By doing this, you do not need to require and load dotenv in your
application code.

    
    
    $ node -r dotenv/config your_script.js

The configuration options below are supported as command line arguments in the
format `dotenv_config_<option>=value`

    
    
    $ node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env dotenv_config_debug=true

Additionally, you can use environment variables to set configuration options.
Command line arguments will precede these.

    
    
    $ DOTENV_CONFIG_<OPTION>=value node -r dotenv/config your_script.js
    
    
    $ DOTENV_CONFIG_ENCODING=latin1 DOTENV_CONFIG_DEBUG=true node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env

### Variable Expansion

You need to add the value of another variable in one of your variables? Use
[dotenv-expand](https://github.com/motdotla/dotenv-expand).

### Syncing

You need to keep `.env` files in sync between machines, environments, or team
members? Use [dotenv-vault](https://github.com/dotenv-org/dotenv-vault).

### Multiple Environments

You need to manage your secrets across different environments and apply them
as needed? Use a `.env.vault` file with a `DOTENV_KEY`.

### Deploying

You need to deploy your secrets in a cloud-agnostic manner? Use a `.env.vault`
file. See [deploying `.env.vault`
files](https://github.com/motdotla/dotenv/tree/master#-deploying).

## 🌴 Manage Multiple Environments

Use [dotenvx](https://github.com/dotenvx/dotenvx) or [dotenv-
vault](https://github.com/dotenv-org/dotenv-vault).

### dotenvx

Run any environment locally. Create a `.env.ENVIRONMENT` file and use `--env-
file` to load it. It's straightforward, yet flexible.

    
    
    $ echo "HELLO=production" > .env.production
    $ echo "console.log('Hello ' + process.env.HELLO)" > index.js
    
    $ dotenvx run --env-file=.env.production -- node index.js
    Hello production
    > ^^

or with multiple .env files

    
    
    $ echo "HELLO=local" > .env.local
    $ echo "HELLO=World" > .env
    $ echo "console.log('Hello ' + process.env.HELLO)" > index.js
    
    $ dotenvx run --env-file=.env.local --env-file=.env -- node index.js
    Hello local

[more environment examples](https://dotenvx.com/docs/quickstart/environments)

### dotenv-vault

Edit your production environment variables.

    
    
    $ npx dotenv-vault open production

Regenerate your `.env.vault` file.

    
    
    $ npx dotenv-vault build

_ℹ️ 🔐 Vault Managed vs 💻 Locally Managed: The above example, for brevity's
sake, used the 🔐 Vault Managed solution to manage your`.env.vault` file. You
can instead use the 💻 Locally Managed solution. [Read more
here](https://github.com/dotenv-org/dotenv-vault#how-do-i-use--locally-
managed-dotenv-vault). Our vision is that other platforms and orchestration
tools adopt the `.env.vault` standard as they did the `.env` standard. We
don't expect to be the only ones providing tooling to manage and generate
`.env.vault` files._

[Learn more at dotenv-vault: Manage Multiple
Environments](https://github.com/dotenv-org/dotenv-vault#-manage-multiple-
environments)

## 🚀 Deploying

Use [dotenvx](https://github.com/dotenvx/dotenvx) or [dotenv-
vault](https://github.com/dotenv-org/dotenv-vault).

### dotenvx

Encrypt your secrets to a `.env.vault` file and load from it (recommended for
production and ci).

    
    
    $ echo "HELLO=World" > .env
    $ echo "HELLO=production" > .env.production
    $ echo "console.log('Hello ' + process.env.HELLO)" > index.js
    
    $ dotenvx encrypt
    [dotenvx][info] encrypted to .env.vault (.env,.env.production)
    [dotenvx][info] keys added to .env.keys (DOTENV_KEY_PRODUCTION,DOTENV_KEY_PRODUCTION)
    
    $ DOTENV_KEY='<dotenv_key_production>' dotenvx run -- node index.js
    [dotenvx][info] loading env (1) from encrypted .env.vault
    Hello production
    ^ :-]

[learn more](https://github.com/dotenvx/dotenvx?tab=readme-ov-file#encryption)

### dotenv-vault

_Note: Requires dotenv >= 16.1.0_

Encrypt your `.env.vault` file.

    
    
    $ npx dotenv-vault build

Fetch your production `DOTENV_KEY`.

    
    
    $ npx dotenv-vault keys production

Set `DOTENV_KEY` on your server.

    
    
    # heroku example
    heroku config:set DOTENV_KEY=dotenv://:key_1234…@dotenvx.com/vault/.env.vault?environment=production

That's it! On deploy, your `.env.vault` file will be decrypted and its secrets
injected as environment variables – just in time.

_ℹ️ A note from[Mot](https://github.com/motdotla): Until recently, we did not
have an opinion on how and where to store your secrets in production. We now
strongly recommend generating a `.env.vault` file. It's the best way to
prevent your secrets from being scattered across multiple servers and cloud
providers – protecting you from breaches like the [CircleCI
breach](https://techcrunch.com/2023/01/05/circleci-breach/). Also it unlocks
interoperability WITHOUT native third-party integrations. Third-party
integrations are [increasingly
risky](https://coderpad.io/blog/development/heroku-github-breach/) to our
industry. They may be the 'du jour' of today, but we imagine a better future._

[Learn more at dotenv-vault: Deploying](https://github.com/dotenv-org/dotenv-
vault#-deploying)

## 📚 Examples

See [examples](https://github.com/dotenv-org/examples) of using dotenv with
various frameworks, languages, and configurations.

  * [nodejs](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-nodejs)
  * [nodejs (debug on)](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-nodejs-debug)
  * [nodejs (override on)](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-nodejs-override)
  * [nodejs (processEnv override)](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-custom-target)
  * [nodejs (DOTENV_KEY override)](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-vault-custom-target)
  * [esm](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-esm)
  * [esm (preload)](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-esm-preload)
  * [typescript](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-typescript)
  * [typescript parse](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-typescript-parse)
  * [typescript config](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-typescript-config)
  * [webpack](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-webpack)
  * [webpack (plugin)](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-webpack2)
  * [react](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-react)
  * [react (typescript)](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-react-typescript)
  * [express](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-express)
  * [nestjs](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-nestjs)
  * [fastify](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-fastify)

## 📖 Documentation

Dotenv exposes four functions:

  * `config`
  * `parse`
  * `populate`
  * `decrypt`

### Config

`config` will read your `.env` file, parse the contents, assign it to
[`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env),
and return an Object with a `parsed` key containing the loaded content or an
`error` key if it failed.

    
    
    const result = dotenv.config()
    
    if (result.error) {
      throw result.error
    }
    
    console.log(result.parsed)

You can additionally, pass options to `config`.

#### Options

##### path

Default: `path.resolve(process.cwd(), '.env')`

Specify a custom path if your file containing environment variables is located
elsewhere.

    
    
    require('dotenv').config({ path: '/custom/path/to/.env' })

By default, `config` will look for a file called .env in the current working
directory.

Pass in multiple files as an array, and they will be parsed in order and
combined with `process.env` (or `option.processEnv`, if set). The first value
set for a variable will win, unless the `options.override` flag is set, in
which case the last value set will win. If a value already exists in
`process.env` and the `options.override` flag is NOT set, no changes will be
made to that value.

    
    
    require('dotenv').config({ path: ['.env.local', '.env'] })

##### encoding

Default: `utf8`

Specify the encoding of your file containing environment variables.

    
    
    require('dotenv').config({ encoding: 'latin1' })

##### debug

Default: `false`

Turn on logging to help debug why certain keys or values are not being set as
you expect.

    
    
    require('dotenv').config({ debug: process.env.DEBUG })

##### override

Default: `false`

Override any environment variables that have already been set on your machine
with values from your .env file(s). If multiple files have been provided in
`option.path` the override will also be used as each file is combined with the
next. Without `override` being set, the first value wins. With `override` set
the last value wins.

    
    
    require('dotenv').config({ override: true })

##### processEnv

Default: `process.env`

Specify an object to write your secrets to. Defaults to `process.env`
environment variables.

    
    
    const myObject = {}
    require('dotenv').config({ processEnv: myObject })
    
    console.log(myObject) // values from .env or .env.vault live here now.
    console.log(process.env) // this was not changed or written to

##### DOTENV_KEY

Default: `process.env.DOTENV_KEY`

Pass the `DOTENV_KEY` directly to config options. Defaults to looking for
`process.env.DOTENV_KEY` environment variable. Note this only applies to
decrypting `.env.vault` files. If passed as null or undefined, or not passed
at all, dotenv falls back to its traditional job of parsing a `.env` file.

    
    
    require('dotenv').config({ DOTENV_KEY: 'dotenv://:key_1234…@dotenvx.com/vault/.env.vault?environment=production' })

### Parse

The engine which parses the contents of your file containing environment
variables is available to use. It accepts a String or Buffer and will return
an Object with the parsed keys and values.

    
    
    const dotenv = require('dotenv')
    const buf = Buffer.from('BASIC=basic')
    const config = dotenv.parse(buf) // will return an object
    console.log(typeof config, config) // object { BASIC : 'basic' }

#### Options

##### debug

Default: `false`

Turn on logging to help debug why certain keys or values are not being set as
you expect.

    
    
    const dotenv = require('dotenv')
    const buf = Buffer.from('hello world')
    const opt = { debug: true }
    const config = dotenv.parse(buf, opt)
    // expect a debug message because the buffer is not in KEY=VAL form

### Populate

The engine which populates the contents of your .env file to `process.env` is
available for use. It accepts a target, a source, and options. This is useful
for power users who want to supply their own objects.

For example, customizing the source:

    
    
    const dotenv = require('dotenv')
    const parsed = { HELLO: 'world' }
    
    dotenv.populate(process.env, parsed)
    
    console.log(process.env.HELLO) // world

For example, customizing the source AND target:

    
    
    const dotenv = require('dotenv')
    const parsed = { HELLO: 'universe' }
    const target = { HELLO: 'world' } // empty object
    
    dotenv.populate(target, parsed, { override: true, debug: true })
    
    console.log(target) // { HELLO: 'universe' }

#### options

##### Debug

Default: `false`

Turn on logging to help debug why certain keys or values are not being
populated as you expect.

##### override

Default: `false`

Override any environment variables that have already been set.

### Decrypt

The engine which decrypts the ciphertext contents of your .env.vault file is
available for use. It accepts a ciphertext and a decryption key. It uses
AES-256-GCM encryption.

For example, decrypting a simple ciphertext:

    
    
    const dotenv = require('dotenv')
    const ciphertext = 's7NYXa809k/bVSPwIAmJhPJmEGTtU0hG58hOZy7I0ix6y5HP8LsHBsZCYC/gw5DDFy5DgOcyd18R'
    const decryptionKey = 'ddcaa26504cd70a6fef9801901c3981538563a1767c297cb8416e8a38c62fe00'
    
    const decrypted = dotenv.decrypt(ciphertext, decryptionKey)
    
    console.log(decrypted) // # development@v6\nALPHA="zeta"

## ❓ FAQ

### Why is the `.env` file not loading my environment variables successfully?

Most likely your `.env` file is not in the correct place. [See this stack
overflow](https://stackoverflow.com/questions/42335016/dotenv-file-is-not-
loading-environment-variables).

Turn on debug mode and try again..

    
    
    require('dotenv').config({ debug: true })

You will receive a helpful error outputted to your console.

### Should I commit my `.env` file?

No. We **strongly** recommend against committing your `.env` file to version
control. It should only include environment-specific values such as database
passwords or API keys. Your production database should have a different
password than your development database.

### Should I have multiple `.env` files?

We recommend creating on `.env` file per environment. Use `.env` for
local/development, `.env.production` for production and so on. This still
follows the twelve factor principles as each is attributed individually to its
own environment. Avoid custom set ups that work in inheritance somehow
(`.env.production` inherits values form `.env` for example). It is better to
duplicate values if necessary across each `.env.environment` file.

> In a twelve-factor app, env vars are granular controls, each fully
> orthogonal to other env vars. They are never grouped together as
> “environments”, but instead are independently managed for each deploy. This
> is a model that scales up smoothly as the app naturally expands into more
> deploys over its lifetime.
>
> – [The Twelve-Factor App](http://12factor.net/config)

### What rules does the parsing engine follow?

The parsing engine currently supports the following rules:

  * `BASIC=basic` becomes `{BASIC: 'basic'}`
  * empty lines are skipped
  * lines beginning with `#` are treated as comments
  * `#` marks the beginning of a comment (unless when the value is wrapped in quotes)
  * empty values become empty strings (`EMPTY=` becomes `{EMPTY: ''}`)
  * inner quotes are maintained (think JSON) (`JSON={"foo": "bar"}` becomes `{JSON:"{\"foo\": \"bar\"}"`)
  * whitespace is removed from both ends of unquoted values (see more on [`trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)) (`FOO= some value ` becomes `{FOO: 'some value'}`)
  * single and double quoted values are escaped (`SINGLE_QUOTE='quoted'` becomes `{SINGLE_QUOTE: "quoted"}`)
  * single and double quoted values maintain whitespace from both ends (`FOO=" some value "` becomes `{FOO: ' some value '}`)
  * double quoted values expand new lines (`MULTILINE="new\nline"` becomes

    
    
    {MULTILINE: 'new
    line'}
    

  * backticks are supported (`BACKTICK_KEY=`This has 'single' and "double" quotes inside of it.``)

### What happens to environment variables that were already set?

By default, we will never modify any environment variables that have already
been set. In particular, if there is a variable in your `.env` file which
collides with one that already exists in your environment, then that variable
will be skipped.

If instead, you want to override `process.env` use the `override` option.

    
    
    require('dotenv').config({ override: true })

### How come my environment variables are not showing up for React?

Your React code is run in Webpack, where the `fs` module or even the `process`
global itself are not accessible out-of-the-box. `process.env` can only be
injected through Webpack configuration.

If you are using [`react-scripts`](https://www.npmjs.com/package/react-
scripts), which is distributed through [`create-react-app`](https://create-
react-app.dev/), it has dotenv built in but with a quirk. Preface your
environment variables with `REACT_APP_`. See [this stack
overflow](https://stackoverflow.com/questions/42182577/is-it-possible-to-use-
dotenv-in-a-react-project) for more details.

If you are using other frameworks (e.g. Next.js, Gatsby...), you need to
consult their documentation for how to inject environment variables into the
client.

### Can I customize/write plugins for dotenv?

Yes! `dotenv.config()` returns an object representing the parsed `.env` file.
This gives you everything you need to continue setting values on
`process.env`. For example:

    
    
    const dotenv = require('dotenv')
    const variableExpansion = require('dotenv-expand')
    const myEnv = dotenv.config()
    variableExpansion(myEnv)

### How do I use dotenv with `import`?

Simply..

    
    
    // index.mjs (ESM)
    import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
    import express from 'express'

A little background..

> When you run a module containing an `import` declaration, the modules it
> imports are loaded first, then each module body is executed in a depth-first
> traversal of the dependency graph, avoiding cycles by skipping anything
> already executed.
>
> – [ES6 In Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-
> modules/)

What does this mean in plain language? It means you would think the following
would work but it won't.

`errorReporter.mjs`:

    
    
    import { Client } from 'best-error-reporting-service'
    
    export default new Client(process.env.API_KEY)

`index.mjs`:

    
    
    // Note: this is INCORRECT and will not work
    import * as dotenv from 'dotenv'
    dotenv.config()
    
    import errorReporter from './errorReporter.mjs'
    errorReporter.report(new Error('documented example'))

`process.env.API_KEY` will be blank.

Instead, `index.mjs` should be written as..

    
    
    import 'dotenv/config'
    
    import errorReporter from './errorReporter.mjs'
    errorReporter.report(new Error('documented example'))

Does that make sense? It's a bit unintuitive, but it is how importing of ES6
modules work. Here is a [working example of this
pitfall](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-
es6-import-pitfall).

There are two alternatives to this approach:

  1. Preload dotenv: `node --require dotenv/config index.js` (_Note: you do not need to`import` dotenv with this approach_)
  2. Create a separate file that will execute `config` first as outlined in [this comment on #133](https://github.com/motdotla/dotenv/issues/133#issuecomment-255298822)

### Why am I getting the error `Module not found: Error: Can't resolve
'crypto|os|path'`?

You are using dotenv on the front-end and have not included a polyfill.
Webpack < 5 used to include these for you. Do the following:

    
    
    npm install node-polyfill-webpack-plugin

Configure your `webpack.config.js` to something like the following.

    
    
    require('dotenv').config()
    
    const path = require('path');
    const webpack = require('webpack')
    
    const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
    
    module.exports = {
      mode: 'development',
      entry: './src/index.ts',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
      plugins: [
        new NodePolyfillPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            HELLO: JSON.stringify(process.env.HELLO)
          }
        }),
      ]
    };

Alternatively, just use [dotenv-webpack](https://github.com/mrsteele/dotenv-
webpack) which does this and more behind the scenes for you.

### What about variable expansion?

Try [dotenv-expand](https://github.com/motdotla/dotenv-expand)

### What about syncing and securing .env files?

Use [dotenv-vault](https://github.com/dotenv-org/dotenv-vault)

### What is a `.env.vault` file?

A `.env.vault` file is an encrypted version of your development (and ci,
staging, production, etc) environment variables. It is paired with a
`DOTENV_KEY` to deploy your secrets more securely than scattering them across
multiple platforms and tools. Use [dotenv-vault](https://github.com/dotenv-
org/dotenv-vault) to manage and generate them.

### What if I accidentally commit my `.env` file to code?

Remove it, [remove git
history](https://docs.github.com/en/authentication/keeping-your-account-and-
data-secure/removing-sensitive-data-from-a-repository) and then install the
[git pre-commit hook](https://github.com/dotenvx/dotenvx#pre-commit) to
prevent this from ever happening again.

    
    
    brew install dotenvx/brew/dotenvx
    dotenvx precommit --install
    

### How can I prevent committing my `.env` file to a Docker build?

Use the [docker prebuild hook](https://dotenvx.com/docs/features/prebuild).

    
    
    # Dockerfile
    ...
    RUN curl -fsS https://dotenvx.sh/ | sh
    ...
    RUN dotenvx prebuild
    CMD ["dotenvx", "run", "--", "node", "index.js"]

## Contributing Guide

See
[CONTRIBUTING.md](https://github.com/motdotla/dotenv/blob/HEAD/CONTRIBUTING.md)

## CHANGELOG

See [CHANGELOG.md](https://github.com/motdotla/dotenv/blob/HEAD/CHANGELOG.md)

## Who's using dotenv?

[These npm modules depend on
it.](https://www.npmjs.com/browse/depended/dotenv)

Projects that expand it often use the [keyword "dotenv" on
npm](https://www.npmjs.com/search?q=keywords:dotenv).





            