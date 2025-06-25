Page({
  data: {
    punchList: [
      { id: 1, name: "散步", checkedTimes: 0, slideOffset: 0, isClicking: false },
      { id: 2, name: "绘画", checkedTimes: 0, slideOffset: 0, isClicking: false },
      { id: 3, name: "学习英语", checkedTimes: 0, slideOffset: 0, isClicking: false }
    ],
    newPunchName: "",
    suggestionList: ["冥想", "瑜伽", "阅读"],
    showReward: false,
    rewardName: "",
    rewardIcon: ""
  },

  // 处理输入框输入变化
  handleInputChange(e) {
    this.setData({
      newPunchName: e.detail.value
    });
  },

  // 创建打卡项
  createPunch() {
    const { punchList, newPunchName } = this.data;
    if (newPunchName) {
      const newId = punchList.length > 0 ? punchList[punchList.length - 1].id + 1 : 1;
      punchList.push({
        id: newId,
        name: newPunchName,
        checkedTimes: 0,
        slideOffset: 0,
        isClicking: false
      });
      this.setData({
        punchList,
        newPunchName: ""
      });
    }
  },

  // 快速创建打卡项
  quickCreatePunch(e) {
    const { punchList } = this.data;
    const suggestion = e.currentTarget.dataset.item;
    const newId = punchList.length > 0 ? punchList[punchList.length - 1].id + 1 : 1;
    const newPunch = {
      id: newId,
      name: suggestion,
      checkedTimes: 0,
      slideOffset: 0,
      isClicking: false
    };
    punchList.push(newPunch);
    this.setData({
      punchList
    });
  },

  // 点击 +1 按钮增加打卡次数
  addCheckTime(e) {
    const { index } = e.currentTarget.dataset;
    const { punchList } = this.data;
    if (punchList[index].isClicking) return;

    punchList[index].isClicking = true;
    punchList[index].checkedTimes++;
    this.setData({
      punchList
    });
    wx.showToast({
      title: '已完成一次打卡',
      icon: 'success',
      duration: 1500
    });

    setTimeout(() => {
      punchList[index].isClicking = false;
      this.setData({
        punchList
      });
    }, 1000);
  },

  // 左滑开始
  touchStart(e) {
    const { index } = e.currentTarget.dataset;
    const { punchList } = this.data;
    punchList[index].startX = e.touches[0].clientX;
    this.setData({
      punchList
    });
  },

  // 左滑移动
  touchMove(e) {
    const { index } = e.currentTarget.dataset;
    const { punchList } = this.data;
    const currentX = e.touches[0].clientX;
    const disX = punchList[index].startX - currentX;
    let slideOffset = 0;
    if (disX > 0) {
      slideOffset = -Math.min(disX, 100);
    }
    punchList[index].slideOffset = slideOffset;
    this.setData({
      punchList
    });
  },

  // 左滑结束
  touchEnd(e) {
    const { index } = e.currentTarget.dataset;
    const { punchList } = this.data;
    const slideOffset = punchList[index].slideOffset;
    if (slideOffset < -50) {
      punchList[index].slideOffset = -100;
    } else {
      punchList[index].slideOffset = 0;
    }
    this.setData({
      punchList
    });
  },

  // 删除打卡项
  deletePunch(e) {
    const { index } = e.currentTarget.dataset;
    const { punchList } = this.data;
    punchList.splice(index, 1);
    this.setData({
      punchList
    });
  },

  // 提交打卡
  submitPunch() {
    const { punchList } = this.data;
    const checkedItems = punchList.filter(item => item.checkedTimes > 0);
    if (checkedItems.length > 0) {
      const rewards = [
        { name: "坚强勋章", icon: "images/medal.png" },
        { name: "成长之星", icon: "images/star.png" }
      ];
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      this.setData({
        showReward: true,
        rewardName: randomReward.name,
        rewardIcon: randomReward.icon
      });
    }
  }
});