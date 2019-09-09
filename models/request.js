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
  saveOpenInfo(code) {
    return this.request({
      url: "register/saveOpenInfo",
      method: "POST",
      data: {
        code: code
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
  getMenuList(companyId, date, token) {
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

  //反馈
  getUserFeedBack(reporter, title, content, picture) {
    return this.request({
      url: "appletFeedback/add",
      method: "POST",
      data: {
        reporter: reporter,
        title: title,
        content: content,
        picture: picture
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
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
}

export {
  RequestModel
}