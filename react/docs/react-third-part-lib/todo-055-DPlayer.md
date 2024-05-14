# DPlayer

一款支持弹幕的在线视频播放器，在很多小视频网站上使用。

https://www.npmjs.com/package/dplayer

https://github.com/DIYgod/DPlayer?tab=readme-ov-file

中文文档

https://dplayer.diygod.dev/zh/guide.html

弹幕实现

弹幕是单独的 socket 服务实现的（实时弹幕）所以可以调用第三方弹幕 API，或者自己搭建 nodejs 服务端提供弹幕服务，官方也提供了代码

https://github.com/MoePlayer/DPlayer-node

基本案例

~~~js
import DPlayer from 'dplayer';

// const dp = new DPlayer(options);
const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    video: {
        url: 'demo.mp4',
    },
});
~~~

复杂案例

~~~js
const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    autoplay: false,
    theme: '#FADFA3',
    loop: true,
    lang: 'zh-cn',
    screenshot: true,
    hotkey: true,
    preload: 'auto',
    logo: 'logo.png',
    volume: 0.7,
    mutex: true,
    video: {
        url: 'dplayer.mp4',
        pic: 'dplayer.png',
        thumbnails: 'thumbnails.jpg',
        type: 'auto',
    },
    subtitle: {
        url: 'dplayer.vtt',
        type: 'webvtt',
        fontSize: '25px',
        bottom: '10%',
        color: '#b7daff',
    },
    danmaku: {
        id: '9E2E3368B56CDBB4',
        api: 'https://api.prprpr.me/dplayer/',
        token: 'tokendemo',
        maximum: 1000,
        addition: ['https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142'],
        user: 'DIYgod',
        bottom: '15%',
        unlimited: true,
        speedRate: 0.5,
    },
    contextmenu: [
        {
            text: 'custom1',
            link: 'https://github.com/DIYgod/DPlayer',
        },
        {
            text: 'custom2',
            click: (player) => {
                console.log(player);
            },
        },
    ],
    highlight: [
        {
            time: 20,
            text: '这是第 20 秒',
        },
        {
            time: 120,
            text: '这是 2 分钟',
        },
    ],
});
~~~

这个挺有意思，未来可以尝试一下