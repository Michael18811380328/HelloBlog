# 无头浏览器转换网页到 png

~~~js
// 使用无头浏览器打印网页（把网页转换成 PDF 或者 png 格式输出）
// 需要本地安装 puppeteer nodejs 脚本
const puppeteer = require('puppeteer');

  // 页面自动滚动
  const autoScroll = (page) => {
  return page.evaluate(() => {
    return new Promise(resolve => {
      let totalHeight = 0
      const distance = 100
      // 每200毫秒让页面下滑100像素的距离
      const timer = setInterval(() => {
        const scrollDiv = document.getElementsByClassName('activity-container')[0];
        const scrollHeight = scrollDiv.scrollHeight;
        scrollDiv.scrollBy(0, distance)
        totalHeight += distance
        if (totalHeight >= scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 200)
    })
  })
}


const getUrl = async () => {
  const brower = await puppeteer.launch();
  const page = await brower.newPage();

  // await page.setCookie({
  //   name: `vol`,
  //   domain: `https://console.volcengine.com`,
  //   url: `https://console.volcengine.com/datarangers/org/84/app/list`,
  //   value: `vcloudWebId=7959d7d7-be5e-4b82-b168-483c5f34e31e;`
  // });

  /* pdf中，px转inch */
  const convertPxToInches = (value) => {
    let inches = Math.ceil(value / 96 * 1000) / 1000;
    return `${parseFloat(inches).toFixed(3)}in`
  }

    /* 获取页面高度 */
  const realPageHeight = await page.evaluate(() => {
    const body = document.getElementsByClassName('activity-container')[0] || document.body,
    html = document.documentElement;
    const pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    return pageHeight;
  })

  /* 获取页面宽度 */
  const realPageWidth = await page.evaluate(() => {
    const body = document.getElementsByClassName('activity-container')[0] || document.body,
    html = document.documentElement;
    const pageWidth = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
    return pageWidth;
  })

  const pageWidth = convertPxToInches(realPageWidth);
  const pageHeight = convertPxToInches(realPageHeight);

  const divHeight = await page.evaluate(() => {
    const divContainer = document.getElementsByClassName('activity-container')[0]
    const divContainerHeight = divContainer.scrollHeight;
    return divContainerHeight;
  })

  const divWidth = await page.evaluate(() => {
    const divContainer = document.getElementsByClassName('activity-container')[0]
    const divContainerWidth = divContainer.scrollWidth;
    return divContainerWidth;
  })


  await page.setViewport({
    width: divWidth + 100,
    height: divHeight + 100
  })
  await page.goto('https://chat.chengxinsong.cn/activity', {
    timeout: 600000,
    waitUntil: 'networkidle0',
    // networkidle2 会一直等待，直到页面加载后不存在 2 个以上的资源请求，这种状态持续至少 500 ms
  });

  await autoScroll(page)

  /* png图 */
  await page.screenshot({
    path: `happy_chat_${new Date().getTime()}.png`
  });

  // page.emulateMediaType('screen');
  // await page.pdf({
  //   height: pageHeight,
  //   width: pageHeight,
  //   path: `happy_chat_${new Date().getTime()}.pdf`,
  //   // format: 'a4'
  // })
  await brower.close();
}

getUrl();
~~~