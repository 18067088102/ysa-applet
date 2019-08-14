"use strict";

import {
  RequestModel
} from "../../models/request.js"

const requestModel = new RequestModel()

var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var tagStyle6 = "\n  border: 1px solid #f1f2f3;\n  border-radius: 3px;\n  text-align: center;\n  height: 25px;\n  line-height: 24px;\n";

var selectStyle2 = "\n  background: #3AC3B0;\n  color: #fff;\n  padding: 0 5px;\n  text-align: center;\n  height: 25px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  line-height: 20px;\n  border-radius: 3px;\n";
exports.default = Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    caseData: [],
    imgShow: false,
    show: false,
    loading: true,
    page: 1,
    pages: 0,

    lat: '',
    lng: '',

    loadingCenter: false,

    showMask1: true,
    customSyle1: {
      'background-color': 'rgba(255, 255, 255, 0.8)'
    },
    
    isFromCitySelect: false,
    ad_code: "",
    country: "",
    NAV_HEIGHT: 50,
    popup_NAV_HEIGHT: 46,
    popupHeight: wx.WIN_HEIGHT,
    scrollTop: 0,
    swiperHeight: 200,
    items2: [],
    scroHeight: parseInt(wx.DEFAULT_CONTENT_HEIGHT * 0.8),
    customStyle: {
      'background-color': '#eee',
      'height': '46px',
      'line-height': '46px'
    },
    items1: [{
      src: 'http://images.uileader.com/20171110/e5b64484-b5e0-472a-bf52-ac95fb5685d3.jpg'
    }, {
      src: 'http://images.uileader.com/20171110/e33376a8-c599-42e5-87ed-84aec360a61d.jpg'
    }, {
      src: 'http://images.uileader.com/20171110/37cc4a4e-a253-4fcd-a4f6-d9710e8f63e8.jpg'
    }],
    foodList: ['全部', '学校食堂', '幼儿园食堂', '托幼食堂'],
    sortList: ['智能排序', '离我最近', '好评优先', '人气最高'],
    checklist1: [],
    checklist2: [],
    checkContent: '全部',
    cityName: '附近',
    sortName: '智能排序',
    navList: [{
      name: '类型',
      active: '',
      arrow: 'slide_down',
      bindtap: 'openPopup1'
    }, {
      name: '附近',
      active: '',
      arrow: 'slide_down',
      bindtap: 'openPopup2'
    }, {
      name: '智能排序',
      active: '',
      arrow: 'slide_down',
      bindtap: 'openPopup3'
    }, {
      name: '筛选',
      active: '',
      arrow: 'slide_down',
      bindtap: 'openPopup4'
    }],
    winWidth: wx.WIN_WIDTH,
    popupTop: wx.DEFAULT_HEADER_HEIGHT + 46,
    show1: false,
    show3: false,

    show: {},
    current: 0,
    className: 'active',
    className2: ''
  },
  navigateBack: function navigateBack() {
    wx.navigateBack();
  },
  openPopup: function openPopup(e) {
    console.log(e, this.data.show2, 'openPopup');
    wx.pageScrollTo({
      scrollTop: this.data.swiperHeight
    });
    var index = e.currentTarget.dataset.idx;
    console.log(index);
    if (index === 0) {
      var _setData;
      console.log('0');
      this.setData((_setData = {
        show2: false
      }, _defineProperty(_setData, "show2", false), _defineProperty(_setData, "show4", false), _defineProperty(_setData, "show1", !this.data.show1), _setData));
      console.log('0');
      console.log(this.data.show1);
    } else if (index === 1) {
      this.setData({
        show1: false,
        show3: false,
        show4: false,
        show2: !this.data.show2
      });
    } else if (index === 2) {
      this.setData({
        show1: false,
        show2: false,
        show4: false,
        show3: !this.data.show3
      });
    } else {
      this.setData({
        show1: false,
        show2: false,
        show3: false,
        show4: !this.data.show4
      });
    }
  },
  change: function change(e) {
    var val = e.detail.value;
    this.data.navList[0].name = val.join('-');
    this.setData({
      navList: this.data.navList,
      show1: false
    });
  },
  change2: function change2(e) {
    var val = e.detail.value;
    this.data.navList[2].name = val.join('-');
    this.setData({
      navList: this.data.navList,
      show3: false
    });
  },
  popHide: function popHide() {
    this.data.navList[0].active = '';
    this.setData({
      show1: false,
      navList: this.data.navList
    });
  },
  popShow: function popShow() {
    this.data.navList[0].active = 'active';
    this.setData({
      show1: true,
      navList: this.data.navList
    });
  },
  popHide2: function popHide2() {
    this.data.navList[2].active = '';
    this.setData({
      show3: false,
      navList: this.data.navList
    });
  },
  popShow2: function popShow2() {
    this.data.navList[2].active = 'active';
    this.setData({
      show3: true,
      navList: this.data.navList
    });
  },
  handleChange: function handleChange(index, key) {
    this[key] = index;
  },
  handleContentChange: function handleContentChange(index, key) {
    this[key] = index;
  },
  select: function select(result) {
    this.data.navList[1].name = result.city;
    this.show2 = false;
    this.setData({
      navList: this.data.navList,
      show2: false
    });
  },
  //滑动界面回调函数
  onPageScroll: function onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    });
  },
  onShow: function onShow(options) {
    if (this.data.isFromCitySelect) { //选择完城市后返回首页触发的事件
      this.setData({
        show: false,
        loading: true
      })
      this.fetchSchoolListWithAddress(1, this.data.country, true)
    }
  },
  onLoad: function onLoad(options) {
    this.getPosition(); //定位
    var user = wx.getStorageSync('user');
    if (user) {
      this.setData({
        showMask1: false
      })
    }
  },
  onReady: function onReady() {

  },
  //定位点击跳转到城市选择界面
  showIndexList1: function showIndexList1() {
    wx.navigateTo({
      url: `/pages/citySelect/citySelect?country=${this.data.country}&adcode=${this.data.ad_code}`
    });
  },
  //搜索框点击事件
  onSearch() {
    wx.navigateTo({
      url: '/pages/search/search?address=' + this.data.country,
    })
  },
  //我的关注点击事件
  onFocus() {
    wx.navigateTo({
      url: '/pages/focus/focus',
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
      },
      function() {
        //没有获取到用户信息，登录失败
        wx.showToast({
          title: '没有获取到用户信息，登录失败',
          icon: "none"
        })
      }, '必须授权登录之后才能操作呢，是否重新授权登录？')
  },
  //定位请求
  getPosition: function getPosition() {
    // 实例化API核心类
    var qqmapsdk = new QQMapWX({
      key: 'B45BZ-Q6FW6-U73SF-MFZUS-VNWSO-4TF2Q' // 必填
    });
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        // 调用接口        
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            //获取市名称
            var position = "";
            if (res.result.ad_info.district) {
              position = res.result.ad_info.district;
            } else {
              position = res.result.ad_info.city;
            }
            _this.setData({
              country: position,
              ad_code: res.result.ad_info.adcode,
              lat: res.result.location.lat,
              lng: res.result.location.lng
            });

            _this.fetchSchoolList(1, _this.data.lat, _this.data.lng, true)
          }
        })
      },
      fail: function(res) {
        wx.showModal({
          title: '温馨提示',
          content: '位置授权失败，部分功能将不能使用，是否重新授权？',
          showCancel: false,
          confirmText: "授权",
          success: function (res) {
            if (res.confirm) {
              if (wx.openSetting) { //当前微信的版本 ，是否支持openSetting
                wx.openSetting({
                  success: (res) => {
                    if (res.authSetting["scope.userLocation"]) { //如果用户重新同意了位置授权
                      wx.getLocation({
                        type: 'wgs84',
                        success: function (res) {
                          var latitude = res.latitude
                          var longitude = res.longitude
                          // 调用接口        
                          qqmapsdk.reverseGeocoder({
                            location: {
                              latitude: latitude,
                              longitude: longitude
                            },
                            success: function (res) {
                              var position = "";
                              if (res.result.ad_info.district) {
                                position = res.result.ad_info.district;
                              } else {
                                position = res.result.ad_info.city;
                              }
                              _this.setData({
                                country: position,
                                ad_code: res.result.ad_info.adcode,
                                lat: res.result.location.lat,
                                lng: res.result.location.lng
                              });

                              _this.fetchSchoolList(1, _this.data.lat, _this.data.lng, true)
                            }
                          })
                        }
                      })
                    }
                  }
                })
              }
            }
          }
        })
      }
    })
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

  // 下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    if (!this.loading) {
      if (!this.data.isFromCitySelect) {
        this.fetchSchoolList(1, this.data.lat, this.data.lng, true).then(() => {
          wx.hideNavigationBarLoading()
          // 处理完成后，终止下拉刷新
          wx.stopPullDownRefresh()
        })
      } else {
        this.fetchSchoolListWithAddress(1, this.data.country, true).then(() => {
          wx.hideNavigationBarLoading()
          // 处理完成后，终止下拉刷新
          wx.stopPullDownRefresh()
        })
      }
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
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
      if (!this.data.isFromCitySelect) {
        this.fetchSchoolList(this.data.page + 1, this.data.lat, this.data.lng)
      } else {
        this.fetchSchoolListWithAddress(this.data.page + 1, this.data.country)
      }
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

  //根据经纬度请求列表
  fetchSchoolList(pageNo, lat, lng, override) {
    this._showLoadingCenter()
    this.setData({
      show: false,
      loading: true
    })
    this.loading = true
    // 向后端请求指定页码的数据
    return requestModel.getSchoolList(pageNo, 10, lat, lng).then(res => {
      this._hideLoadingCenter()
      if (res.code == 0) {
        const records = res.records
        if (records.length != 0) {
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
        isNullImage: true
      })
    }).then(() => {
      this._hideLoadingCenter()
      this.loading = false
    })
  },

  //根据地址名称请求列表
  fetchSchoolListWithAddress(pageNo, address, override) {
    this._showLoadingCenter()
    this.setData({
      show: false,
      loading: true
    })
    this.loading = true
    // 向后端请求指定页码的数据
    return requestModel.getSchoolListWithAddress(pageNo, 10, address).then(res => {
      this._hideLoadingCenter()
      if (res.code == 0) {
        const records = res.records
        if (records.length != 0) {
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
        isNullImage: true
      })
    }).then(() => {
      this._hideLoadingCenter()
      this.loading = false
    })
  }
});