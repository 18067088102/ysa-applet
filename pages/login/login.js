import {
  RequestModel
} from "../../models/request.js"

const requestModel = new RequestModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    buttonText: '登录',
    isDisable: false,
    focus: true,
    phoneNo: "",
    password: "",
    from_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      from_id: options.from_id
    })
    if (options.phoneNo && options.password) {
      this.setData({
        phoneNo: options.phoneNo,
        password: options.password
      })
    }
  },

  phoneNoInput(event) {
    let phoneNo = event.detail.value || event.detail.text;
    console.log(phoneNo);
    if (!phoneNo) {
      phoneNo = ""
    }
    this.setData({
      phoneNo
    })
  },

  passwordInput(event) {
    let password = event.detail.value || event.detail.text;
    console.log(password);
    if (!password) {
      password = ""
    }
    this.setData({
      password
    })
  },

  onRegister() {
    wx.navigateTo({
      url: '/pages/register/register?from_id=1',
    })
  },

  onForgetPsw() {
    wx.navigateTo({
      url: '/pages/register/register?from_id=2',
    })
  },

  onGetProtocol() {
    console.log('protocol');
  },

  onGetProvite() {
    console.log('provite');
  },

  submitHandler: function submitHandler() {
    if (this.data.phoneNo.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '手机号或密码不能为空',
        icon: 'none'
      })
      return
    }
    if (this.data.phoneNo.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    if (this.data.password.length < 6 || this.data.password.length > 20) {
      wx.showToast({
        title: '请输入6-20字符长度的密码',
        icon: 'none'
      })
      return
    }
    this.setData({
      isLoading: true,
      buttonText: '登录中...',
      isDisable: true
    });
    var that = this;
    requestModel.getUserLogin(this.data.phoneNo, this.data.password).then(res => {
      console.log(res);
      that.setData({
        isLoading: false,
        buttonText: '登录',
        isDisable: false
      });
      if (res.code == 0) {
        wx.setStorageSync('token', res.data)
        wx.showToast({
          title: '登录成功',
          icon: 'none'
        })
        setTimeout(function() {
          if (that.data.from_id == 1) {
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1]; //当前页面
            var prevPage = pages[pages.length - 2];
            var prevPrevPage = pages[pages.length - 3];
            prevPrevPage.setData({
              isLogin: false
            });
            wx.navigateBack({
              delta: 2
            });
          } else {
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1]; //当前页面
            var prevPage = pages[pages.length - 2];
            prevPage.setData({
              isLogin: false
            });
            wx.navigateBack({
              delta: 1
            });
          }
        }, 500)
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
        buttonText: '登录',
        isDisable: false
      });
    })
  }
})