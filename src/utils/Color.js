/**
 * 获取随机颜色
 */

const rgbaColor = (alpha) => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  if (alpha) {
    return 'rgba(' + r + ',' + g + ',' + b + `,${alpha})`
  }
  return 'rgba(' + r + ',' + g + ',' + b + ',0.6)'
}

const hexadecimalColor = () => {
  let str = '#'
  // 一个十六进制的值的数组
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
  for (let i = 0; i < 6; i++) {
    // 产生的每个随机数都是一个索引,根据索引找到数组中对应的值,拼接到一起
    const num = parseInt(Math.random() * 16)
    str += arr[num]
  }
  return str
}


export {
  rgbaColor,
  hexadecimalColor
}
