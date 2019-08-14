// components/search/index.js

import {
  RequestModel
} from "../../../models/request.js"

import {
  paginationBev
} from '../../../dist/behaviors/pagination.js'

const requestModel = new RequestModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
      // true, true, true,
    },
    address: {
      type: String
    }
  },

  attached() {
    this.requestSearchHistory()
    this.requestSearchHot()
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyKeywords: [],
    hotKeywords: [],
    searching: false,
    keyword: "",
    loading: false,
    loadingCenter: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapSearch(event) {
      console.log(event)
      this._showResult()
      this._showLoadingCenter()
      this.initialize()
      const keyword = event.detail.value || event.detail.text
      this.setData({
        keyword
      })
      this.querySearchList(keyword)
    },

    onCancelImg() {
      this.initialize()
      this._closeResult()
      this.requestSearchHistory()
    },

    onDelete() {
      var _this = this
      wx.showModal({
        title: '温馨提示',
        content: '确定要删除历史搜索记录吗？',
        success(res) {
          if (res.confirm) {
            _this.deleteSearchHistory()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    loadMore() {
      if (!this.data.keyword) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.getBookSearchResults(this.getCurrentStart(), this.data.keyword)
          .then(res => {
            this.setMoreData(res.books)
            this.unLocked()
          }, () => {
            this.unLocked()
          })
        // 死锁
      }
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

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        keyword: '',
        isNullImage: false
      })
    },

    //获取热门搜索
    requestSearchHot() {
      requestModel.getSearchHot().then(res => {
        if (res.code == 0) {
          this.setData({
            hotKeywords: res.data
          })
        } else {
          wx.showToast({
            title: '获取热门搜索失败',
            icon: 'none'
          })
        }
      })
    },

    //获取历史搜索
    requestSearchHistory() {
      const openId = wx.getStorageSync("user")
      requestModel.getSearchHistory(openId).then(res => {
        if (res.code == 0) {
          this.setData({
            historyKeywords: res.data
          })
        } else {
          wx.showToast({
            title: '获取搜索历史失败',
            icon: 'none'
          })
        }
      })
    },

    //删除历史搜索
    deleteSearchHistory() {
      const openId = wx.getStorageSync("user")
      requestModel.deleteSearchHistory(openId).then(res => {
        if (res.code == 0) {
          this.setData({
            historyKeywords: []
          })
          wx.showToast({
            title: '成功删除历史搜索记录',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '删除历史搜索记录失败',
            icon: 'none'
          })
        }
      })
    },

    //搜索
    querySearchList(keyword) {
      const openId = wx.getStorageSync('user')
      const address = this.properties.address
      console.log(address)
      requestModel.search(openId, keyword, '', '', address).then(res => {
        this._hideLoadingCenter()
        if (res.code == 0) {
          if (res.data.length == 0) {
            this.setData({
              isNullImage: true
            })
          }
          this.setMoreData(res.data)
          this.setTotal(res.total)
        } else {
          wx.showToast({
            title: '搜索失败',
            icon: 'none'
          })
        }
      })
    }
  }
})