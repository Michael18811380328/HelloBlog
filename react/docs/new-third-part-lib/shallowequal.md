
# shallowequal 


#### version
1.1.0  


#### downloads
7,380,400 


#### repository
github.com/dashed/shallowequal 


#### homepage
github.com/dashed/shallowequal#readme 






# shallowequal

> `shallowequal` is like lodash's
> [`isEqualWith`](https://lodash.com/docs/4.17.4#isEqualWith) but for shallow
> (strict) equal.

`shallowequal(value, other, [customizer], [thisArg])`

Performs a _**shallow equality**_ comparison between two values (i.e. `value`
and `other`) to determine if they are equivalent.

The equality is performed by iterating through keys on the given `value`, and
returning `false` whenever any key has values which are not **strictly equal**
between `value` and `other`. Otherwise, return `true` whenever the values of
all keys are strictly equal.

If `customizer` (expected to be a function) is provided it is invoked to
compare values. If `customizer` returns `undefined` (i.e. `void 0`), then
comparisons are handled by the `shallowequal` function instead.

The `customizer` is bound to `thisArg` and invoked with three arguments:
`(value, other, key)`.

**NOTE:** Docs are (shamelessly) adapted from [lodash's v3.x
docs](https://lodash.com/docs/3.10.1#isEqualWith)

## Install



```bash
$ yarn add shallowequal

# npm v5+ 

$ npm install shallowequal

# before npm v5 

$ npm install --save shallowequal
```

## Usage


```js
const shallowequal = require('shallowequal');

const object = { 'user': 'fred' };

const other = { 'user': 'fred' };

object == other;

// → false

shallowequal(object, other);

// → true
```

## Credit

Code for `shallowEqual` originated from <https://github.com/gaearon/react-
pure-render/> and has since been refactored to have the exact same API as
`lodash.isEqualWith` (as of `v4.17.4`).

## Development

  * `node.js` and `npm`. See: <https://github.com/creationix/nvm#installation>
  * `yarn`. See: <https://yarnpkg.com/en/docs/install>
  * `npm` dependencies. Run: `yarn install`

### Chores

  * Lint: `yarn lint`
  * Test: `yarn test`
  * Pretty: `yarn pretty`
  * Pre-publish: `yarn prepublish`


​        