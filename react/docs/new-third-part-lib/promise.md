
# promise 


#### version
8.3.0  


#### downloads
14,507,378 


#### repository
github.com/then/promise 


#### homepage
github.com/then/promise#readme 






[![](https://camo.githubusercontent.com/a189f3f769b20836ffff8de736076edf6d571b07bf1c6ae92f7cb9acd48f790f/68747470733a2f2f70726f6d6973657361706c75732e636f6d2f6173736574732f6c6f676f2d736d616c6c2e706e67)](https://promisesaplus.com/)

# promise

This is a simple implementation of Promises. It is a super set of ES6 Promises
designed to have readable, performant code and to provide just the extensions
that are absolutely necessary for using promises today.

For detailed tutorials on its use, see
[www.promisejs.org](http://www.promisejs.org)

**N.B.** This promise exposes internals via underscore (`_`) prefixed
properties. If you use these, your code will break with each new release.

[![Build
Status](https://camo.githubusercontent.com/19d691e690c216e6d34ac312b9b1a7d1655804dffe209e25d5b8cb01fb200321/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f776f726b666c6f772f7374617475732f7468656e2f70726f6d6973652f5075626c69736825323043616e6172792f6d61737465723f7374796c653d666f722d7468652d6261646765)](https://github.com/then/promise/actions?query=workflow%3APublish%20Canary+branch%3Amaster)
[![Rolling
Versions](https://camo.githubusercontent.com/acfff61dcb405fb34fbf4dbf3bc244df9a497b2c26ce7d891fc939c13317dc8b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f526f6c6c696e6725323056657273696f6e732d456e61626c65642d627269676874677265656e3f7374796c653d666f722d7468652d6261646765)](https://rollingversions.com/then/promise)
[![NPM
version](https://camo.githubusercontent.com/65416c7a3f35d3561e8f9f754e177fc55b0d267d1eb3d5d2e9c1ec9b4835879a/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f70726f6d6973653f7374796c653d666f722d7468652d6261646765)](https://www.npmjs.com/package/promise)
[![Downloads](https://camo.githubusercontent.com/a120e16ac440ca8ad2da20bc51d63534f8f8c534da099b3b237a2b8419e1d22e/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f70726f6d6973652e7376673f7374796c653d666f722d7468652d6261646765)](https://www.npmjs.org/package/promise)

## Installation

**Server:**

    
    
    $ npm install promise
    

**Client:**

You can use browserify on the client, or use the pre-compiled script that acts
as a polyfill.

    
    
    <script src="https://www.promisejs.org/polyfills/promise-6.1.0.js"></script>

Note that the [es5-shim](https://github.com/es-shims/es5-shim) must be loaded
before this library to support browsers pre IE9.

    
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.min.js"></script>

## Usage

The example below shows how you can load the promise library (in a way that
works on both client and server using node or browserify). It then
demonstrates creating a promise from scratch. You simply call `new
Promise(fn)`. There is a complete specification for what is returned by this
method in [Promises/A+](http://promises-aplus.github.com/promises-spec/).

    
    
    var Promise = require('promise');
    
    var promise = new Promise(function (resolve, reject) {
      get('http://www.google.com', function (err, res) {
        if (err) reject(err);
        else resolve(res);
      });
    });

If you need [domains](https://nodejs.org/api/domain.html) support, you should
instead use:

    
    
    var Promise = require('promise/domains');

If you are in an environment that implements `setImmediate` and don't want the
optimisations provided by asap, you can use:

    
    
    var Promise = require('promise/setimmediate');

If you only want part of the features, e.g. just a pure ES6 polyfill:

    
    
    var Promise = require('promise/lib/es6-extensions');
    // or require('promise/domains/es6-extensions');
    // or require('promise/setimmediate/es6-extensions');

## Unhandled Rejections

By default, promises silence any unhandled rejections.

You can enable logging of unhandled ReferenceErrors and TypeErrors via:

    
    
    require('promise/lib/rejection-tracking').enable();

Due to the performance cost, you should only do this during development.

You can enable logging of all unhandled rejections if you need to debug an
exception you think is being swallowed by promises:

    
    
    require('promise/lib/rejection-tracking').enable(
      {allRejections: true}
    );

Due to the high probability of false positives, I only recommend using this
when debugging specific issues that you think may be being swallowed. For the
preferred debugging method, see `Promise#done(onFulfilled, onRejected)`.

`rejection-tracking.enable(options)` takes the following options:

  * allRejections (`boolean`) - track all exceptions, not just reference errors and type errors. Note that this has a high probability of resulting in false positives if your code loads data optimistically
  * whitelist (`Array<ErrorConstructor>`) - this defaults to `[ReferenceError, TypeError]` but you can override it with your own list of error constructors to track.
  * `onUnhandled(id, error)` and `onHandled(id, error)` \- you can use these to provide your own customised display for errors. Note that if possible you should indicate that the error was a false positive if `onHandled` is called. `onHandled` is only called if `onUnhandled` has already been called.

To reduce the chance of false-positives there is a delay of up to 2 seconds
before errors are logged. This means that if you attach an error handler
within 2 seconds, it won't be logged as a false positive. ReferenceErrors and
TypeErrors are only subject to a 100ms delay due to the higher likelihood that
the error is due to programmer error.

## API

Detailed API reference docs are available at <https://www.promisejs.org/api/>.

Before all examples, you will need:

    
    
    var Promise = require('promise');

### new Promise(resolver)

This creates and returns a new promise. `resolver` must be a function. The
`resolver` function is passed two arguments:

  1. `resolve` should be called with a single argument. If it is called with a non-promise value then the promise is fulfilled with that value. If it is called with a promise (A) then the returned promise takes on the state of that new promise (A).
  2. `reject` should be called with a single argument. The returned promise will be rejected with that argument.

### Static Functions

These methods are invoked by calling `Promise.methodName`.

#### Promise.resolve(value)

(deprecated aliases: `Promise.from(value)`, `Promise.cast(value)`)

Converts values and foreign promises into Promises/A+ promises. If you pass it
a value then it returns a Promise for that value. If you pass it something
that is close to a promise (such as a jQuery attempt at a promise) it returns
a Promise that takes on the state of `value` (rejected or fulfilled).

#### Promise.reject(value)

Returns a rejected promise with the given value.

#### Promise.all(array)

Returns a promise for an array. If it is called with a single argument that
`Array.isArray` then this returns a promise for a copy of that array with any
promises replaced by their fulfilled values. e.g.

    
    
    Promise.all([Promise.resolve('a'), 'b', Promise.resolve('c')])
      .then(function (res) {
        assert(res[0] === 'a')
        assert(res[1] === 'b')
        assert(res[2] === 'c')
      })

#### Promise.any(array)

Returns a single promise that fulfills as soon as any of the promises in the
iterable fulfills, with the value of the fulfilled promise. If no promises in
the iterable fulfill (if all of the given promises are rejected), then the
returned promise is rejected with an `AggregateError`

    
    
    var rejected = Promise.reject(0);
    var first = new Promise(function (resolve){ setTimeout(resolve, 100, 'quick') });
    var second = new Promise(function (resolve){ setTimeout(resolve, 500, 'slow') });
    
    var promises = [rejected, first, second];
    
    Promise.any(promises) // => succeeds with `quick`

#### Promise.allSettled(array)

Returns a promise that resolves after all of the given promises have either
fulfilled or rejected, with an array of objects that each describes the
outcome of each promise.

    
    
    Promise.allSettled([Promise.resolve('a'), Promise.reject('error'), Promise.resolve('c')])
      .then(function (res) {
        res[0] // { status: "fulfilled", value: 'a' }
        res[1] // { status: "rejected", reason: 'error' }
        res[2] // { status: "fulfilled", value: 'c' }
      })

#### Promise.race(array)

Returns a promise that resolves or rejects with the result of the first
promise to resolve/reject, e.g.

    
    
    var rejected = Promise.reject(new Error('Whatever'));
    var fulfilled = new Promise(function (resolve) {
      setTimeout(() => resolve('success'), 500);
    });
    
    var race = Promise.race([rejected, fulfilled]);
    // => immediately rejected with `new Error('Whatever')`
    
    var success = Promise.resolve('immediate success');
    var first = Promise.race([success, fulfilled]);
    // => immediately succeeds with `immediate success`

#### Promise.denodeify(fn)

_Non Standard_

Takes a function which accepts a node style callback and returns a new
function that returns a promise instead.

e.g.

    
    
    var fs = require('fs')
    
    var read = Promise.denodeify(fs.readFile)
    var write = Promise.denodeify(fs.writeFile)
    
    var p = read('foo.json', 'utf8')
      .then(function (str) {
        return write('foo.json', JSON.stringify(JSON.parse(str), null, '  '), 'utf8')
      })

#### Promise.nodeify(fn)

_Non Standard_

The twin to `denodeify` is useful when you want to export an API that can be
used by people who haven't learnt about the brilliance of promises yet.

    
    
    module.exports = Promise.nodeify(awesomeAPI)
    function awesomeAPI(a, b) {
      return download(a, b)
    }

If the last argument passed to `module.exports` is a function, then it will be
treated like a node.js callback and not parsed on to the child function,
otherwise the API will just return a promise.

### Prototype Methods

These methods are invoked on a promise instance by calling
`myPromise.methodName`

### Promise#then(onFulfilled, onRejected)

This method follows the [Promises/A+ spec](http://promises-
aplus.github.io/promises-spec/). It explains things very clearly so I
recommend you read it.

Either `onFulfilled` or `onRejected` will be called and they will not be
called more than once. They will be passed a single argument and will always
be called asynchronously (in the next turn of the event loop).

If the promise is fulfilled then `onFulfilled` is called. If the promise is
rejected then `onRejected` is called.

The call to `.then` also returns a promise. If the handler that is called
returns a promise, the promise returned by `.then` takes on the state of that
returned promise. If the handler that is called returns a value that is not a
promise, the promise returned by `.then` will be fulfilled with that value. If
the handler that is called throws an exception then the promise returned by
`.then` is rejected with that exception.

#### Promise#catch(onRejected)

Sugar for `Promise#then(null, onRejected)`, to mirror `catch` in synchronous
code.

#### Promise#done(onFulfilled, onRejected)

_Non Standard_

The same semantics as `.then` except that it does not return a promise and any
exceptions are re-thrown so that they can be logged (crashing the application
in non-browser environments)

#### Promise#nodeify(callback)

_Non Standard_

If `callback` is `null` or `undefined` it just returns `this`. If `callback`
is a function it is called with rejection reason as the first argument and
result as the second argument (as per the node.js convention).

This lets you write API functions that look like:

    
    
    function awesomeAPI(foo, bar, callback) {
      return internalAPI(foo, bar)
        .then(parseResult)
        .then(null, retryErrors)
        .nodeify(callback)
    }

People who use typical node.js style callbacks will be able to just pass a
callback and get the expected behavior. The enlightened people can not pass a
callback and will get awesome promises.

## Enterprise Support

Available as part of the Tidelift Subscription

The maintainers of promise and thousands of other packages are working with
Tidelift to deliver commercial support and maintenance for the open source
dependencies you use to build your applications. Save time, reduce risk, and
improve code health, while paying the maintainers of the exact dependencies
you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-
promise?utm_source=npm-
promise&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)

## License

MIT





            