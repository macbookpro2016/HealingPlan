const app = getApp();
Page({
  data: {
    healingDays: 0,        // 治愈天数
    recordList: [],        // 记录列表
    devMsgExpanded: false  // 开发者寄语是否展开
  },

  onLoad(options) {
    // 调用获取首页数据的方法
    this.fetchHomeData();
    console.log("onload")
    console.log(app.globalData.uuid)
  },

  /**
   * 获取首页数据
   */
  fetchHomeData() {
    console.log('111')
    wx.request({
      // url: 'http://www.catwithpig.fun:8080/api/homeData', // 替换为实际的服务器地址
      url: 'http://localhost:8080/api/homeData', // 替换为实际的服务器地址
      method: 'GET',
      data: {
        uid:1
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const data = res.data;
          this.setData({
            healingDays: data.healingDays,
            recordList: data.recordList
          });
        } else {
          console.error('请求失败，状态码：', res.statusCode);
        }
      },
      fail: (err) => {
        console.error('请求出错：', err);
      }
    });
  },

  /**
   * 切换开发者寄语展开/折叠状态
   */
  toggleDevMsg() {
    // 添加简单的动画效果
    const currentStatus = this.data.devMsgExpanded;

    // 切换状态
    this.setData({
      devMsgExpanded: !currentStatus
    });
  },

  /**
   * 下拉刷新（使用模拟数据）
   */
  onPullDownRefresh() {
    this.fetchHomeData();
    wx.stopPullDownRefresh();
  },

  /**
   * 点击添加记录（示例）
   */
  onAddRecord() {
    wx.navigateTo({
      url: '/pages/addRecord/addRecord'
    });
  }
});