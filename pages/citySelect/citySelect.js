'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// import mydata from './demo.js'
var tagStyle = '\n  font-size: 14px;\n  margin-top: 10px;\n  border-radius: 4px;\n  color: #666;\n  background-color:#fff;\n  border:1px solid #f1f1f1;\n  line-height:35px;\n  text-align:center;\n  overflow: hidden;\n text-overflow: ellipsis;\n white-space: nowrap;\n';

import utils from '../../utils/util.js'

var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

const {
  isNotEmpty,
  safeGet,
} = utils;

exports.default = Page({
  data: {
    showCountyPicker: false,
    animationData: {},
    tagsArray: [],
    selectState: 'summary',
    selectClasss: '',
    conHeight: wx.DEFAULT_CONTENT_HEIGHT,
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + 'px',
    list: [{
      index: 'A',
      items: [{
        name: '鞍山',
        code: "210300"
      }, {
        name: '安庆',
        code: "340800"
      }, {
        name: '安阳',
        code: "410500"
      }, {
        name: '安康',
        code: "610900"
      }, {
        name: '阿坝',
        code: "513200"
      }, {
        name: '安顺',
        code: "520400"
      }, {
        name: '阿里',
        code: "542500"
      }, {
        name: '阿克苏',
        code: "652900"
      }, {
        name: '阿勒泰',
        code: "654300"
      }, {
        name: '阿拉善盟',
        code: "152900"
      }]
    }, {
      index: 'B',
      items: [{
        name: '北京',
        code: "110000"
      }, {
        name: '保定',
        code: "130600"
      }, {
        name: '保山',
        code: "530500"
      }, {
        name: '包头',
        code: "150200"
      }, {
        name: '巴彦淖尔',
        code: "150800"
      }, {
        name: '本溪',
        code: "210500"
      }, {
        name: '宝鸡',
        code: "610300"
      }, {
        name: '蚌埠',
        code: "340300"
      }, {
        name: '滨州',
        code: "371600"
      }, {
        name: '亳州',
        code: "341600"
      }, {
        name: '北海',
        code: "450500"
      }, {
        name: '巴中',
        code: "511900"
      }, {
        name: '白城',
        code: "220800"
      }, {
        name: '百色',
        code: "451000"
      }, {
        name: '白山',
        code: "220600"
      }, {
        name: '白银',
        code: "620400"
      }]
    }, {
      index: 'C',
      items: [{
        name: '成都',
        code: "510100"
      }, {
        name: '重庆',
        code: "500000"
      }, {
        name: '长春',
        code: "220100"
      }, {
        name: '长沙',
        code: "430100"
      }, {
        name: '沧州',
        code: "130900"
      }, {
        name: '常州',
        code: "320400"
      }, {
        name: '滁州',
        code: "341100"
      }, {
        name: '潮州',
        code: "445100"
      }, {
        name: '池州',
        code: "341700"
      }, {
        name: '常德',
        code: "430700"
      }, {
        name: '常熟',
        code: "620400"
      }, {
        name: '长治',
        code: "140400"
      }, {
        name: '承德',
        code: "130800"
      }, {
        name: '郴州',
        code: "431000"
      }, {
        name: '赤峰',
        code: "150400"
      }]
    }, {
      index: 'D',
      items: [{
        name: '大连',
        code: "210200"
      }, {
        name: '东莞',
        code: "441900"
      }, {
        name: '大庆',
        code: "230600"
      }, {
        name: '大同',
        code: "140200"
      }, {
        name: '丹东',
        code: "210600"
      }, {
        name: '达州',
        code: "511700"
      }, {
        name: '德阳',
        code: "510600"
      }, {
        name: '德州',
        code: "371400"
      }, {
        name: '东营',
        code: "370500"
      }, {
        name: '定西',
        code: "621100"
      }, {
        name: '大理',
        code: "532900"
      }]
    }, {
      index: 'E',
      items: [{
        name: '鄂尔多斯',
        code: "150600"
      }, {
        name: '鄂州',
        code: "420700"
      }, {
        name: '恩施',
        code: "422800"
      }]
    }, {
      index: 'F',
      items: [{
        name: '佛山',
        code: "440600"
      }, {
        name: '福州',
        code: "350100"
      }, {
        name: '抚顺',
        code: "210400"
      }, {
        name: '抚州',
        code: "361000"
      }, {
        name: '阜新',
        code: "210900"
      }, {
        name: '阜阳',
        code: "341200"
      }]
    }, {
      index: 'G',
      items: [{
        name: '广州',
        code: "440100"
      }, {
        name: '贵阳',
        code: "520100"
      }, {
        name: '赣州',
        code: "360700"
      }, {
        name: '贵港',
        code: "450800"
      }, {
        name: '桂林',
        code: "450300"
      }, {
        name: '广安',
        code: "511600"
      }, {
        name: '广元',
        code: "510800"
      }]
    }, {
      index: 'H',
      items: [{
        name: '杭州',
        code: "330100"
      }, {
        name: '哈尔滨',
        code: "230100"
      }, {
        name: '合肥',
        code: "340100"
      }, {
        name: '海口',
        code: "460100"
      }, {
        name: '邯郸',
        code: "130400"
      }, {
        name: '衡阳',
        code: "430400"
      }, {
        name: '淮安',
        code: "320800"
      }, {
        name: '呼和浩特',
        code: "150100"
      }, {
        name: '惠州',
        code: "441300"
      }, {
        name: '湖州',
        code: "330500"
      }, {
        name: '衡水',
        code: "131100"
      }, {
        name: '菏泽',
        code: "371700"
      }, {
        name: '淮南',
        code: "340400"
      }, {
        name: '淮北',
        code: "340600"
      }, {
        name: '黄山',
        code: "341000"
      }, {
        name: '黄冈',
        code: "421100"
      }, {
        name: '怀化',
        code: "431200"
      }]
    }, {
      index: 'J',
      items: [{
        name: '济南',
        code: "370100"
      }, {
        name: '江门',
        code: "440700"
      }, {
        name: '嘉兴',
        code: "330400"
      }, {
        name: '吉林',
        code: "220200"
      }, {
        name: '荆州',
        code: "421000"
      }, {
        name: '荆门',
        code: "420800"
      }, {
        name: '金华',
        code: "330700"
      }, {
        name: '济宁',
        code: "370800"
      }, {
        name: '佳木斯',
        code: "230800"
      }, {
        name: '焦作',
        code: "410800"
      }, {
        name: '揭阳',
        code: "445200"
      }, {
        name: '锦州',
        code: "210700"
      }, {
        name: '景德镇',
        code: "360200"
      }, {
        name: '九江',
        code: "360400"
      }]
    }, {
      index: 'K',
      items: [{
        name: '昆明',
        code: "530100"
      }, {
        name: '开封',
        code: "410200"
      }, {
        name: '克拉玛依',
        code: "650200"
      }]
    }, {
      index: 'L',
      items: [{
        name: '兰州',
        code: "620100"
      }, {
        name: '连云港',
        code: "320700"
      }, {
        name: '丽水',
        code: "331100"
      }, {
        name: '丽江',
        code: "530700"
      }, {
        name: '六安',
        code: "341500"
      }, {
        name: '柳州',
        code: "450200"
      }, {
        name: '洛阳',
        code: "410300"
      }, {
        name: '廊坊',
        code: "131000"
      }, {
        name: '拉萨',
        code: "540100"
      }, {
        name: '乐山',
        code: "511100"
      }, {
        name: '聊城',
        code: "371500"
      }, {
        name: '辽阳',
        code: "211000"
      }, {
        name: '临汾',
        code: "141000"
      }, {
        name: '临沂',
        code: "371300"
      }, {
        name: '莱芜',
        code: "371200"
      }]
    }, {
      index: 'M',
      items: [{
        name: '绵阳',
        code: "510700"
      }, {
        name: '马鞍山',
        code: "340500"
      }, {
        name: '牡丹江',
        code: "231000"
      }, {
        name: '眉山',
        code: "511400"
      }, {
        name: '茂名',
        code: "440900"
      }, {
        name: '梅州',
        code: "441400"
      }]
    }, {
      index: 'N',
      items: [{
        name: '南京',
        code: "320100"
      }, {
        name: '南宁',
        code: "450100"
      }, {
        name: '宁波',
        code: "330200"
      }, {
        name: '南通',
        code: "320600"
      }, {
        name: '南昌',
        code: "360100"
      }, {
        name: '南阳',
        code: "411300"
      }, {
        name: '南充',
        code: "511300"
      }, {
        name: '宁德',
        code: "350900"
      }, {
        name: '内江',
        code: "511000"
      }, {
        name: '南平',
        code: "350700"
      }]
    }, {
      index: 'P',
      items: [{
        name: '莆田',
        code: "350300"
      }, {
        name: '盘锦',
        code: "211100"
      }, {
        name: '平顶山',
        code: "410400"
      }, {
        name: '濮阳',
        code: "410900"
      }, {
        name: '攀枝花',
        code: "510400"
      }, {
        name: '萍乡',
        code: "360300"
      }, {
        name: '平凉',
        code: "620800"
      }]
    }, {
      index: 'Q',
      items: [{
        name: '青岛',
        code: "370200"
      }, {
        name: '秦皇岛',
        code: "130300"
      }, {
        name: '泉州',
        code: "350500"
      }, {
        name: '清远',
        code: "441800"
      }, {
        name: '齐齐哈尔',
        code: "230200"
      }, {
        name: '曲靖',
        code: "530300"
      }, {
        name: '衢州',
        code: "330800"
      }, {
        name: '庆阳',
        code: "621000"
      }]
    }, {
      index: 'R',
      items: [{
        name: '日照',
        code: "371100"
      }]
    }, {
      index: 'S',
      items: [{
        name: '上海',
        code: "310000"
      }, {
        name: '深圳',
        code: "440300"
      }, {
        name: '沈阳',
        code: "210100"
      }, {
        name: '石家庄',
        code: "130100"
      }, {
        name: '苏州',
        code: "320500"
      }, {
        name: '宿州',
        code: "341300"
      }, {
        name: '宿迁',
        code: "321300"
      }, {
        name: '三亚',
        code: "460200"
      }, {
        name: '汕头',
        code: "440500"
      }, {
        name: '绍兴',
        code: "330600"
      }, {
        name: '商丘',
        code: "411400"
      }, {
        name: '上饶',
        code: "361100"
      }, {
        name: '韶关',
        code: "440200"
      }]
    }, {
      index: 'T',
      items: [{
        name: '天津',
        code: "120000"
      }, {
        name: '太原',
        code: "140100"
      }, {
        name: '泰州',
        code: "321200"
      }, {
        name: '台州',
        code: "331000"
      }, {
        name: '唐山',
        code: "130200"
      }, {
        name: '泰安',
        code: "370900"
      }, {
        name: '铜陵',
        code: "340700"
      }, {
        name: '铁岭',
        code: "211200"
      }, {
        name: '通化',
        code: "220500"
      }, {
        name: '天水',
        code: "620500"
      }]
    }, {
      index: 'W',
      items: [{
        name: '武汉',
        code: "420100"
      }, {
        name: '温州',
        code: "330300"
      }, {
        name: '无锡',
        code: "320200"
      }, {
        name: '潍坊',
        code: "370700"
      }, {
        name: '威海',
        code: "371000"
      }, {
        name: '芜湖',
        code: "340200"
      }, {
        name: '乌鲁木齐',
        code: "650100"
      }, {
        name: '渭南',
        code: "610500"
      }]
    }, {
      index: 'X',
      items: [{
        name: '西安',
        code: "610100"
      }, {
        name: '厦门',
        code: "350200"
      }, {
        name: '咸宁',
        code: "421200"
      }, {
        name: '徐州',
        code: "320300"
      }, {
        name: '咸阳',
        code: "610400"
      }, {
        name: '孝感',
        code: "420900"
      }, {
        name: '湘潭',
        code: "430300"
      }, {
        name: '邢台',
        code: "130500"
      }, {
        name: '西宁',
        code: "630100"
      }, {
        name: '信阳',
        code: "411500"
      }, {
        name: '许昌',
        code: "411000"
      }, {
        name: '宣城',
        code: "341800"
      }]
    }, {
      index: 'Y',
      items: [{
        name: '盐城',
        code: "320900"
      }, {
        name: '扬州',
        code: "321000"
      }, {
        name: '烟台',
        code: "370600"
      }, {
        name: '宜昌',
        code: "420500"
      }, {
        name: '银川',
        code: "640100"
      }, {
        name: '岳阳',
        code: "430600"
      }, {
        name: '阳江',
        code: "441700"
      }, {
        name: '宜宾',
        code: "511500"
      }, {
        name: '营口',
        code: "210800"
      }, {
        name: '宜春',
        code: "360900"
      }, {
        name: '永州',
        code: "431100"
      }]
    }, {
      index: 'Z',
      items: [{
        name: '郑州',
        code: "410100"
      }, {
        name: '湛江',
        code: "440800"
      }, {
        name: '镇江',
        code: "321100"
      }, {
        name: '中山',
        code: "442000"
      }, {
        name: '珠海',
        code: "440400"
      }, {
        name: '株洲',
        code: "430200"
      }, {
        name: '枣庄',
        code: "370400"
      }, {
        name: '淄博',
        code: "370300"
      }, {
        name: '张家口',
        code: "130700"
      }, {
        name: '漳州',
        code: "350600"
      }, {
        name: '周口',
        code: "411600"
      }, {
        name: '遵义',
        code: "520300"
      }, {
        name: '资阳',
        code: "512000"
      }, {
        name: '中卫',
        code: "640500"
      }]
    }],
    tagsData: [],
    tagsData1: [{
      text: '合肥',
      code: '340100',
      tagStyle: tagStyle
    }, {
      text: '芜湖',
      code: '340200',
      tagStyle: tagStyle
    }, {
      text: '巢湖',
      tagStyle: tagStyle
    }],
    alpha: '',
    place: '北京',
    search: '输入城市名或拼音查询',
    country: '',
    ad_code: "",
    position_code: "",
    position: '定位中…',
    isTap: false
  },
  tapTag: function tapTag(e) {
    var city = e.currentTarget.dataset.city;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      country: city,
      isFromCitySelect: true
    });
    wx.navigateBack();
  },
  singleselect: function singleselect(msg) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      country: msg.detail.name,
      ad_code: msg.detail.code,
      isFromCitySelect: true
    });
    wx.navigateBack();
  },
  positionTap: function positionTap() {
    if (this.data.isTap) {
      var place = this.data.position;
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      var prevPage = pages[pages.length - 2];
      if (prevPage.data.country == this.data.position) {
        prevPage.setData({
          isFromCitySelect: false
        });
      }else{
        prevPage.setData({
          country: this.data.position,
          ad_code: this.data.position_code,
          isFromCitySelect: true
        });
      }
      wx.navigateBack();
    } else {
      return false;
    }
  },
  singleTap: function singleTap(e) {
    var index = e.detail.index;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      country: this.data.tagsData[index].text,
      isFromCitySelect: true
    });
    wx.navigateBack();
  },
  singleTap1: function singleTap1(e) {
    var index = e.detail.index;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2];
    const code = this.data.tagsData1[index].code;
    prevPage.setData({
      country: this.data.tagsData1[index].text,
      ad_code: code ? code : '',
      isFromCitySelect: true
    });
    wx.navigateBack();
  },
  getPosition: function getPosition() {
    // 实例化API核心类
    var qqmapsdk = new QQMapWX({
      key: 'B45BZ-Q6FW6-U73SF-MFZUS-VNWSO-4TF2Q' // 必填
    });
    var _this = this;
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
            console.log(res.data);
            var position = "";
            if (res.result.ad_info.district) {
              position = res.result.ad_info.district;
            } else {
              position = res.result.ad_info.city;
            }
            _this.setData({
              position: position,
              position_code: res.result.ad_info.adcode,
              isTap: true
            });
          }
        })
      }
    });
  },

  getCountyList: function() {
    var that = this
    const code = that.data.ad_code
    // 实例化API核心类
    var qqmapsdk = new QQMapWX({
      key: 'B45BZ-Q6FW6-U73SF-MFZUS-VNWSO-4TF2Q' // 必填
    });
    qqmapsdk.getDistrictByCityId({
      id: code,
      success: function (res) {
        console.log(res)
        that.setCountyList(res)
      }
    })
  },

  setCountyList: function(res) {
    const resultArray = safeGet(['result'], res)
    const countyList = isNotEmpty(resultArray) ? resultArray[0] : []
    console.log(countyList);
    var jsonArr = new Array();
    for (var i = 0; i < countyList.length; i++) {
      jsonArr.push({
        text: countyList[i].fullname,
        tagStyle: tagStyle
      });
    }
    console.log(jsonArr.length, this.data.tagsData, Math.ceil(jsonArr.length / 4) * 100);
    this.setData({
      tagsData: jsonArr
    })
  },

  navigateBack: function navigateBack() {
    wx.navigateBack();
  },
  onLoad: function onLoad(options) {
    this.getPosition();
    console.log(options, 'options');
    this.setData({
      country: options.country,
      ad_code: options.adcode
    });
  },
  onReady: function onReady(options) {
    this.getCountyList();
  },
  onShowList() {
    if (this.data.selectState === 'summary') {
      this.setData({
        selectState: 'details',
        selectClasss: 'rotate'
      })
    } else {
      this.setData({
        selectState: 'summary',
        selectClasss: ''
      })
    }

    // 用that取代this，防止不必要的情况发生
    var that = this;
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 100,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(-200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 100)
    that.setData({
      showCountyPicker: !this.data.showCountyPicker
    })
  }
});