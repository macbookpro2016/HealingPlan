Page({
  data: {
    record: {}
  },

  onLoad(options) {
    console.log(options)
    // 模拟根据记录 ID 获取记录详情
    this.setData({
      record: options
    });
    console.log(this.data.record)
  },

  /**
   * 返回首页
   */
  navigateBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});