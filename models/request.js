import {
  HTTP
} from "../utils/http-promise.js"

class RequestModel extends HTTP {

  //根据定位地址获取学校(企业)主体列表
  getSchoolListWithAddress(pageNo, pageSize, address) {
    return this.request({
      url: "comCompany/listBySite",
      method: "POST",
      data: {
        page: pageNo,
        rows: pageSize,
        address: address
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //获取学校(企业)主体列表
  getSchoolList(pageNo, pageSize, lat, lng) {
    return this.request({
      url: "comCompany/list",
      method: "POST",
      data: {
        page: pageNo,
        rows: pageSize,
        longitude: lng,
        latitude: lat
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //保存小程序用户信息（小程序用户授权）
  saveOpenInfo(code, encryptedData, iv) {
    return this.request({
      url: "register/saveOpenInfo",
      method: "POST",
      data: {
        code: code,
        encryptedData: encryptedData,
        iv: iv
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //获取注册验证码（忘记密码时）
  getSmsCodeForForget(phoneNo) {
    return this.request({
      url: "register/getSmsCodeForForget",
      method: "POST",
      data: {
        phoneNo: phoneNo
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //获取注册验证码
  getSmsCode(phoneNo) {
    return this.request({
      url: "register/getSmsCode",
      method: "POST",
      data: {
        phoneNo: phoneNo
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //检验验证码，并保存用户手机号
  checkCode(openId, phoneNo, smsCode, password) {
    return this.request({
      url: "register/checkCode",
      method: "POST",
      data: {
        openId: openId,
        phoneNo: phoneNo,
        smsCode: smsCode,
        password: password
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //获取学校（企业）详情
  getSchoolDetail(companyId, openId) {
    return this.request({
      url: "comCompany/getDetail",
      method: "POST",
      data: {
        companyId: companyId,
        openId: openId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //用户关注/取消关注学校（企业）
  getUserAttentionCompany(companyId, openId, status) {
    return this.request({
      url: "appletUserAttention/userAttentionCompany",
      method: "POST",
      data: {
        companyId: companyId,
        openId: openId,
        status: status
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //我关注的学校列表
  getMyAttentionList(pageNo, pageSize, openId) {
    return this.request({
      url: "appletUserAttention/myAttentionList",
      method: "POST",
      data: {
        page: pageNo,
        rows: pageSize,
        openId: openId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //搜索
  search(openId, keyWord, longitude, latitude, address) {
    return this.request({
      url: "comCompany/search",
      method: "POST",
      data: {
        openId: openId,
        keyWord: keyWord,
        longitude: longitude,
        latitude: latitude,
        address: address
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //热门搜索
  getSearchHot() {
    return this.request({
      url: "appletSearchRecord/hotSearch",
      method: "POST",
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //搜索历史
  getSearchHistory(openId, token) {
    return this.request({
      url: "appletSearchRecord/searchHistory",
      method: "POST",
      data: {
        openId: openId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //删除历史搜索记录
  deleteSearchHistory(openId, token) {
    return this.request({
      url: "appletSearchRecord/deleteSearchHistory",
      method: "POST",
      data: {
        openId: openId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //获取直播地址接口
  getVideoLink(companyId) {
    return this.request({
      url: "comCompany/videoLink",
      method: "POST",
      data: {
        companyId: companyId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //用户登录
  getUserLogin(phoneNo, password) {
    return this.request({
      url: "appletUser/login",
      method: "POST",
      data: {
        phoneNo: phoneNo,
        password: password
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //获取公司资质图片
  getPictureMessage(companyId) {
    return this.request({
      url: "comCompany/pictureMessage",
      method: "POST",
      data: {
        companyId: companyId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //菜谱
  getMenuList(companyId, date,  token) {
    return this.request({
      url: "appletMenu/menu",
      method: "POST",
      data: {
        companyId: companyId,
        date: date
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      }
    })
  }

  //举报
  getUserReport(companyId, reporter, title, content, picture, token) {
    return this.request({
      url: "comReport/add",
      method: "POST",
      data: {
        companyId: companyId,
        reporter: reporter,
        title: title,
        content: content,
        picture: picture
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      }
    })
  }

  //删除图片
  deleteUploadPhoto(path) {
    return this.request({
      url: "upload/deleteImage",
      method: "POST",
      data: {
        path: path
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //获取banner信息
  getBannerInfo() {
    return this.request({
      url: "appletBanner/query",
      method: "POST",
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  //公共的登录方法，只演示逻辑
  login() {
    var that = this
    var sucess = arguments[0] ? arguments[0] : function() {}; //登录成功的回调
    var fail = arguments[1] ? arguments[1] : function() {}; //登录失败的回调
    var title = arguments[2] ? arguments[2] : '授权登录失败，部分功能将不能使用，是否重新登录？'; //当用户取消授权登录时，弹出的确认框文案

    var user = wx.getStorageSync('user'); //登录过后，用户信息会缓存
    if (!user) {
      wx.login({
        success: function(res) {
          var code = res.code;
          wx.getUserInfo({
            success: function(res) {
              console.log(res)
              var rawData = encodeURIComponent(res.rawData);
              var signature = res.signature || '';
              var encryptedData = res.encryptedData;
              var iv = res.iv;
              that.saveOpenInfo(code, encryptedData, iv).then(res => {
                //调用服务器端登录，获得详细用户资料，比如openid(支付用)，保存用户数据到服务器  
                console.log(res)
                wx.setStorageSync("user", res.data) //本地缓存user数据   下次打开不需要登录
                // var app = getApp()
                // app.globalData.user = res //在当前的app对象中缓存user数据
                sucess(res.data)
              })
            },
            fail: function(res) { //用户点了“拒绝”
              wx.showModal({
                title: '温馨提示',
                content: title,
                showCancel: false,
                confirmText: "授权",
                success: function(res) {
                  if (res.confirm) {
                    if (wx.openSetting) { //当前微信的版本 ，是否支持openSetting
                      wx.openSetting({
                        success: (res) => {
                          if (res.authSetting["scope.userInfo"]) { //如果用户重新同意了授权登录
                            wx.getUserInfo({ //跟上面的wx.getUserInfo  sucess处理逻辑一样
                              success: function(res) {
                                console.log(res)
                                var rawData = encodeURIComponent(res.rawData);
                                var signature = res.signature || '';
                                var encryptedData = res.encryptedData;
                                var iv = res.iv;
                                that.saveOpenInfo(code, encryptedData, iv).then(res => {
                                  wx.setStorageSync("user", res.data)
                                  // var app = getApp()
                                  // app.globalData.user = res
                                  sucess(res.data)
                                })
                              }
                            })
                          } else { //用户还是拒绝
                            fail()
                          }
                        },
                        fail: function() { //调用失败，授权登录不成功
                          fail()
                        }
                      })
                    } else {
                      fail()
                    }
                  }
                }
              })
            }
          })
        },
        fail: function(res) {
          fail()
        }
      })
    } else { //如果缓存中已经存在user  那就是已经登录过
      sucess(user)
    }
  }
}

export {
  RequestModel
}