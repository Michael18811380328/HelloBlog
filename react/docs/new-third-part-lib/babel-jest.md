
# babel-jest 


### version
29.7.0 • 


### downloads
25,641,196 


### repository
github.com/jestjs/jest 


### homepage
github.com/jestjs/jest#readme 


## default readme



# babel-jest

[Babel](https://github.com/babel/babel) [jest](https://github.com/jestjs/jest)
plugin

## Usage

If you are already using `jest-cli`, add `babel-jest` and it will
automatically compile JavaScript code using Babel.

    
    
    yarn add --dev babel-jest @babel/core

If you would like to write your own preprocessor, uninstall and delete babel-
jest and set the
[config.transform](https://jestjs.io/docs/configuration#transform-object-
string-string) option to your preprocessor.

## Setup

_Note: this step is only required if you are using`babel-jest` with additional
code preprocessors._

To explicitly define `babel-jest` as a transformer for your JavaScript code,
map _.js_ files to the `babel-jest` module. Typescript files are also
supported.

    
    
    "transform": {
      "\\.[jt]sx?$": "babel-jest"
    },





            