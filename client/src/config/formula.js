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

// mergeSort
const sortTime = (arr1, arr2) => {
  let result = [];
  let i = 0;
  let j = 0;

  while (arr1.length > i && arr2.length > j) {
    if (new Date(arr1[i]) > new Date(arr2[j])) {
      result.push(arr2[j]);
      j++;
    } else if (new Date(arr1[i]) < new Date(arr2[j])) {
      result.push(arr1[i]);
      i++;
    } else if (new Date(arr1[i]) == new Date(arr2[j])) {
      result.push(arr1[i]);
      i++;
    }
  }

  // 如果還有剩
  while (arr1.length > i) {
    result.push(arr1[i]);
    i++;
  }
  while (arr2.length > j) {
    result.push(arr2[j]);
    j++;
  }

  return result;
};

export const mergeSort = (arr) => {
  if (arr.length === 1) return arr;

  let middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, arr.length);

  return sortTime(mergeSort(left), mergeSort(right));
};
