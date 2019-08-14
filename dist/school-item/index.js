// dist/school-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    school: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545394714951&di=0df91c74d1257ddd07776e1c91d4101c&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F960a304e251f95caf1852c0bc4177f3e6709521e.jpg'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLivePlayer() {
      const companyId = this.properties.school.id
      const name = this.properties.school.name
      wx.navigateTo({
        url: `/pages/livePlayer/livePlayer?companyId=${companyId}&name=${name}`
      })
    }
  }
})
