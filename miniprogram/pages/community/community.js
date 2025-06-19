Page({
  data: {
    communityTabs: [
      { id: 1, name: "倾诉区" },
      { id: 2, name: "互助区" },
      { id: 3, name: "经验分享区" }
    ],
    communityContents: [
      { id: 1, title: "好难过，分手了", content: "今天分手了，心里好难受...", likeCount: 0, commentCount: 0 },
      { id: 2, title: "怎么放下前任", content: "已经分手一个月了，还是忘不了他，怎么办？", likeCount: 0, commentCount: 0 }
    ],
    activeIndex: 0
  },
  switchTab(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      activeIndex: index
    });
  },
  likePost() {
    wx.showToast({
      title: '点赞成功',
      icon: 'none'
    });
  },
  commentPost() {
    wx.showToast({
      title: '评论功能暂未实现',
      icon: 'none'
    });
  }
});