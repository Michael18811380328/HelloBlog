
# eslint 


### version
9.7.0 • 


### downloads
38,811,641 


### repository
github.com/eslint/eslint 


### homepage
eslint.org 


## default readme



# ESLint

[Website](https://eslint.org) | [Configure ESLint](https://eslint.org/docs/latest/use/configure) | [Rules](https://eslint.org/docs/rules/) | [Contribute to ESLint](https://eslint.org/docs/latest/contribute) | [Report Bugs](https://eslint.org/docs/latest/contribute/report-bugs) | [Code of Conduct](https://eslint.org/conduct) | [Twitter](https://twitter.com/geteslint) | [Discord](https://eslint.org/chat) | [Mastodon](https://fosstodon.org/@eslint)

ESLint is a tool for identifying and reporting on patterns found in
ECMAScript/JavaScript code. In many ways, it is similar to JSLint and JSHint
with a few exceptions:

  * ESLint uses [Espree](https://github.com/eslint/espree) for JavaScript parsing.
  * ESLint uses an AST to evaluate patterns in code.
  * ESLint is completely pluggable, every single rule is a plugin and you can add more at runtime.

## Table of Contents

  1. Installation and Usage
  2. Configuration
  3. Code of Conduct
  4. Filing Issues
  5. Frequently Asked Questions
  6. Releases
  7. Security Policy
  8. Semantic Versioning Policy
  9. Stylistic Rule Updates


## Installation and Usage

Prerequisites: [Node.js](https://nodejs.org/) (`^18.18.0`, `^20.9.0`, or
`>=21.1.0`) built with SSL support. (If you are using an official Node.js
distribution, SSL is always built in.)

You can install and configure ESLint using this command:


​    
    npm init @eslint/config@latest

After that, you can run ESLint on any file or directory like this:


​    
    ./node_modules/.bin/eslint yourfile.js

## Configuration

After running `npm init @eslint/config`, you'll have an `eslint.config.js` (or
`eslint.config.mjs`) file in your directory. In it, you'll see some rules
configured like this:


​    
    import pluginJs from "@eslint/js";
    export default [ pluginJs.configs.recommended, ];

The names `"semi"` and `"quotes"` are the names of
[rules](https://eslint.org/docs/rules) in ESLint. The first value is the error
level of the rule and can be one of these values:

  * `"off"` or `0` \- turn the rule off
  * `"warn"` or `1` \- turn the rule on as a warning (doesn't affect exit code)
  * `"error"` or `2` \- turn the rule on as an error (exit code will be 1)

The three error levels allow you fine-grained control over how ESLint applies
rules (for more configuration options and details, see the [configuration
docs](https://eslint.org/docs/latest/use/configure)).

## Code of Conduct

ESLint adheres to the [JS Foundation Code of
Conduct](https://eslint.org/conduct).

## Filing Issues

Before filing an issue, please be sure to read the guidelines for what you're
reporting:

  * [Bug Report](https://eslint.org/docs/latest/contribute/report-bugs)
  * [Propose a New Rule](https://eslint.org/docs/latest/contribute/propose-new-rule)
  * [Proposing a Rule Change](https://eslint.org/docs/latest/contribute/propose-rule-change)
  * [Request a Change](https://eslint.org/docs/latest/contribute/request-change)

## Frequently Asked Questions

### I'm using JSCS, should I migrate to ESLint?

Yes. [JSCS has reached end of life](https://eslint.org/blog/2016/07/jscs-end-
of-life) and is no longer supported.

We have prepared a [migration
guide](https://eslint.org/docs/latest/use/migrating-from-jscs) to help you
convert your JSCS settings to an ESLint configuration.

We are now at or near 100% compatibility with JSCS. If you try ESLint and
believe we are not yet compatible with a JSCS rule/configuration, please
create an issue (mentioning that it is a JSCS compatibility issue) and we will
evaluate it as per our normal process.

### Does Prettier replace ESLint?

No, ESLint and Prettier have different jobs: ESLint is a linter (looking for
problematic patterns) and Prettier is a code formatter. Using both tools is
common, refer to [Prettier's
documentation](https://prettier.io/docs/en/install#eslint-and-other-linters)
to learn how to configure them to work well with each other.

### Why can't ESLint find my plugins?

  * Make sure your plugins (and ESLint) are both in your project's `package.json` as devDependencies (or dependencies, if your project uses ESLint at runtime).
  * Make sure you have run `npm install` and all your dependencies are installed.
  * Make sure your plugins' peerDependencies have been installed as well. You can use `npm view eslint-plugin-myplugin peerDependencies` to see what peer dependencies `eslint-plugin-myplugin` has.

### Does ESLint support JSX?

Yes, ESLint natively supports parsing JSX syntax (this must be enabled in
[configuration](https://eslint.org/docs/latest/use/configure)). Please note
that supporting JSX syntax _is not_ the same as supporting React. React
applies specific semantics to JSX syntax that ESLint doesn't recognize. We
recommend using [eslint-plugin-react](https://www.npmjs.com/package/eslint-
plugin-react) if you are using React and want React semantics.

### What ECMAScript versions does ESLint support?

ESLint has full support for ECMAScript 3, 5, and every year from 2015 up until
the most recent stage 4 specification (the default). You can set your desired
ECMAScript syntax and other settings (like global variables) through
[configuration](https://eslint.org/docs/latest/use/configure).

### What about experimental features?

ESLint's parser only officially supports the latest final ECMAScript standard.
We will make changes to core rules in order to avoid crashes on stage 3
ECMAScript syntax proposals (as long as they are implemented using the correct
experimental ESTree syntax). We may make changes to core rules to better work
with language extensions (such as JSX, Flow, and TypeScript) on a case-by-case
basis.

In other cases (including if rules need to warn on more or fewer cases due to
new syntax, rather than just not crashing), we recommend you use other parsers
and/or rule plugins. If you are using Babel, you can use [@babel/eslint-
parser](https://www.npmjs.com/package/@babel/eslint-parser) and
[@babel/eslint-plugin](https://www.npmjs.com/package/@babel/eslint-plugin) to
use any option available in Babel.

Once a language feature has been adopted into the ECMAScript standard (stage 4
according to the [TC39 process](https://tc39.github.io/process-document/)), we
will accept issues and pull requests related to the new feature, subject to
our [contributing guidelines](https://eslint.org/docs/latest/contribute).
Until then, please use the appropriate parser and plugin(s) for your
experimental feature.

### Which Node.js versions does ESLint support?

ESLint updates the supported Node.js versions with each major release of
ESLint. At that time, ESLint's supported Node.js versions are updated to be:

  1. The most recent maintenance release of Node.js
  2. The lowest minor version of the Node.js LTS release that includes the features the ESLint team wants to use.
  3. The Node.js Current release

ESLint is also expected to work with Node.js versions released after the
Node.js Current release.

Refer to the [Quick Start Guide](https://eslint.org/docs/latest/use/getting-
started#prerequisites) for the officially supported Node.js versions for a
given ESLint release.

### Where to ask for help?

Open a [discussion](https://github.com/eslint/eslint/discussions) or stop by
our [Discord server](https://eslint.org/chat).

### Why doesn't ESLint lock dependency versions?

Lock files like `package-lock.json` are helpful for deployed applications.
They ensure that dependencies are consistent between environments and across
deployments.

Packages like `eslint` that get published to the npm registry do not include
lock files. `npm install eslint` as a user will respect version constraints in
ESLint's `package.json`. ESLint and its dependencies will be included in the
user's lock file if one exists, but ESLint's own lock file would not be used.

We intentionally don't lock dependency versions so that we have the latest
compatible dependency versions in development and CI that our users get when
installing ESLint in a project.

The Twilio blog has a [deeper dive](https://www.twilio.com/blog/lockfiles-
nodejs) to learn more.

## Releases

We have scheduled releases every two weeks on Friday or Saturday. You can
follow a [release
issue](https://github.com/eslint/eslint/issues?q=is%3Aopen+is%3Aissue+label%3Arelease)
for updates about the scheduling of any particular release.

## Security Policy

ESLint takes security seriously. We work hard to ensure that ESLint is safe
for everyone and that security issues are addressed quickly and responsibly.
Read the full [security
policy](https://github.com/eslint/.github/blob/master/SECURITY.md).

## Semantic Versioning Policy

ESLint follows [semantic versioning](https://semver.org). However, due to the
nature of ESLint as a code quality tool, it's not always clear when a minor or
major version bump occurs. To help clarify this for everyone, we've defined
the following semantic versioning policy for ESLint:

  * Patch release (intended to not break your lint build) 
    * A bug fix in a rule that results in ESLint reporting fewer linting errors.
    * A bug fix to the CLI or core (including formatters).
    * Improvements to documentation.
    * Non-user-facing changes such as refactoring code, adding, deleting, or modifying tests, and increasing test coverage.
    * Re-releasing after a failed release (i.e., publishing a release that doesn't work for anyone).
  * Minor release (might break your lint build) 
    * A bug fix in a rule that results in ESLint reporting more linting errors.
    * A new rule is created.
    * A new option to an existing rule that does not result in ESLint reporting more linting errors by default.
    * A new addition to an existing rule to support a newly-added language feature (within the last 12 months) that will result in ESLint reporting more linting errors by default.
    * An existing rule is deprecated.
    * A new CLI capability is created.
    * New capabilities to the public API are added (new classes, new methods, new arguments to existing methods, etc.).
    * A new formatter is created.
    * `eslint:recommended` is updated and will result in strictly fewer linting errors (e.g., rule removals).
  * Major release (likely to break your lint build) 
    * `eslint:recommended` is updated and may result in new linting errors (e.g., rule additions, most rule option updates).
    * A new option to an existing rule that results in ESLint reporting more linting errors by default.
    * An existing formatter is removed.
    * Part of the public API is removed or changed in an incompatible way. The public API includes: 
      * Rule schemas
      * Configuration schema
      * Command-line options
      * Node.js API
      * Rule, formatter, parser, plugin APIs

According to our policy, any minor update may report more linting errors than
the previous release (ex: from a bug fix). As such, we recommend using the
tilde (`~`) in `package.json` e.g. `"eslint": "~3.1.0"` to guarantee the
results of your builds.

## Stylistic Rule Updates

Stylistic rules are frozen according to [our
policy](https://eslint.org/blog/2020/05/changes-to-rules-policies) on how we
evaluate new rules and rule changes. This means:

  * **Bug fixes** : We will still fix bugs in stylistic rules.
  * **New ECMAScript features** : We will also make sure stylistic rules are compatible with new ECMAScript features.
  * **New options** : We will **not** add any new options to stylistic rules unless an option is the only way to fix a bug or support a newly-added ECMAScript feature.

## License

[![FOSSA
Status](https://camo.githubusercontent.com/7b834d002def9c0133c13bf1739c0f424effdd1f90f8d75aa97ac772dda8b4ba/68747470733a2f2f6170702e666f7373612e696f2f6170692f70726f6a656374732f67697425324268747470732533412532462532466769746875622e636f6d25324665736c696e7425324665736c696e742e7376673f747970653d6c61726765)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Feslint%2Feslint?ref=badge_large)





​            