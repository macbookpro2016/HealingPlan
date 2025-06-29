// miniprogram/pages/diaryEdit/diaryEdit.js
Page({
  data: {
    editorContent: '',
    wordCount: 0,
    showToast: false,
    toastMessage: '',
    isSaving: false,
    diaryId: null,
    originalContent: ''
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
      const saveData = {
        content: content,
      };
      
      // 实际项目中应替换为真实API调用
      
      this.setData({
        isSaving: false
      });
      
      wx.hideLoading();
      this.showToast('保存成功');
      
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    }, 1500);
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
  }
});