// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fullScreen: true,
    src: ""
  },
  
  onLoad: function (options) {
    this.setData({
      src: options.src
    })
  },

  onCloseFullScreen() {
    wx.navigateBack({
      
    })
  }
})