// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'End Here',
    description: 'Here is a demo for showing the online boutique shop. And this part represents the details for the description of this shop.',
    garden_description: 'The Great Garden Series',
    scroll_description: '< Scroll left and right to see more >'
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  gotoPage: function (options) {
    wx.navigateTo({
      url: '../details/details',
    })
  },

  onLoad() {
  },

})