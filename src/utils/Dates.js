const Dates = {
  remainingTime(m, neg) {
    if (m < 1 && !neg) {
      m = 0;
    }
    let d = {};
    m = parseInt(m, 10);
    d.milliseconds = m % 1000;
    m = parseInt(m / 1000, 10);
    d.seconds = m % 60;
    m = parseInt(m / 60, 10);
    d.minutes = m % 60;
    m = parseInt(m / 60, 10);
    d.hours = m % 24;
    d.day = parseInt(m / 24, 10);
    return d;
  },
  format(date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
    const o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
};
module.exports = Dates;
