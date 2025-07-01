Page({
  data: {
    messages: [],
    inputValue: '',
    scrollTop: 0,
    loading: false,
    lastMessageId: null
  },

  onLoad: function() {
    this.addMessage({
      content: "你好！我是AI助手，有什么可以帮你的吗？",
      isUser: false,
      time: this.formatTime(new Date())
    });
  },

  onInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  sendMessage: function() {
    const inputValue = this.data.inputValue.trim();
    if (!inputValue) return;
    
    const now = new Date();
    const time = this.formatTime(now);
    const messageId = Date.now();
    
    // 添加用户消息
    this.addMessage({
      id: messageId,
      content: inputValue,
      isUser: true,
      time: time
    });
    
    // 清空输入框，显示加载状态
    this.setData({
      inputValue: '',
      loading: true,
      lastMessageId: messageId
    });
    
    // 调用模拟API
    this.callAIAPI(inputValue, messageId);
  },

  addMessage: function(message) {
    const messages = this.data.messages.concat([message]);
    this.setData({
      messages: messages,
      scrollTop: 999999
    });
  },

  // 模拟调用AI API（固定返回"AI回复"）
  callAIAPI: function(userInput, messageId) {
    // 显示加载提示
    wx.showLoading({
      title: '思考中...',
      mask: true
    });
    
    // 模拟网络延迟（800-1200ms随机）
    const delay = 800 + Math.floor(Math.random() * 400);
    
    setTimeout(() => {
      wx.hideLoading();
      
      // 固定返回"AI回复"
      const response = "AI回复";
      
      // 添加AI回复消息
      this.addMessage({
        id: Date.now(),
        content: response,
        isUser: false,
        time: this.formatTime(new Date())
      });
      
      // 结束加载状态
      this.setData({
        loading: false
      });
      
    }, delay);
  },

  // 格式化时间
  formatTime: function(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour}:${minute < 10 ? '0' + minute : minute}`;
  }
});