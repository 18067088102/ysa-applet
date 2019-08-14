// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searching: true,
    address: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      address: options.address
    })
  }
})