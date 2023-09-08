


# Official Sentry SDKs for JavaScript

This is the next line of Sentry JavaScript SDKs, comprised in the `@sentry/` namespace. It will provide a more convenient interface and improved consistency between various JavaScript environments.

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