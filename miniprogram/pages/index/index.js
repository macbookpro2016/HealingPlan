Page({
  data: {
    healingDays: 0,        // 治愈天数
    recordList: [],        // 记录列表
    devMsgExpanded: false  // 开发者寄语是否展开
  },

  onLoad(options) {
    // 使用模拟数据初始化页面
    this.initMockData();
  },

  /**
   * 初始化模拟数据
   */
  initMockData() {
    // 模拟治愈天数（随机7-21天）
    const days = Math.floor(Math.random() * 15) + 7;
    
    // 模拟记录列表（3-8条记录）
    const count = Math.floor(Math.random() * 6) + 3;
    const records = [];
    
    for (let i = 0; i < count; i++) {
      const isCheckIn = Math.random() > 0.5;
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      records.push({
        id: i + 1,
        type: isCheckIn ? 'check_in' : 'diary',
        content: isCheckIn 
          ? '今天状态不错，心情平静了许多，继续加油！' 
          : '今天遇到了一些烦心事，但我试着用积极的心态去面对，感觉好多了。也许明天会更好。',
        createTime: date.getTime(),
        date: this.formatDate(date)
      });
    }
    
    // 更新页面数据
    this.setData({
      healingDays: days,
      recordList: records
    });
  },

  /**
   * 日期格式化
   */
  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${month}月${day}日 ${hours}:${minutes}`;
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
    this.initMockData();
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