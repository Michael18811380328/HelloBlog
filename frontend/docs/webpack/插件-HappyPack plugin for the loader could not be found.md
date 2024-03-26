# webpack配置问题：HappyPack: plugin for the loader '1' could not be found!


原配置

```tsx
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
module: {
    rules: [{
        test: /\.(jsx|js)$/,
        use: {
            loader: 'happypack/loader?id=happyBabel',
            query: {
                presets: ['react', 'es2017'],
                plugins: ['transform-object-rest-spread', "syntax-dynamic-import"]
            }
        },
        exclude: /node_modules/
    },{...}]
}
 plugins: [
    new HappyPack({
        id: 'happyBabel',
        threadPool: happyThreadPool,
        loaders: ['babel-loader?cacheDirectory=true']
        
    }),
    ...
]
```

版本

```bash
"babel-loader": "^7.1.5",
"happypack": "^5.0.1",
"webpack": "^4.29.3",
"webpack-cli": "^3.2.3",
"webpack-dev-server": "^3.1.14"
```

将loader下query换到HappyPack中

修改为

```tsx
module: {
    rules: [{
        test: /\.(jsx|js)$/,
        loader: 'happypack/loader?id=happyBabel',
        exclude: /node_modules/
    },{...}]
}
plugins: [
    new HappyPack({
        id: 'happyBabel',
        threadPool: happyThreadPool,
        loaders: [{
            path: 'babel-loader',
            cache: true,
            query: {
                presets: ['react', 'es2017'],
                plugins: ['transform-object-rest-spread', "syntax-dynamic-import"] 
            }
        }]
    }),
    ...
]
```