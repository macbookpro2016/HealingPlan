const emotionAnalysis = require("../../utils/emotionAnalysis.js");

Page({
  data: {
    diaryContent: "",
    emotionResult: "",
    suggestion: ""
  },
  handleDiaryInput(e) {
    this.setData({
      diaryContent: e.detail.value
    });
  },
  recordVoice() {
    wx.showToast({
      title: '语音录入功能暂未实现',
      icon: 'none'
    });
  },
  chooseImage() {
    wx.showToast({
      title: '图片上传功能暂未实现',
      icon: 'none'
    });
  },
  saveDiary() {
    const { diaryContent } = this.data;
    if (diaryContent) {
      const result = emotionAnalysis(diaryContent);
      this.setData({
        emotionResult: result.emotion,
        suggestion: result.suggestion
      });
    }
  }
});