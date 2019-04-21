Page({
  data: {
    categories: [
      { name: "国内", type: "gn" },
      { name: "国际", type: "gj" },
      { name: "财经", type: "cj" },
      { name: "娱乐", type: "yl" },
      { name: "军事", type: "js" },
      { name: "体育", type: "ty" },
      { name: "其他", type: "other" }
    ],
    activeCategory: "gn",
    hottestNews: null,
    news: []   
  },

  onLoad() {
    this.getNews();
  },

  onPullDownRefresh() {
    this.getNews(() => {
      wx.stopPullDownRefresh();
    });
  },

  getNews(callback) {
    wx.request({
      url: `https://test-miniprogram.com/api/news/list?type=${this.data.activeCategory}`,
      success: res => {
        let news = res.data.result;
        news.forEach((newsItem) => {
          newsItem.displayTime = this.timeDisplay(newsItem.date);
        });
        const hottestNews = news.splice(0, 1)[0];
        this.setData({ hottestNews, news });

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

  selectCategory(event) {
    const selectedCategory = event.target.dataset.category;
    this.setData({ activeCategory: selectedCategory });
    this.getNews();
  },

  onTapNews(event) {
    const selectedId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${selectedId}`,
    });
  }
})