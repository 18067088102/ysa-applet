// dist/login-sheet/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showMask2: {
      type: Boolean,
      value: true
    },
    positionStyle: {
      type: String | Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //弹窗注册事件
    onRegister() {
      this.setData({
        showMask2: false
      })
      this.triggerEvent('register', {}, {});
    },
    //弹窗登录事件
    onLogin() {
      this.setData({
        showMask2: false
      })
      this.triggerEvent('login', {}, {});
    },
    handleShowMask2: function handleShowMask2(e) {
      var show = e.currentTarget.dataset.show;
      this.setData({
        showMask2: show
      });
    }
  }
})
