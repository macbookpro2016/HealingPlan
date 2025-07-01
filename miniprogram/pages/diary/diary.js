// miniprogram/pages/diaryEdit/diaryEdit.js
Page({
  data: {
    editorContent: '',
    wordCount: 0,
    showToast: false,
    toastMessage: '',
    isSaving: false,
    diaryId: null,
    originalContent: '',
    analysisResult: '情感分析结果将显示在这里...'
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        diaryId: options.id
      });
      this.loadDiary(options.id);
    }
  },

  onReady() {
    this.createSelectorQuery().select('#editor').context(res => {
      this.editorCtx = res.context;
      if (this.data.diaryId) {
        this.setEditorContent(this.data.editorContent);
      }
    }).exec();
  },

  loadDiary(id) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    // 模拟从后端获取日记数据
    setTimeout(() => {
      const mockDiary = {
        content: '<p>今天天气很好，出去散步了一会儿。</p><p><img src="https://example.com/image.jpg" alt="风景"></p><p>感觉好多了，要保持积极心态！</p>'
      };

      this.setData({
        editorContent: mockDiary.content,
        originalContent: mockDiary.content,
        wordCount: this.calculateWordCount(mockDiary.content)
      });

      wx.hideLoading();
    }, 800);
  },

  setEditorContent(htmlContent) {
    if (this.editorCtx && htmlContent) {
      this.editorCtx.setContents({
        html: htmlContent
      });
    }
  },

  onEditorInput(e) {
    const htmlContent = e.detail.html;
    const wordCount = this.calculateWordCount(htmlContent);
    
    this.setData({
      editorContent: htmlContent,
      wordCount: wordCount
    });
  },

  calculateWordCount(html) {
    if (!html) return 0;
    const text = html.replace(/<[^>]+>/g, '');
    return text.length;
  },

  formatText(e) {
    const { name, value } = e.currentTarget.dataset;
    this.editorCtx.format(name, value);
  },

  insertImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        wx.showLoading({
          title: '图片上传中...',
          mask: true
        });

        setTimeout(() => {
          const imageUrl = res.tempFilePaths[0];
          
          this.editorCtx.insertImage({
            src: imageUrl,
            alt: '用户上传的图片',
            success: () => {
              wx.hideLoading();
            }
          });
        }, 1000);
      }
    });
  },

  saveDiary() {
    if (this.data.isSaving) return;
    
    const content = this.data.editorContent;
    
    if (!content) {
      this.showToast('请输入内容');
      return;
    }
    
    this.setData({
      isSaving: true
    });
    
    wx.showLoading({
      title: '保存中...',
      mask: true
    });
    
    // 模拟保存到后端
    setTimeout(() => {
      wx.request({
        // url: 'http://www.catwithpig.fun:8080/api/homeData', // 替换为实际的服务器地址
        url: 'http://localhost:8080/api/saveDiary', // 替换为实际的服务器地址
        method: 'POST',
        data: {
          "type" : 1,
          "content" : content
        },
        success: (res) => {
          if (res.statusCode === 200) {
            const data = res.data;
            this.setData({
              analysisResult: data.analyse,
              isSaving: false
            });
            wx.hideLoading();
            this.showToast('保存成功');
            setTimeout(() => {
              wx.navigateBack();
            }, 1000);
          } else {
            console.error('请求失败，状态码：', res.statusCode);
          }
        },
        fail: (err) => {
          console.error('请求出错：', err);
        }
      });
    }, 1500);
  },

  reset() {
    this.setData({
      analysisResult: '',
      isSaving: false,
    });
    wx.createSelectorQuery().select('#editor').context((res) => {
      const editorCtx = res.context;
      editorCtx.clear({
        success: () => {
          console.log('富文本编辑器内容已重置');
        }
      });
    }).exec();
  },

  showToast(message) {
    this.setData({
      showToast: true,
      toastMessage: message
    });
    
    setTimeout(() => {
      this.setData({
        showToast: false
      });
    }, 2000);
  },

  analyzeEmotion() {
    // 模拟情感分析结果
    this.setData({
      analysisResult: '情感分析结果：积极\n\n详细分析：\n1. 文本整体情绪得分：85%\n2. 关键词：快乐、满足、希望\n3. 建议：继续保持积极心态！'
    });
  }
});

