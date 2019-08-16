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
    url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545394714948&di=86c61a83d1b51b68fbd6f8884c4880e1&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F2f738bd4b31c870173d4b35d2a7f9e2f0708ff2f.jpg'
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
