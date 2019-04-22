// pages/detail/detail.js
Page({
  data: {
    news: null,
  },

  onLoad(options) {
    const id = options.id;
    this.setData({ id }, this.getNews);
  },

  onPullDownRefresh() {
    this.getNews(() => {
      wx.stopPullDownRefresh();
    })
  },

  getNews(callback) {
    wx.request({
      url: `https://test-miniprogram.com/api/news/detail?id=${this.data.id}`,
      success: res => {
        let news = res.data.result;
        news.displayTime = this.timeDisplay(news.date);
        this.setData({ news });

        callback && callback();
      }
    })
  },

  timeDisplay(datetime) {
    const date = new Date(datetime);
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  },
})