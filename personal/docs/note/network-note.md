# Network note

#### 2 本地不同项目调试问题

- 本地浏览器支持跨域操作（后端服务和前端页面不在一个端口，但是需要请求登录）：更改本地浏览器配置。可以设置 webpack 支持代理，但是设置后无效，可能和 webpack 版本有关，所以直接使用命令行打开浏览器（增加参数打开）参考：https://blog.csdn.net/qq_41541368/article/details/104035074 扩展：直接写一个脚本，电脑开机后直接命令行执行，打开对应的程序，不需要手动双击每一个程序

~~~js
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/seafile/workroom/chrome-config

open /Applications/Google\ Chrome.app && open /Applications/Typora.app 
~~~

- 如果本地调试两个前端项目，一个项目需要使用另一个项目打包后的文件，可以直接写一个脚本，然后复制这个打包后的文件到另一个文件夹下面（npm link 也可以实现，但是可能存在缓存问题等等），所以写了这个联调脚本。本地联调测试脚本

~~~js
"move": "npm run prepublishOnly && mv -f /dtable/es /Users/seafile/workroom/dev/dtable-/dtable-web/frontend/node_modules/@seafile/dtable",
~~~



#### 3 本地调试 server 项目跨域问题

问题：本地开发 dtable-web 和 dtable-server 项目时，打开表格界面，127.0.0.1:5000 端口显示跨域。

思考：以往都不会出现跨域问题，近期没有改动配置。

解决过程：先查看 dtable-web 和 dtable-server 的日志（dtable-server 中显示编译错误）本质上：因为在 docker 外部环境执行 npm install，dtable-server 某些第三方依赖库使用C语言编译，没有编译到 docker 内部（即使安装其他第三方库，也会影响已有的这个特殊的库）。所以造成 server 无法编译，服务不正常。nginx 反向代理服务器已经处理了跨域，但是已有服务没起来，所以界面显示的是跨域（找不到对应的服务）。

最后解决：在 docker 内部删除 node_modules 然后重新 npm install 开启服务，正常使用。

总结：界面的报错不一定是真实的原因，需要查看日志。nginx 需要多了解。



## 学会的

服务器 Op 执行时的函数，最好不依赖全局变量。处理 OP 正常情况的逻辑，也有处理异常情况的逻辑（状态机模式），什么时候发出什么指令，本地或者服务器出现问题怎么操作等等。

#### 最近行业内卷的原因

1、整体行业：整体社会不同行业的需求减少：有的行业大量裁员，有的裁的少一点。计算机互联网裁员相对较少，也有裁员
2、前端内部：目前供大于求，人才越来越多，岗位不变，所以内卷化加剧。前端发展方向：基本的写页面基本交互，前端数据可视化部分方向，前后端工程化部分方向。一个人不被裁掉，需要有别人无法替代的能力。

#### 视频识别和图像识别的关系

视频抽帧，进行不同的识别；默认是定量抽取图片，实际上可能根据不同帧的突变情况，决定需要开始的帧。自动驾驶：数据模型已经训练好，直接在车出厂时就是完善的算法，而不是需要云计算去分辨图片或者物体。图像识别：不同的模型（证件扫描图片达到 90% 的识别度）；普通照片；从特殊到一般情况。

