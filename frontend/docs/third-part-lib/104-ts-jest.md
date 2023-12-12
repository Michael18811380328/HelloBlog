# ts-jest

第三方库 ts-jest 测试 TS 项目

官方链接：https://www.npmjs.com/package/ts-jest

周下载量1000W，可以放心使用

`ts-jest` is a Typescript preprocessor for Jest pre-processor. You’ll need both Jest and TypeScript installed inside your project.

> Tip: If you get an error with the following `npm` commands such as `npx: command not found`, you can replace `npx XXX` with `node node_modules/.bin/XXX` from the root of your project.

## Dependencies

You can install `ts-jest` and dependencies all at once with the following commands.

Using `npm`:

```
npm install --save-dev jest typescript ts-jest
```

## Jest config file

### Creating

By default Jest can run without any config files, but it will not compile `.ts` files. To make it transpile TypeScript with `ts-jest`, we will need to create a configuration file.

`ts-jest` can create the configuration file for you automatically:

Using `npm`:

```
npx ts-jest config:init
```


This will create a basic Jest configuration file which will make Jest know about your `.ts` files and handle them correctly.

You can also use the `jest --init` command (prefixed with either `npx` or `yarn` depending on what you’re using) to have more options related to Jest. However, answer `no` to the Jest question about whether or not to enable Typescript. Instead, add the line: `preset: "ts-jest"` to the `jest.config.js` file afterwards.
