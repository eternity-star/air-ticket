const utils = {
  randomWord (randomFlag, min, max) {
    var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    let pos;
    for (var i = 0; i < range; i++) {
      pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  },
  // 将分钟数量转换为小时和分钟字符串
  toHourMinute (minutes) {
    return (Math.floor(minutes / 60) + "小时" + (minutes % 60) + "分");
    // 也可以转换为json，以方便外部使用
    // return {hour:Math.floor(minutes/60),minute:(minutes%60)};
  },
}

export default utils;
