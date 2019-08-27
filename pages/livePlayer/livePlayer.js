// pages/livePlayer/livePlayer.js
import {
  RequestModel
} from "../../models/request.js"

const requestModel = new RequestModel()

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyId: '',
    companyInfo: [],
    photoInfo: [],
    videoLinks: [],

    attention: false,
    fullScreenFlag: false,

    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    src: "",
    isNullPunishment: true,
    state: 'summary',
    selectState: 'summary',
    classs: '',
    selectClasss: '',
    height: 0,
    selectHeight: 0,
    isScroll: false,
    inkBarStyle: {
      'border-bottom': '4rpx solid #00B886',
      'width': '50%',
      'top': '-8rpx'
    },
    activeTabStyle: {
      'color': '#00B886'
    },
    tabStyle: {
      'color': '#666666'
    },

    width: wx.WIN_WIDTH,
    current: 0,
    contentHeight: wx.DEFAULT_CONTENT_HEIGHT - 46,
    scrollTop: 64,
    NAV_HEIGHT: 0,

    date: '',
    dateDay: '',
    dateObj: {},
    dataMonth: '',

    TabCur: 0,
    VerticalNavTop: 0,

    itemList: [],

    isLogin: false,

    positionStyle: "position: fixed; bottom: 95rpx",

    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    clickID: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    wx.showLoading({
      title: '加载中...'
    })
    this.setData({
      companyId: options.companyId
    })
    wx.setNavigationBarTitle({
      title: decodeURIComponent(options.name)
    })

    var user = wx.getStorageSync('user');
    if (user) {
      this.getDetail()
      this.setData({
        showMask1: false
      })
    }else{
      this.setData({
        showMask1: true
      })
    }

    requestModel.getVideoLink(options.companyId).then(res => {
      if (res.code == 0) {
        if (res.data.length != 0) {
          const url = res.data[0].rtmp
          this.setData({
            src: url
          })
        }else{
          wx.showToast({
            title: '暂无直播视频',
            icon: 'none'
          })
        }
        this.setData({
          videoLinks: res.data
        })
      }
    })

    requestModel.getPictureMessage(options.companyId).then(res => {
      wx.hideLoading()
      if (res.code == 0) {
        this.setData({
          photoInfo: res.data
        })
      }
    })

    var date = new Date();
    date = Date.parse(date);
    date = this.format(date);
    this.data.date = date;
    this.data.dateObj = this.data.date.split('/');
    this.data.dateDay = this.data.dateObj[0] + "\u5E74" + this.data.dateObj[1] + "\u6708" + this.data.dateObj[2] + "\u65E5";
    this.data.dataMonth = this.data.dateObj[0] + "\u5E74" + this.data.dateObj[1] + "\u6708";
    const weekday = this.getWeekDay(this.data.dateObj[0], this.data.dateObj[1], this.data.dateObj[2]);
    this.setData({
      date: date,
      dateObj: this.data.dateObj,
      dateDay: this.data.dateDay,
      dataMonth: this.data.dataMonth,
      dateWeekDay: weekday
    });
  },

  getDetail() {
    const openId = wx.getStorageSync('user')
    requestModel.getSchoolDetail(this.data.companyId, openId).then(res => {
      if (res.code == 0) {
        this.setData({
          companyInfo: res.data,
          attention: res.data.attention
        })
      }
    })
  },

  getWeekDay(y, m, d) {
    var myDate = new Date();
    myDate.setFullYear(y, m - 1, d);
    var week = myDate.getDay()
    switch (week) {
      case 0:
        return '星期日';
      case 1:
        return '星期一';
      case 2:
        return '星期二';
      case 3:
        return '星期三';
      case 4:
        return '星期四';
      case 5:
        return '星期五';
      case 6:
        return '星期六';
    }
  },

  selectedHandler: function selectedHandler(e) {
    var val = e.detail;
    const token = wx.getStorageSync('token')
    this.getMenuList(this.data.companyId, val, token)
    this.data.dateObj = val.split('/');
    this.data.dateDay = this.data.dateObj[0] + "\u5E74" + this.data.dateObj[1] + "\u6708" + this.data.dateObj[2] + "\u65E5";
    const weekday = this.getWeekDay(this.data.dateObj[0], this.data.dateObj[1], this.data.dateObj[2]);
    this.setData({
      dateObj: this.data.dateObj,
      dateDay: this.data.dateDay,
      dateWeekDay: weekday
    });
  },

  weekHandler: function weekHandler(e) {
    var dataMonth = e.detail.substring(0, 7);
    dataMonth = dataMonth.split('/');
    console.log(dataMonth);
    this.data.dataMonth = dataMonth[0] + "\u5E74" + dataMonth[1] + "\u6708";
    console.log(this.data.dataMonth);
    this.setData({
      dataMonth: this.data.dataMonth
    });
  },

  format: function format(obj) {
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = '0' + (date.getMonth() + 1);
    var d = '0' + date.getDate();
    return y + '/' + m.substring(m.length - 2, m.length) + '/' + d.substring(d.length - 2, d.length);
  },

  handleChange: function handleChange(e) {
    var index = e.detail.index;
    this.setData({
      current: index
    });
  },

  handleContentChange: function handleContentChange(e) {
    var index = e.detail.current;
    this.setData({
      current: index
    });
    if (index === 3) {
      const token = wx.getStorageSync('token')
      this.getMenuList(this.data.companyId, this.data.date, token)
    }
  },

  getMenuList(companyId, date, token) {
    requestModel.getMenuList(companyId, date, token).then(res => {
      if (res.code == 0) {
        this.setData({
          itemList: res.data
        })
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
    })
  },

  onReady(res) {
    this.ctx = wx.createLivePlayerContext('player')
  },

  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },

  error(e) {
    console.error('live-player error:', e.detail.errMsg)
    wx.showToast({
      title: e.detail.errMsg,
      icon: 'none'
    })
  },

  /**视屏进入、退出全屏 */
  onFullScreen() {
    wx.navigateTo({
      url: '/pages/live/live?src=' + this.data.src,
    })
  },

  previewImage: function(e) {
    var current = e.target.dataset.src
    var imgUrls = e.target.dataset.imgs
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imgUrls // 需要预览的图片http链接列表  
    })
  },

  onPageScroll: function onPageScroll(e) {
    if (e.scrollTop >= 178) {
      this.setData({
        isScroll: true
      });
    } else {
      this.setData({
        isScroll: false
      });
    }
    this.setData({
      scrollTop: e.scrollTop + 64
    });
  },

  onTap(e) {
    if (this.data.state === 'summary') {
      this.setData({
        state: 'details',
        classs: 'rotate',
        height: 145
      })
    } else {
      this.setData({
        state: 'summary',
        classs: '',
        height: 0
      })
    }
  },

  onSelect(e) {
    if (this.data.selectState === 'summary') {
      this.setData({
        selectState: 'details',
        selectClasss: 'rotate',
        selectHeight: 100
      })
    } else {
      this.setData({
        selectState: 'summary',
        selectClasss: '',
        selectHeight: 0
      })
    }
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },

  VerticalMain(e) {
    console.log(e.detail);
  },

  // showModal(e) {
  //   this.setData({
  //     modalName: e.currentTarget.dataset.target
  //   })
  // },

  // hideModal(e) {
  //   this.setData({
  //     modalName: null
  //   })
  // },

  // onSupplier() {
  //   wx.navigateTo({
  //     url: '/pages/supplier/supplier',
  //   })
  // },

  onReport() {
    const token = wx.getStorageSync('token')
    if(token) {
      wx.navigateTo({
        url: '/pages/report/report?companyId=' + this.data.companyId,
      })
    }else{
      this.setData({
        isLogin: true
      })
    }
  },

  onFocus() {
    const openId = wx.getStorageSync('user')
    const focusType = this.data.attention ? "-1" : "0"
    this.focusEvent(openId, focusType)
    wx.showLoading({
      title: '加载中...',
    })
  },

  focusEvent(openId, focusType) {
    requestModel.getUserAttentionCompany(this.data.companyId, openId, focusType).then(res => {
      wx.hideLoading()
      if (res.code == 0) {
        this.setData({
          attention: focusType == "-1" ? false : true
        })
        wx.showToast({
          title: focusType == "-1" ? '已取消' : '已关注',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: focusType == "-1" ? '取消失败' : '关注失败',
          icon: 'none'
        })
      }
    })
  },

  //点选切换直播视频
  onVideoTap(e) {
    const videoSrc = this.data.videoLinks[e.currentTarget.dataset.id].rtmp
    this.setData({
      src: videoSrc,
      clickID: e.currentTarget.dataset.id
    })
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
      url: '/pages/login/login?from_id=2',
    })
  },

  handleShowMask1: function handleShowMask1(e) {
    var show = e.currentTarget.dataset.show;
    this.setData({
      showMask1: show
    });
  },

  //授权登录事件
  bindGetUserInfo() {
    var that = this
    wx.showToast({
      title: '加载中…',
      icon: 'loading'
    })
    requestModel.login(function(user) {
        wx.hideToast()
        //登录成功
        wx.showToast({
          title: '获取用户信息成功',
          icon: "none"
        })
        that.getDetail()
      },
      function() {
        //没有获取到用户信息，登录失败
        wx.showToast({
          title: '没有获取到用户信息，登录失败',
          icon: "none"
        })
      }, '必须授权登录之后才能操作呢，是否重新授权登录？')
  }
})