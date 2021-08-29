# Add React to a New Application

The easiest way to get started on a new React project is by using a starter kit.

> Note:
> 
> This page describes setting up a single-page application with everything you need for a comfortable development workflow, including linting, testing, production optimizations, and more. Full-featured tools like these require some time and disk space to install.
>
>If you are looking for a lightweight environment to experiment with React, check out the [Try React](/docs/try-react.html) page instead. **A [single HTML file](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html) is enough to get you started!**
>
> Finally, if you're not building a single-page application, you can either [add React to your existing build pipeline](/docs/add-react-to-an-existing-app.html) or [use it from CDN](/docs/cdn-links.html) and [without a build step](/docs/react-without-jsx.html).

## Create React App

[Create React App](http://github.com/facebookincubator/create-react-app) is the best way to start building a new React single page application. It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. You’ll need to have Node >= 6 on your machine.

```bash
npm install -g create-react-app
create-react-app my-app

cd my-app
npm start
```

If you have npm 5.2.0+ installed, you may use [npx](https://www.npmjs.com/package/npx) instead.

```bash
npx create-react-app my-app

cd my-app
npm start
```

Create React App doesn't handle backend logic or databases; it just creates a frontend build pipeline, so you can use it with any backend you want. It uses build tools like [Babel](http://babeljs.io/) and [webpack](https://webpack.js.org/) under the hood, but works with zero configuration.

When you're ready to deploy to production, running `npm run build` will create an optimized build of your app in the `build` folder. You can learn more about Create React App [from its README](https://github.com/facebookincubator/create-react-app#create-react-app-) and the [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents).
