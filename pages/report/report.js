// pages/report/report.js
import {
  config
} from "../../utils/config.js"

import {
  RequestModel
} from "../../models/request.js"

const requestModel = new RequestModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    picker: ['环境卫生', '食品安全', '服务质量', '其他'],
    isLoading: false,
    buttonText: '提交',
    isDisable: false,
    companyId: '',
    pictures: [],
    problemTitle: '',
    textArea: '',
    isLogin: false
  },

  PickerChange(e) {
    const index = e.detail.value
    const title = this.data.picker[index]
    this.setData({
      index: index,
      problemTitle: title
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      companyId: options.companyId
    })
  },

  submitHandler: function submitHandler() {
    this.setData({
      isLoading: true,
      buttonText: '提交中...',
      isDisable: true
    });
    var that = this;
    const token = wx.getStorageSync('token')
    const openId = wx.getStorageSync('user')
    const content = this.getTextByJs(this.data.pictures, ",")
    requestModel.getUserReport(this.data.companyId, openId, this.data.problemTitle, this.data.textArea, content, token).then(res => {
      console.log(res)
      that.setData({
        isLoading: false,
        buttonText: '提交',
        isDisable: false
      });
      if (res.code == 0) {
        wx.showToast({
          title: '提交成功',
          icon: 'none'
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 500)
      } else if (res.code == -3) {
        this.setData({
          isLogin: true
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    }).catch(err => {
      console.log("==> [ERROR]", err)
      that.setData({
        isLoading: false,
        buttonText: '提交',
        isDisable: false
      });
    })
  },

  getTextByJs(arr, type) {
    var str = "";
    for (var i = 0; i < arr.length; i++) {
      str += arr[i] + type;
    }
    //去掉最后一个逗号(如果不需要去掉，就不用写)
    if (str.length > 0) {
      str = str.substr(0, str.length - 1);
    }
    return str;
  },

  onTextAreaChange(e) {
    this.setData({
      textArea: e.detail.detail.value
    })
  },

  onChangeTap(e) {
    var that = this
    wx.showToast({
      title: '正在上传...',
      icon: 'loading',
      mask: true
    })
    wx.uploadFile({
      url: config.api_base_url + 'upload/image',
      filePath: e.detail.current[0],
      name: 'file',
      formData: {},
      header: {
        "Content-Type": "multipart/form-data"
      },
      success: function(res) {
        wx.hideToast()
        var result = JSON.parse(res.data)
        if (result.code == 0) {
          var imgUrl = result.data;
          that.setData({
            pictures: that.data.pictures.concat(imgUrl)
          })
        }
        console.log(result, imgUrl, that.data.pictures)
      },
      fail: function(res) {
        wx.hideToast()
        wx.showToast({
          title: '上传图片失败',
          icon: 'none'
        })
      }
    });
  },

  onRemoveTap(e) {
    const index = e.detail.index
    var imgPath = that.data.pictures[index]
    requestModel.deleteUploadPhoto(imgPath).then(res => {
      if (res.code == 0) {
        that.setData({
          pictures: that.data.pictures.splice(index, index)
        })
        console.log(that.data.pictures)
        wx.showToast({
          title: '删除成功',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        })
      }
    })
  },

  onPreviewTap(e) {

  },

  //注册
  onRegister() {
    wx.navigateTo({
      url: '/pages/register/register?from_id=0',
    })
  },

  //登录
  onLogin() {
    wx.navigateTo({
      url: '/pages/login/login?from_id=0',
    })
  }
})