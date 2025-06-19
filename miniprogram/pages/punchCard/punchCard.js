Page({
  data: {
    punchList: [
      { id: 1, name: "散步", checked: false },
      { id: 2, name: "绘画", checked: false },
      { id: 3, name: "学习英语", checked: false }
    ],
    showReward: false,
    rewardName: "",
    rewardIcon: ""
  },
  handleCheckboxChange(e) {
    const { id } = e.currentTarget.dataset;
    const { punchList } = this.data;
    punchList.forEach(item => {
      if (item.id === id) {
        item.checked =!item.checked;
      }
    });
    this.setData({
      punchList
    });
  },
  submitPunch() {
    const { punchList } = this.data;
    const checkedItems = punchList.filter(item => item.checked);
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