// app.ts
interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo; // 用户基本信息（头像、昵称）
    openId?: string;                       // 用户唯一标识
    sessionKey?: string;                   // 会话密钥
    uuid?: string;                      // 开放平台统一标识（需绑定）
    isLoggedIn: boolean;                   // 登录状态
  };
  loginPromise: Promise<void>; // 新增一个 Promise 用于等待登录完成
}

App<IAppOption>({
  globalData: {
    userInfo: undefined,
    openId: undefined,
    sessionKey: undefined,
    uuid: undefined,
    isLoggedIn: false,
    userId: undefined
  },
  loginPromise: Promise.resolve(), // 初始化 Promise

  async onLaunch() {
    // 小程序初始化时执行登录流程
    this.loginPromise = this.login();
  },
  
  // 登录方法
  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          console.log(res)
          if (res.code) {
            // 将 code 发送到后端换取 openId、sessionKey、unionId
            this.getOpenIdFromServer(res.code).then(() => {
              resolve();
            }).catch((err) => {
              reject(err);
            });
          } else {
            console.error('登录失败，获取 code 失败:', res.errMsg);
            wx.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            });
            reject(new Error('登录失败，获取 code 失败'));
          }
        },
        fail: (err) => {
          console.error('登录 API 调用失败:', err);
          wx.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          });
          reject(err);
        }
      });
    });
  },
  
  // 向后端发送 code 获取身份信息
  getOpenIdFromServer(code: string) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://www.localhost:8080/wx/getUserInfo', // 替换为你的后端登录接口
        method: 'POST',
        data: {
          code: code
        },
        success: (res) => {
          console.log(res)
          const data = res.data;
          if (data.data) {
            // 保存后端返回的身份信息到全局变量
            this.globalData.uuid = data.data.uuid;
            this.globalData.userId = data.data.id;
            this.globalData.isLoggedIn = true;
            console.log('uuid:', this.globalData.uuid);
            // 登录成功后可以继续获取用户信息（如果已授权）
            this.getUserInfo();
            resolve();
          } else {
            console.error('获取身份信息失败:', data.message);
            wx.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            });
            reject(new Error('获取身份信息失败'));
          }
        },
        fail: (err) => {
          console.error('请求后端登录接口失败:', err);
          wx.showToast({
            title: '网络错误，请重试',
            icon: 'none'
          });
          reject(err);
        }
      });
    });
  },
  
  // 获取用户信息（需用户授权）
  getUserInfo() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已授权，直接获取用户信息
          wx.getUserInfo({
            success: (res) => {
              this.globalData.userInfo = res.userInfo;
              console.log('用户信息:', this.globalData.userInfo);
            }
          });
        }
      }
    });
  }
});