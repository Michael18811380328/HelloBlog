# Configure Babel

Babel can be configured! Many other tools have similar configs: ESLint (.eslintrc), Prettier (.prettierrc).

All Babel API options are allowed. However, if the option requires JavaScript, you may want to use a JavaScript configuration file.

What's your use case?
You are using a monorepo?
You want to compile node_modules?
babel.config.json is for you!

You have a configuration that only applies to a single part of your project?
.babelrc.json is for you!

We recommend using the babel.config.json format. Babel itself is using it.

### babel.config.json

Create a file called babel.config.json with the following content at the root of your project (where the package.json is).

~~~json
{
  "presets": [...],
  "plugins": [...]
}
~~~


~~~js
module.exports = function (api) {
  api.cache(true);
  const presets = [ ... ];
  const plugins = [ ... ];
  return {
    presets,
    plugins
  };
}

~~~


Check out the babel.config.json documentation to see more configuration options.

### .babelrc.json

Create a file called .babelrc.json with the following content in your project.

~~~json
{
  "presets": [...],
  "plugins": [...]
}
~~~


Check out the .babelrc documentation to see more configuration options.

### package.json

Alternatively, you can choose to specify your .babelrc.json config from within package.json using the babel key like so:

~~~json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [ ... ],
    "plugins": [ ... ],
  }
}
~~~

### JavaScript configuration files

You can also write babel.config.json and .babelrc.json files using JavaScript:

~~~jsx
const presets = [ ... ];
const plugins = [ ... ];

module.exports = { presets, plugins };

// You are allowed to access any Node.js APIs, for example a dynamic configuration based on the process environment:

const presets = [ ... ];
const plugins = [ ... ];

if (process.env["ENV"] === "prod") {
  plugins.push(...);
}

module.exports = { presets, plugins };
~~~


You can read more about JavaScript configuration files in the dedicated documentation

Using the CLI (@babel/cli)
babel --plugins @babel/plugin-transform-arrow-functions script.js


Check out the babel-cli documentation to see more configuration options.

Using the API (@babel/core)
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});


Check out the babel-core documentation to see more configuration options.