
# reselect 


#### version
5.1.1  


#### downloads
7,590,045 


#### repository
github.com/reduxjs/reselect 


#### homepage
github.com/reduxjs/reselect#readme 






# Reselect

[![npm
package](https://camo.githubusercontent.com/2e7e76d2fef58450bf1dcf4977756d38ef7eff029a329ec6b2d014319bf0a29b/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f726573656c6563742e7376673f7374796c653d666f722d7468652d6261646765)](https://www.npmjs.org/package/reselect)[![Coveralls](https://camo.githubusercontent.com/3f9fca5bb694b9a7f721aef7976dbb1f4535626c8b025d1f6191187ca4000638/68747470733a2f2f696d672e736869656c64732e696f2f636f766572616c6c732f72656475786a732f726573656c6563742f6d61737465722e7376673f7374796c653d666f722d7468652d6261646765)](https://coveralls.io/github/reduxjs/reselect)[![GitHub
Workflow
Status](https://camo.githubusercontent.com/f0d7f7904b50b79527d690ac83f37f8fd4102341d7c24f9771456f2223a2959b/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f616374696f6e732f776f726b666c6f772f7374617475732f72656475786a732f726573656c6563742f6275696c642d616e642d746573742d74797065732e796d6c3f6272616e63683d6d6173746572267374796c653d666f722d7468652d6261646765)](https://github.com/reduxjs/reselect/actions/workflows/build-
and-test-
types.yml)[![TypeScript](https://camo.githubusercontent.com/b10c5e8b1bb689dcf868974f8c547ecc5550f5a8d93714dc9cad6a1f2839cd63/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d7634253245372532422d3030374143433f7374796c653d666f722d7468652d6261646765266c6f676f3d54797065536372697074266c6f676f436f6c6f723d626c61636b266c6162656c436f6c6f723d626c756526636f6c6f723d67726179)](https://camo.githubusercontent.com/b10c5e8b1bb689dcf868974f8c547ecc5550f5a8d93714dc9cad6a1f2839cd63/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d7634253245372532422d3030374143433f7374796c653d666f722d7468652d6261646765266c6f676f3d54797065536372697074266c6f676f436f6c6f723d626c61636b266c6162656c436f6c6f723d626c756526636f6c6f723d67726179)

A library for creating memoized "selector" functions. Commonly used with
Redux, but usable with any plain JS immutable data as well.

  * Selectors can compute derived data, allowing [Redux](https://redux.js.org "Redux") to store the minimal possible state.
  * Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
  * Selectors are composable. They can be used as input to other selectors.

The **Redux docs usage page on[Deriving Data with
Selectors](https://redux.js.org/usage/deriving-data-selectors)** covers the
purpose and motivation for selectors, why memoized selectors are useful,
typical Reselect usage patterns, and using selectors with [React-
Redux](https://react-redux.js.org "React-Redux").

## Installation

### Redux Toolkit

While Reselect is not exclusive to [Redux](https://redux.js.org "Redux"), it
is already included by default in [the official Redux Toolkit
package](https://redux-toolkit.js.org) \- no further installation needed.

    
    
    import { createSelector } from '@reduxjs/toolkit'

### Standalone

For standalone usage, install the `reselect` package:

    
    
    # NPM
    npm install reselect
    
    # Yarn
    yarn add reselect

* * *

## Documentation

The Reselect docs are available at **<https://reselect.js.org>** , and include
usage guides and API references:

  * **Introduction**
  * **How Does Reselect Work?**
  * **API Reference** : 
    * **[`createSelector`](https://reselect.js.org/api/createSelector "createSelector")**
    * **[`createSelectorCreator`](https://reselect.js.org/api/createSelectorCreator "createSelectorCreator")**
    * **[`createStructuredSelector`](https://reselect.js.org/api/createStructuredSelector "createStructuredSelector")**
    * **Development-Only Stability Checks**
    * **[`lruMemoize`](https://reselect.js.org/api/lruMemoize "lruMemoize")**
    * **[`weakMapMemoize`](https://reselect.js.org/api/weakMapMemoize "weakMapMemoize")**
  * **FAQ**

## Basic Usage

Reselect exports a
[`createSelector`](https://reselect.js.org/api/createSelector
"createSelector") API, which generates memoized selector functions.
[`createSelector`](https://reselect.js.org/api/createSelector
"createSelector") accepts one or more input selectors, which extract values
from arguments, and a result function function that receives the extracted
values and should return a derived value. If the generated output selector is
called multiple times, the output will only be recalculated when the extracted
values have changed.

You can play around with the following **example** in [this
CodeSandbox](https://codesandbox.io/s/reselect-
example-g3k9gf?file=/src/index.js):

    
    
    import { createSelector } from 'reselect'
    
    interface RootState {
      todos: { id: number; completed: boolean }[]
      alerts: { id: number; read: boolean }[]
    }
    
    const state: RootState = {
      todos: [
        { id: 0, completed: false },
        { id: 1, completed: true }
      ],
      alerts: [
        { id: 0, read: false },
        { id: 1, read: true }
      ]
    }
    
    const selectCompletedTodos = (state: RootState) => {
      console.log('selector ran')
      return state.todos.filter(todo => todo.completed === true)
    }
    
    selectCompletedTodos(state) // selector ran
    selectCompletedTodos(state) // selector ran
    selectCompletedTodos(state) // selector ran
    
    const memoizedSelectCompletedTodos = createSelector(
      [(state: RootState) => state.todos],
      todos => {
        console.log('memoized selector ran')
        return todos.filter(todo => todo.completed === true)
      }
    )
    
    memoizedSelectCompletedTodos(state) // memoized selector ran
    memoizedSelectCompletedTodos(state)
    memoizedSelectCompletedTodos(state)
    
    console.log(selectCompletedTodos(state) === selectCompletedTodos(state)) //=> false
    
    console.log(
      memoizedSelectCompletedTodos(state) === memoizedSelectCompletedTodos(state)
    ) //=> true

As you can see from the example above, `memoizedSelectCompletedTodos` does not
run the second or third time, but we still get the same return value as last
time.

In addition to skipping unnecessary recalculations,
`memoizedSelectCompletedTodos` returns the existing result reference if there
is no recalculation. This is important for libraries like [React-
Redux](https://react-redux.js.org "React-Redux") or [React](https://react.dev
"React") that often rely on reference equality checks to optimize UI updates.

* * *

## Terminology

  * **Selector Function**: A function that accepts one or more JavaScript values as arguments, and derives a result. When used with [Redux](https://redux.js.org "Redux"), the first argument is typically the entire Redux store state.
  * **input selectors**: Basic selector functions used as building blocks for creating a memoized selector. They are passed as the first argument(s) to [`createSelector`](https://reselect.js.org/api/createSelector "createSelector"), and are called with all selector arguments. They are responsible for extracting and providing necessary values to the result function.
  * **Output Selector**: The actual memoized selectors created by [`createSelector`](https://reselect.js.org/api/createSelector "createSelector").
  * **Result Function**: The function that comes after the input selectors. It takes the input selectors' return values as arguments and returns a result.
  * **`Dependencies`**: Same as input selectors. They are what the output selector "depends" on.

The below example serves as a visual aid:

    
    
    const outputSelector = createSelector(
      [inputSelector1, inputSelector2, inputSelector3], // synonymous with `dependencies`.
      resultFunc // Result function
    )

* * *

## What's New in 5.0.0?

Version 5.0.0 introduces several new features and improvements:

  * **Customization Enhancements** :

    * Added the ability to pass an options object to [`createSelectorCreator`](https://reselect.js.org/api/createSelectorCreator "createSelectorCreator"), allowing for customized `memoize` and `argsMemoize` functions, alongside their respective options (`memoizeOptions` and `argsMemoizeOptions`).
    * The [`createSelector`](https://reselect.js.org/api/createSelector "createSelector") function now supports direct customization of `memoize` and `argsMemoize` within its options object.
  * **Memoization Functions** :

    * Introduced new experimental memoization functions: `weakMapMemoize` and `unstable_autotrackMemoize`.
    * Incorporated `memoize` and `argsMemoize` into the [output selector fields](https://reselect.js.org/api/createSelector#output-selector-fields "Output Selector Fields") for debugging purposes.
  * **TypeScript Support and Performance** :

    * Discontinued support for TypeScript versions below 4.7, aligning with modern TypeScript features.
    * Significantly improved TypeScript performance for nesting output selectors. The nesting limit has increased from approximately 8 to around 30 output selectors, greatly reducing the occurrence of the infamous `Type instantiation is excessively deep and possibly infinite` error.
  * **Selector API Enhancements** :

    * Removed the second overload of `createStructuredSelector` due to its susceptibility to runtime errors.
  * **Additional Functionalities** :

    * Added `dependencyRecomputations` and `resetDependencyRecomputations` to the [output selector fields](https://reselect.js.org/api/createSelector#output-selector-fields "Output Selector Fields"). These additions provide greater control and insight over input selectors, complementing the new `argsMemoize` API.
    * Introduced `inputStabilityCheck`, a development tool that runs the input selectors twice using the same arguments and triggers a warning If they return differing results for the same call.
    * Introduced `identityFunctionCheck`, a development tool that checks to see if the result function returns its own input.

These updates aim to enhance flexibility, performance, and developer
experience. For detailed usage and examples, refer to the updated
documentation sections for each feature.

  * **Breaking Changes** :

    * Removed `ParametricSelector` and `OutputParametricSelector` types. Their functionalities are now integrated into `Selector` and `OutputSelector` respectively, which inherently support additional parameters.

[ [↑ Back to top
↑](https://github.com/reduxjs/reselect/blob/HEAD/installation) ]

* * *

## License

MIT

## References

**Click to Expand**

Originally inspired by getters in
[NuclearJS](https://github.com/optimizely/nuclear-js.git),
[subscriptions](https://github.com/Day8/re-frame#just-a-read-only-cursor) in
[re-frame](https://github.com/Day8/re-frame) and this
[proposal](https://github.com/reduxjs/redux/pull/169) from
[speedskater](https://github.com/speedskater).





            