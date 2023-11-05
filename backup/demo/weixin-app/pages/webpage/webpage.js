// pages/webpage.js
Page({
  onLoad: function (options) {
    this.setData({
      path: options.path || "",
    });
  },

  // Share App
  onShareAppMessage(options) {
    return {
      title: "邀请你使用SeaTable",
      imageUrl: "/images/share-app.png",
      path: "/pages/index/index",
    };
  },
});
