import {
  RequestModel
} from "../../models/request.js"

const requestModel = new RequestModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    getCodeText: '获取验证码',
    isLoading: false,
    buttonText: '',
    isDisable: false,
    focus: true,
    isActive: false,
    phoneNo: "",
    smsCode: "",
    password: "",
    surePassword: "",
    isDisabled: true,
    from_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //from_id=0:从登录入口直接进入注册页
    //from_id=1:从登录页跳转到注册页
    //from_id=2:从登录页跳转到忘记密码页
    console.log(options.from_id);
    this.setData({
      from_id: options.from_id,
      buttonText: options.from_id == 2 ? '保存' : '注册'
    })
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.from_id == 2 ? '忘记密码' : '注册',
    })
  },

  phoneNoInput(event) {
    let phoneNo = event.detail.value || event.detail.text;
    if (!phoneNo) {
      phoneNo = ""
    }
    this.setData({
      phoneNo
    })
  },

  smsCodeInput(event) {
    let smsCode = event.detail.value || event.detail.text;
    if (!smsCode) {
      smsCode = ""
    }
    this.setData({
      smsCode
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

  surePasswordInput(event) {
    let surePassword = event.detail.value || event.detail.text;
    if (!surePassword) {
      surePassword = ""
    }
    this.setData({
      surePassword
    })
  },

  onGetCode() {
    if (this.data.phoneNo.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: "none"
      })
    } else {
      if (this.data.isDisabled == true) {
        wx.showToast({
          title: '加载中…',
          icon: 'loading'
        })
        if (this.data.from_id == 2) {
          requestModel.getSmsCodeForForget(this.data.phoneNo).then(res => {
            this.handleRequestResult(res);
          })
        } else {
          requestModel.getSmsCode(this.data.phoneNo).then(res => {
            this.handleRequestResult(res);
          })
        }
      } else {
        wx.showToast({
          title: '已获取验证码,请稍后再试',
          icon: 'none'
        })
      }
    }
  },

  handleRequestResult(res) {
    wx.hideToast()
    if (res.code == 0) {
      wx.showToast({
        title: '获取验证码成功',
        icon: "none"
      })
      var _this = this
      var coden = 180 //定义60秒的倒计时
      var codeV = setInterval(function() {
        _this.setData({ //_this这里的作用域不同了
          getCodeText: '重新获取' + (--coden) + 's',
          isDisabled: false,
          isActive: false
        })
        if (coden == -1) { //清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
          clearInterval(codeV)
          _this.setData({
            getCodeText: '获取验证码',
            isDisabled: true
          })
        }
      }, 1000) //1000是1秒
    } else {
      if (res.code == -1 && res.message == '该手机号已经注册，请直接登录') { //手机号已注册
        this.setData({
          isActive: true
        })
      }
      wx.showToast({
        title: res.message,
        icon: "none"
      })
    }
  },

  onGetProtocol() {
    console.log('protocol');
  },

  onGetProvite() {
    console.log('provite');
  },

  submitHandler: function submitHandler() {
    if (this.data.password.length < 6 || this.data.password.length > 20 || this.data.surePassword.length < 6 || this.data.surePassword.length > 20) {
      wx.showToast({
        title: '请设置6-20字符长度的密码',
        icon: 'none'
      })
      return
    }
    if (this.data.password != this.data.surePassword) {
      wx.showToast({
        title: '请保证两次设置的密码一致',
        icon: 'none'
      })
      return
    }
    this.setData({
      isLoading: true,
      buttonText: this.data.from_id == 2 ? '保存中...' : '注册中...',
      isDisable: true
    });
    var that = this;
    const openId = wx.getStorageSync('user');
    requestModel.checkCode(openId, this.data.phoneNo, this.data.smsCode, this.data.password).then(res => {
      console.log(res);
      that.setData({
        isLoading: false,
        buttonText: this.data.from_id == 2 ? '保存' : '注册',
        isDisable: false
      });
      if (res.code == 0) {
        wx.showToast({
          title: this.data.from_id == 2 ? '保存成功' : '注册成功',
          icon: 'none'
        })
        const phoneNo = that.data.phoneNo;
        const password = that.data.password;
        if (that.data.from_id == 0) { //从登录入口直接进入注册页
          setTimeout(function() {
            wx.navigateTo({
              url: '/pages/login/login?from_id=1&phoneNo=' + phoneNo + '&password=' + password,
            })
          }, 500)
        } else { //从登录页跳转到注册页或忘记密码页
          setTimeout(function() {
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1]; //当前页面
            var prevPage = pages[pages.length - 2];
            prevPage.setData({
              phoneNo,
              password
            });
            wx.navigateBack();
          }, 500)
        }
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  }
})