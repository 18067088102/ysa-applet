// pages/focus/focus.js

import {
  RequestModel
} from "../../models/request.js"

const requestModel = new RequestModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    caseData: [],
    imgShow: false,
    show: false,
    loading: true,
    page: 1,
    pages: 0,
    loadingCenter: false,
    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545394714948&di=86c61a83d1b51b68fbd6f8884c4880e1&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F2f738bd4b31c870173d4b35d2a7f9e2f0708ff2f.jpg'
  },

  onCancelFocus(e) {
    var companyId = this.data.caseData[e.currentTarget.dataset.id].id
    this.cancelUserFocus(companyId)
  },

  cancelUserFocus(companyId) {
    const openId = wx.getStorageSync('user')
    requestModel.getUserAttentionCompany(companyId, openId, '-1').then(res => {
      console.log(res)
      if(res.code == 0) {
        this.fetchMyAttentionList(1, true)
        wx.showToast({
          title: '已取消',
          icon: 'none'
        })
      } else{
        wx.showToast({
          title: '取消关注失败',
          icon: 'none'
        })
      }
    })
  },

  onLivePlayer(e){
    const companyId = this.data.caseData[e.currentTarget.dataset.id].id
    const name = this.data.caseData[e.currentTarget.dataset.id].name
    wx.navigateTo({
      url: `/pages/livePlayer/livePlayer?companyId=${companyId}&name=${name}`
    })
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.fetchMyAttentionList(1, true)
  },

  _showLoadingCenter() {
    this.setData({
      loadingCenter: true
    })
  },

  _hideLoadingCenter() {
    this.setData({
      loadingCenter: false
    })
  },

  onPullDownRefresh() {
    // 下拉刷新
    wx.showNavigationBarLoading();
    if (!this.loading) {
      this.fetchMyAttentionList(1, true).then(() => {
        wx.hideNavigationBarLoading()
        // 处理完成后，终止下拉刷新
        wx.stopPullDownRefresh()
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.loading && this.data.loading && this.data.page < this.data.pages) {
      this.setData({
        show: true,
        type: 'loading'
      })
      setTimeout(() => {
        this.setData({
          show: false
        })
      }, 800)
      this.fetchMyAttentionList(this.data.page + 1)
    }
    if (!this.loading && this.data.loading && this.data.page == this.data.pages) {
      this.setData({
        show: true,
        type: 'loading'
      })
      setTimeout(() => {
        this.setData({
          show: true,
          type: 'end',
          loading: false
        })
      }, 800)
    }
  },

  fetchMyAttentionList(pageNo, override) {
    this._showLoadingCenter()
    this.setData({
      show: false,
      loading: true
    })
    // this.loading = true
    const openId = wx.getStorageSync('user')
    // 向后端请求指定页码的数据
    return requestModel.getMyAttentionList(pageNo, '10', openId).then(res => {
      this._hideLoadingCenter()
      this.setData({
        show: false
      })
      if (res.code == 0) {
        const records = res.records
        if (records.length == 0) {
          this.setData({
            isNullImage: true
          })
        }else{
          this.setData({
            isNullImage: false
          })
        }
        this.setData({
          page: pageNo, //当前的页号
          pages: res.pages, //总页数
          caseData: override ? records : this.data.caseData.concat(records)
        })
      }
    }).catch(err => {
      console.log("==> [ERROR]", err)
      this._hideLoadingCenter()
      this.setData({
        show: false,
        isNullImage: true
      })
    }).then(() => {
      this._hideLoadingCenter()
      this.setData({
        show: false
      })
    })
  }
})