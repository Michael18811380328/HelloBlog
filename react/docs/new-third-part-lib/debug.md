# 100 debug

## 用途

Nodejs 中打印日志，也可以在浏览器中打印日志

默认的 console.log 只能打印错误信息和报错行数，debug 可以打印具体的模块，可以显示不同的颜色和样式

## 可靠性

github 9000星 周下载上亿，可以放心使用

## 官网链接

https://github.com/visionmedia/debug

https://www.npmjs.com/package/debug


## 基本使用


```js
var a = require('debug')('worker:a');
var b = require('debug')('worker:b');

function work() {
  a('doing lots of uninteresting work');
  setTimeout(work, Math.random() * 1000);
}

work();

function workb() {
  b('doing some work');
  setTimeout(workb, Math.random() * 2000);
}

workb();
```

在 node 中执行后，可以分别打印两个模块的日志（避免日志混乱，便于排查问题等）

## 其他

# debug 


#### version

4.3.5  


#### downloads

270,337,657 


#### repository

github.com/debug-js/debug 


#### homepage

github.com/debug-js/debug#readme 






# debug


A tiny JavaScript debugging utility modelled after Node.js core's debugging
technique. Works in Node.js and web browsers.

## Installation


​    

    $ npm install debug

## Usage

`debug` exposes a function; simply pass this function the name of your module,
and it will return a decorated version of `console.error` for you to pass
debug statements to. This will allow you to toggle the debug output for
different parts of your module as well as the module as a whole.

Example [_app.js_](https://github.com/debug-
js/debug/blob/HEAD/examples/node/app.js):


​    

    var debug = require('debug')('http')
      , http = require('http')
      , name = 'My App';
    
    // fake app
    
    debug('booting %o', name);
    
    http.createServer(function(req, res){
      debug(req.method + ' ' + req.url);
      res.end('hello\n');
    }).listen(3000, function(){
      debug('listening');
    });
    
    // fake worker of some kind
    
    require('./worker');

Example [_worker.js_](https://github.com/debug-
js/debug/blob/HEAD/examples/node/worker.js):


​    

    var a = require('debug')('worker:a')
      , b = require('debug')('worker:b');
    
    function work() {
      a('doing lots of uninteresting work');
      setTimeout(work, Math.random() * 1000);
    }
    
    work();
    
    function workb() {
      b('doing some work');
      setTimeout(workb, Math.random() * 2000);
    }
    
    workb();

The `DEBUG` environment variable is then used to enable these based on space
or comma-delimited names.

Here are some examples:

[![screen shot 2017-08-08 at 12 53 04 pm](https://user-
images.githubusercontent.com/71256/29091703-a6302cdc-7c38-11e7-8304-7c0b3bc600cd.png)](https://user-
images.githubusercontent.com/71256/29091703-a6302cdc-7c38-11e7-8304-7c0b3bc600cd.png)

[![screen shot 2017-08-08 at 12 53 38 pm](https://user-
images.githubusercontent.com/71256/29091700-a62a6888-7c38-11e7-800b-db911291ca2b.png)](https://user-
images.githubusercontent.com/71256/29091700-a62a6888-7c38-11e7-800b-db911291ca2b.png)

[![screen shot 2017-08-08 at 12 53 25 pm](https://user-
images.githubusercontent.com/71256/29091701-a62ea114-7c38-11e7-826a-2692bedca740.png)](https://user-
images.githubusercontent.com/71256/29091701-a62ea114-7c38-11e7-826a-2692bedca740.png)

#### Windows command prompt notes

##### CMD

On Windows the environment variable is set using the `set` command.


​    

    set DEBUG=*,-not_this

Example:


​    

    set DEBUG=* & node app.js

##### PowerShell (VS Code default)

PowerShell uses different syntax to set environment variables.


​    

    $env:DEBUG = "*,-not_this"

Example:


​    

    $env:DEBUG='app';node app.js

Then, run the program to be debugged as usual.

npm script example:


​    

      "windowsDebug": "@powershell -Command $env:DEBUG='*';node app.js",

## Namespace Colors

Every debug instance has a color generated for it based on its namespace name.
This helps when visually parsing the debug output to identify which debug
instance a debug line belongs to.

#### Node.js

