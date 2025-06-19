Page({
  onLoad() {
    this.initWaterBallAnimation();
  },

  initWaterBallAnimation() {
    const ctx = wx.createCanvasContext('waterBall');
    let waveY = 80rpx; // 水球液面初始位置
    
    // 模拟水球波动动画（简化版）
    setInterval(() => {
      waveY = (waveY + 10) % 160; // 上下波动10rpx
      ctx.clearRect(0, 0, 160, 160);
      
      // 绘制水球液面
      ctx.beginPath();
      ctx.arc(80, waveY, 70, 0, 2 * Math.PI);
      ctx.setFillStyle('rgba(255, 255, 255, 0.3)');
      ctx.fill();
      
      ctx.draw();
    }, 100);
  }
});