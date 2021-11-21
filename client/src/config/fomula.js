// 千位數自動補上逗點的函式
export const numDotFormat = (num) => {
  let numStr = num.toString();
  let numArr = [];
  for (let i = numStr.length - 3; i >= 0; i -= 3) {
    numArr.unshift(numStr.substr(i, 3));

    if (i === 2) {
      numArr.unshift(numStr.substr(0, 2));
    } else if (i === 1) {
      numArr.unshift(numStr.substr(0, 1));
    }
  }
  return numArr.join(",");
};