In Node.js, colors are enabled when stderr is a TTY. You also _should_ install
the [`supports-color`](https://npmjs.org/supports-color) module alongside
debug, otherwise debug will only use a small handful of basic colors.

[![](https://user-
images.githubusercontent.com/71256/29092181-47f6a9e6-7c3a-11e7-9a14-1928d8a711cd.png)](https://user-
images.githubusercontent.com/71256/29092181-47f6a9e6-7c3a-11e7-9a14-1928d8a711cd.png)

#### Web Browser

Colors are also enabled on "Web Inspectors" that understand the `%c`
formatting option. These are WebKit web inspectors, Firefox ([since version
31](https://hacks.mozilla.org/2014/05/editable-box-model-multiple-selection-
sublime-text-keys-much-more-firefox-developer-tools-episode-31/)) and the
Firebug plugin for Firefox (any version).

[![](https://user-
images.githubusercontent.com/71256/29092033-b65f9f2e-7c39-11e7-8e32-f6f0d8e865c1.png)](https://user-
images.githubusercontent.com/71256/29092033-b65f9f2e-7c39-11e7-8e32-f6f0d8e865c1.png)

## Millisecond diff

When actively developing an application it can be useful to see when the time
spent between one `debug()` call and the next. Suppose for example you invoke
`debug()` before requesting a resource, and after as well, the "+NNNms" will
show you how much time was spent between calls.

[![](https://user-
images.githubusercontent.com/71256/29091486-fa38524c-7c37-11e7-895f-e7ec8e1039b6.png)](https://user-
images.githubusercontent.com/71256/29091486-fa38524c-7c37-11e7-895f-e7ec8e1039b6.png)

When stdout is not a TTY, `Date#toISOString()` is used, making it more useful
for logging the debug information as shown below:

[![](https://user-
images.githubusercontent.com/71256/29091956-6bd78372-7c39-11e7-8c55-c948396d6edd.png)](https://user-
images.githubusercontent.com/71256/29091956-6bd78372-7c39-11e7-8c55-c948396d6edd.png)

## Conventions

If you're using this in one or more of your libraries, you _should_ use the
name of your library so that developers may toggle debugging as desired
without guessing names. If you have more than one debuggers you _should_
prefix them with your library name and use ":" to separate features. For
example "bodyParser" from Connect would then be "connect:bodyParser". If you
append a "*" to the end of your name, it will always be enabled regardless of
the setting of the DEBUG environment variable. You can then use it for normal
output as well as debug output.

## Wildcards

The `*` character may be used as a wildcard. Suppose for example your library
has debuggers named "connect:bodyParser", "connect:compress",
"connect:session", instead of listing all three with
`DEBUG=connect:bodyParser,connect:compress,connect:session`, you may simply do
`DEBUG=connect:*`, or to run everything using this module simply use
`DEBUG=*`.

You can also exclude specific debuggers by prefixing them with a "-"
character. For example, `DEBUG=*,-connect:*` would include all debuggers
except those starting with "connect:".

## Environment Variables

When running through Node.js, you can set a few environment variables that
will change the behavior of the debug logging:

| Name                | Purpose                                           |
| ------------------- | ------------------------------------------------- |
| `DEBUG`             | Enables/disables specific debugging namespaces.   |
| `DEBUG_HIDE_DATE`   | Hide date from debug output (non-TTY).            |
| `DEBUG_COLORS`      | Whether or not to use colors in the debug output. |
| `DEBUG_DEPTH`       | Object inspection depth.                          |
| `DEBUG_SHOW_HIDDEN` | Shows hidden properties on inspected objects.     |

**Note:** The environment variables beginning with `DEBUG_` end up being
converted into an Options object that gets used with `%o`/`%O` formatters. See
the Node.js documentation for
[`util.inspect()`](https://nodejs.org/api/util.html#util_util_inspect_object_options)
for the complete list.

## Formatters

Debug uses [printf-style](https://wikipedia.org/wiki/Printf_format_string)
formatting. Below are the officially supported formatters:

| Formatter | Representation                                               |
| --------- | ------------------------------------------------------------ |
| `%O`      | Pretty-print an Object on multiple lines.                    |
| `%o`      | Pretty-print an Object all on a single line.                 |
| `%s`      | String.                                                      |
| `%d`      | Number (both integer and float).                             |
| `%j`      | JSON. Replaced with the string '[Circular]' if the argument contains circular references. |
| `%%`      | Single percent sign ('%'). This does not consume an argument. |

### Custom formatters

You can add custom formatters by extending the `debug.formatters` object. For
example, if you wanted to add support for rendering a Buffer as hex with `%h`,
you could do something like:


​    

    const createDebug = require('debug')
    createDebug.formatters.h = (v) => {
      return v.toString('hex')
    }
    
    // …elsewhere
    const debug = createDebug('foo')
    debug('this is hex: %h', new Buffer('hello world'))
    //   foo this is hex: 68656c6c6f20776f726c6421 +0ms

## Browser Support

You can build a browser-ready script using
[browserify](https://github.com/substack/node-browserify), or just use the
[browserify-as-a-service](https://wzrd.in/)
[build](https://wzrd.in/standalone/debug@latest), if you don't want to build
it yourself.

Debug's enable state is currently persisted by `localStorage`. Consider the
situation shown below where you have `worker:a` and `worker:b`, and wish to
debug both. You can enable this using `localStorage.debug`:


​    

    localStorage.debug = 'worker:*'

And then refresh the page.


​    

    a = debug('worker:a');
    b = debug('worker:b');
    
    setInterval(function(){
      a('doing some work');
    }, 1000);
    
    setInterval(function(){
      b('doing some work');
    }, 1200);

In Chromium-based web browsers (e.g. Brave, Chrome, and Electron), the
JavaScript console will—by default—only show messages logged by `debug` if the
"Verbose" log level is _enabled_.

[![](https://user-
images.githubusercontent.com/7143133/152083257-29034707-c42c-4959-8add-3cee850e6fcf.png)](https://user-
images.githubusercontent.com/7143133/152083257-29034707-c42c-4959-8add-3cee850e6fcf.png)

## Output streams

By default `debug` will log to stderr, however this can be configured per-
namespace by overriding the `log` method:

Example [_stdout.js_](https://github.com/debug-
js/debug/blob/HEAD/examples/node/stdout.js):


​    

    var debug = require('debug');
    var error = debug('app:error');
    
    // by default stderr is used
    error('goes to stderr!');
    
    var log = debug('app:log');
    // set this namespace to log via console.log
    log.log = console.log.bind(console); // don't forget to bind to console!
    log('goes to stdout');
    error('still goes to stderr!');
    
    // set all output to go via console.info
    // overrides all per-namespace log settings
    debug.log = console.info.bind(console);
    error('now goes to stdout via console.info');
    log('still goes to stdout, but via console.info now');

## Extend

You can simply extend debugger


​    

    const log = require('debug')('auth');
    
    //creates new debug instance with extended namespace
    const logSign = log.extend('sign');
    const logLogin = log.extend('login');
    
    log('hello'); // auth hello
    logSign('hello'); //auth:sign hello
    logLogin('hello'); //auth:login hello

## Set dynamically

You can also enable debug dynamically by calling the `enable()` method :


​    

    let debug = require('debug');
    
    console.log(1, debug.enabled('test'));
    
    debug.enable('test');
    console.log(2, debug.enabled('test'));
    
    debug.disable();
    console.log(3, debug.enabled('test'));

print :


​    

    1 false
    2 true
    3 false


Usage :  
`enable(namespaces)`  
`namespaces` can include modes separated by a colon and wildcards.

Note that calling `enable()` completely overrides previously set DEBUG
variable :


​    

    $ DEBUG=foo node -e 'var dbg = require("debug"); dbg.enable("bar"); console.log(dbg.enabled("foo"))'
    => false


`disable()`

Will disable all namespaces. The functions returns the namespaces currently
enabled (and skipped). This can be useful if you want to disable debugging
temporarily without knowing what was enabled to begin with.

For example:


​    

    let debug = require('debug');
    debug.enable('foo:*,-foo:bar');
    let namespaces = debug.disable();
    debug.enable(namespaces);

Note: There is no guarantee that the string will be identical to the initial
enable string, but semantically they will be identical.

## Checking whether a debug target is enabled

After you've created a debug instance, you can determine whether or not it is
enabled by checking the `enabled` property:


​    

    const debug = require('debug')('http');
    
    if (debug.enabled) {
      // do stuff...
    }

You can also manually toggle this property to force the debug instance to be
enabled or disabled.

## Usage in child processes

Due to the way `debug` detects if the output is a TTY or not, colors are not
shown in child processes when `stderr` is piped. A solution is to pass the
`DEBUG_COLORS=1` environment variable to the child process.  
For example:


​    

    worker = fork(WORKER_WRAP_PATH, [workerPath], {
      stdio: [
        /* stdin: */ 0,
        /* stdout: */ 'pipe',
        /* stderr: */ 'pipe',
        'ipc',
      ],
      env: Object.assign({}, process.env, {
        DEBUG_COLORS: 1 // without this settings, colors won't be shown
      }),
    });
    
    worker.stderr.pipe(process.stderr, { end: false });

## Authors

  * TJ Holowaychuk
  * Nathan Rajlich
  * Andrew Rhyne
  * Josh Junon

