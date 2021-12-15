## README.md

[![img](https://camo.githubusercontent.com/7dcab84a9b7c8755e0346ac5742ed1254f4217b2439ffc3a3d47c9f6e813c668/68747470733a2f2f73656e7472792d6272616e642e73746f726167652e676f6f676c65617069732e636f6d2f73656e7472792d6c6f676f2d626c61636b2e706e67)](https://sentry.io/)

[![Build & Test](https://github.com/getsentry/sentry-javascript/workflows/Build%20&%20Test/badge.svg)](https://github.com/getsentry/sentry-javascript/workflows/Build & Test/badge.svg) [![codecov](https://camo.githubusercontent.com/bd4f3ea197c8a1491cd2fda457b0ae9b9ed90a8300fbc6545ab4e3e9d2f5cce8/68747470733a2f2f636f6465636f762e696f2f67682f67657473656e7472792f73656e7472792d6a6176617363726970742f6272616e63682f6d61737465722f67726170682f62616467652e737667)](https://codecov.io/gh/getsentry/sentry-javascript) [![npm version](https://camo.githubusercontent.com/6ff43ee8999af108177ded8e0b8041cd6d779287c86d3a5e6299e72244296ff8/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f4073656e7472792f636f72652e737667)](https://www.npmjs.com/package/@sentry/core) [![typedoc](https://camo.githubusercontent.com/94aa5549cc73220d228f025d68c8c5816c8c9fbc4aec3411e25d9367eae27dc2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f646f63732d74797065646f632d626c75652e737667)](http://getsentry.github.io/sentry-javascript/) [![Discord](https://camo.githubusercontent.com/9bd48eede62cc79ff122563ffeab9eaadd367768375eefa26dcf73bc61ad46a6/68747470733a2f2f696d672e736869656c64732e696f2f646973636f72642f363231373738383331363032323231303634)](https://discord.gg/Ww9hbqr)

# Official Sentry SDKs for JavaScript

This is the next line of Sentry JavaScript SDKs, comprised in the `@sentry/` namespace. It will provide a more convenient interface and improved consistency between various JavaScript environments.

## Links

- [![TypeDoc](https://camo.githubusercontent.com/11f848ccff9b6e62ce1879af55bbe6c46b91b78468ddbe72272f1dc35dd14a94/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f646f63756d656e746174696f6e2d54797065446f632d677265656e2e737667)](http://getsentry.github.io/sentry-javascript/)
- [![Documentation](https://camo.githubusercontent.com/6844667276d723c3005496f4db47cec312e79e06d630911d15e51be2ef6609ed/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f646f63756d656e746174696f6e2d73656e7472792e696f2d677265656e2e737667)](https://docs.sentry.io/quickstart/)
- [![Forum](https://camo.githubusercontent.com/5cd793b0a542949bbee7aa68a604cb1aa40bbd76708be235eaa7243e5c28f72b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f666f72756d2d73656e7472792d677265656e2e737667)](https://forum.sentry.io/c/sdks)
- [![Discord](https://camo.githubusercontent.com/9bd48eede62cc79ff122563ffeab9eaadd367768375eefa26dcf73bc61ad46a6/68747470733a2f2f696d672e736869656c64732e696f2f646973636f72642f363231373738383331363032323231303634)](https://discord.gg/Ww9hbqr)
- [![Stack Overflow](https://camo.githubusercontent.com/c80691252d859be66afa74fe4a219a92252e180fa09073e5f9a67b780b2e4da7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f737461636b2532306f766572666c6f772d73656e7472792d677265656e2e737667)](http://stackoverflow.com/questions/tagged/sentry)
- [![Twitter Follow](https://camo.githubusercontent.com/bb90a499ce79cf8b723c7f156c36c872b2297c491cf22137fa4cfa14ab1d3db1/68747470733a2f2f696d672e736869656c64732e696f2f747769747465722f666f6c6c6f772f67657473656e7472793f6c6162656c3d67657473656e747279267374796c653d736f6369616c)](https://twitter.com/intent/follow?screen_name=getsentry)

## Contents

- [Contributing](https://github.com/getsentry/sentry-javascript/blob/master/CONTRIBUTING.md)
- [Supported Platforms](https://github.com/getsentry/sentry-javascript#supported-platforms)
- [Installation and Usage](https://github.com/getsentry/sentry-javascript#installation-and-usage)
- [Other Packages](https://github.com/getsentry/sentry-javascript#other-packages)

## Supported Platforms

For each major JavaScript platform, there is a specific high-level SDK that provides all the tools you need in a single package. Please refer to the README and instructions of those SDKs for more detailed information:

- [`@sentry/browser`](https://github.com/getsentry/sentry-javascript/tree/master/packages/browser): SDK for Browsers, including integrations for React, Angular, Ember, Vue and Backbone
- [`@sentry/node`](https://github.com/getsentry/sentry-javascript/tree/master/packages/node): SDK for Node, including integrations for Express, Koa, Loopback, Sails and Connect
- [`@sentry/angular`](https://github.com/getsentry/sentry-javascript/tree/master/packages/angular): SDK for Angular
- [`@sentry/react`](https://github.com/getsentry/sentry-javascript/tree/master/packages/react): SDK for ReactJS
- [`@sentry/ember`](https://github.com/getsentry/sentry-javascript/tree/master/packages/ember): SDK for Ember
- [`@sentry/vue`](https://github.com/getsentry/sentry-javascript/tree/master/packages/vue): SDK for Vue.js
- [`@sentry/gatsby`](https://github.com/getsentry/sentry-javascript/tree/master/packages/gatsby): SDK for Gatsby
- [`@sentry/react-native`](https://github.com/getsentry/sentry-react-native): SDK for React Native with support for native crashes
- [`@sentry/integrations`](https://github.com/getsentry/sentry-javascript/tree/master/packages/integrations): Pluggable integrations that can be used to enhance JS SDKs
- [`@sentry/electron`](https://github.com/getsentry/sentry-electron): SDK for Electron with support for native crashes
- [`sentry-cordova`](https://github.com/getsentry/sentry-cordova): SDK for Cordova Apps and Ionic with support for native crashes
- [`raven-js`](https://github.com/getsentry/sentry-javascript/tree/3.x/packages/raven-js): Our old stable JavaScript SDK, we still support and release bug fixes for the SDK but all new features will be implemented in `@sentry/browser` which is the successor.
- [`raven`](https://github.com/getsentry/sentry-javascript/tree/3.x/packages/raven-node): Our old stable Node SDK, same as for `raven-js` we still support and release bug fixes for the SDK but all new features will be implemented in `@sentry/node` which is the successor.

## Installation and Usage

To install a SDK, simply add the high-level package, for example:

```
npm install --save @sentry/browser
yarn add @sentry/browser
```

Setup and usage of these SDKs always follows the same principle.

```
import { init, captureMessage } from '@sentry/browser';

init({
  dsn: '__DSN__',
  // ...
});

captureMessage('Hello, world!');
```

## Other Packages

Besides the high-level SDKs, this repository contains shared packages, helpers and configuration used for SDK development. If you're thinking about contributing to or creating a JavaScript-based SDK, have a look at the resources below:

- [`@sentry/tracing`](https://github.com/getsentry/sentry-javascript/tree/master/packages/tracing): Provides Integrations and extensions for Performance Monitoring / Tracing
- [`@sentry/hub`](https://github.com/getsentry/sentry-javascript/tree/master/packages/hub): Global state management of SDKs
- [`@sentry/minimal`](https://github.com/getsentry/sentry-javascript/tree/master/packages/minimal): Minimal SDK for library authors to add Sentry support
- [`@sentry/core`](https://github.com/getsentry/sentry-javascript/tree/master/packages/core): The base for all JavaScript SDKs with interfaces, type definitions and base classes.
- [`@sentry/utils`](https://github.com/getsentry/sentry-javascript/tree/master/packages/utils): A set of helpers and utility functions useful for various SDKs.
- [`@sentry/types`](https://github.com/getsentry/sentry-javascript/tree/master/packages/types): Types used in all packages.