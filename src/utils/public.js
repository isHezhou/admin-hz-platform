/**
 * 将接口返回的数组结构的数据转化为树形结构
 */
import * as CryptoJS from 'crypto-js'

/**
 * 将接口返回的数组结构的数据转化为树型结构
 */
export const arrayToTree = (array, targetField) => {
  const nodes = []
  // 获取顶级节点`
  for (let i = 0; i < array.length; i++) {
    const row = array[i]
    if (!exists(array, row.parentId)) {
      nodes.push({
        label: row[targetField],
        id: row.id
      })
    }
  }
  const toDo = Array.from(nodes)
  while (toDo.length) {
    const node = toDo.shift()
    // 获取子节点
    for (let i = 0; i < array.length; i++) {
      const row = array[i]
      if (row.parentId === node.id) {
        const child = {
          label: row[targetField],
          id: row.id
        }
        if (node.children) {
          node.children.push(child)
        } else {
          node.children = [child]
        }
        toDo.push(child)
      }
    }
  }
  return nodes
}

const exists = (rows, parentId) => {
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].id === parentId) return true
  }
  return false
}

/**
 * 将数组结构数据按照指定字段转化成对象结构
 */
export const arrayToMap = (arr, targetField) => {
  const map = {}
  const t = targetField
  if (arr instanceof Array) {
    arr.forEach(function(item) {
      if (!map[item[t]]) {
        map[item[t]] = []
      }
    })
    for (const p in map) {
      arr.forEach(function(item) {
        if (p === item[t] + '') {
          map[p].push(item)
        }
      })
    }
  }
  return map
}

/**
 * 将数组结构数据按照指定字段转化成对象结构
 */
export const arrayToMapField = (arr, targetField, itemField) => {
  const map = {}
  const t = targetField
  if (arr instanceof Array) {
    arr.forEach(function(item) {
      if (!map[item[t]]) {
        map[item[t]] = ''
      }
    })
    for (const p in map) {
      arr.forEach(function(item) {
        if (p === item[t]) {
          map[p] = item[itemField]
        }
      })
    }
  }
  return map
}
// 定义一个深拷贝函数  接收目标target参数
export const deepClone = (target) => {
  // 定义一个变量
  let result
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      for (const i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (const i in target) {
        result[i] = deepClone(target[i])
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target
  }
  // 返回最终结果
  return result
}
/**
 * 打开窗口
 * @param {Sting} url
 * @param {Sting} title
 * @param {Number} w
 * @param {Number} h
 */
export const openWindow = (url, title, w, h) => {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

  const left = ((width / 2) - (w / 2)) + dualScreenLeft
  const top = ((height / 2) - (h / 2)) + dualScreenTop
  const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
}
/**
 *加密处理
 */
export const encryption = (params) => {
  // eslint-disable-next-line prefer-const
  let { data, type, param, key } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach(ele => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(
        data,
        key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.ZeroPadding
        })
      result[ele] = encrypted.toString()
    })
  }
  return result
}
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = new Date().getTime().toString()
  if (date) random = random + Date.now()
  return random
}
/**
 * 表单序列化
 * @param data
 * @returns {string}
 */
export const serialize = data => {
  const list = []
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}

/**
 * 查询对象转查询字符串
 * @param obj
 */
export const queryToString = (obj) => {
  const qs = []
  if (obj instanceof Object) {
    for (const key in obj) {
      if (obj[key]) {
        qs.push(key + '=' + obj[key])
      }
    }
  }
  return qs.join(';')
}
/**
 * 计算表格总体高度
 * @param obj
 *   dom: 当前元素距离视口绝对高度
 *   pagination： 分页容器高度
 *   marginTop:分页容器marginTop
 *   otherNumber: 其他高度值之和
 *
 * @returns {number}
 */
export const getOffsetTop = (obj) => {
  const self = obj.self
  let pagination = null
  if (self.$refs['el-pagination']) {
    pagination = self.$refs['el-pagination'].$el
    pagination.style.display = 'block'
  }
  const clientHeight = document.documentElement.clientHeight
  const marginTop = obj.marginTop || 5
  const otherNumber = obj.otherNumber || 0
  const otherHeightSum = pagination ? pagination.clientHeight + otherNumber : marginTop + otherNumber
  if (!self.$refs['el-table']) {
    return 0
  }
  let table = self.$refs['el-table'].$el
  let iTop = table.offsetTop
  while (table.offsetParent) {
    table = table.offsetParent
    iTop += table.offsetTop
  }
  const height = clientHeight - (iTop + otherHeightSum)
  return height
}
/**
 * 计算容器高度 (动态的  )
 * @param obj
 *   dom: 当前元素距离视口绝对高度
 *   pagination： 分页容器高度
 *   marginTop:分页容器marginTop
 *   otherNumber: 其他高度值之和
 *
 * @returns {number}
 */
export const getOffsetTopOther = (obj) => {
  const self = obj.self
  const refTable = obj.refTable
	const refPage = obj.refPage
  let pagination = null
  if (self.$refs[refPage]) {
    pagination = self.$refs[refPage].$el?self.$refs[refPage].$el:self.$refs[refPage]
    pagination.style.display = 'block'
  }
  const clientHeight = document.documentElement.clientHeight
  const marginTop = obj.marginTop || 5
  const otherNumber = obj.otherNumber || 0
  const otherHeightSum = pagination ? pagination.clientHeight + otherNumber : marginTop + otherNumber
  if (!self.$refs[refTable]) {
    return 0
  }
  // console.log('ref',self)
  let table = self.$refs[refTable].$el?self.$refs[refTable].$el:self.$refs[refTable]
  let iTop = table.offsetTop
  while (table.offsetParent) {
    table = table.offsetParent
    iTop += table.offsetTop
  }
  const height = clientHeight - (iTop + otherHeightSum)
  // console.log('height',height)
  return height
}
//
export const arrayToTreeList = datas => {
  const arr = Object.assign([], datas)
  for (const item of arr) {
    item.label = item.name
    if (item.children && item.children.length > 0) {
      arrayToTreeList(item.children)
    }
  }
  return arr
}

/**
 * 日期格式化
 * dateFormat("YYYY-mm-dd HH:MM:SS", date)
 * */
export const dateFormat = (format, date) => {
  if (!date) {
    return
  }
  const option = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const key in option) {
    const ret = new RegExp('(' + key + ')').exec(format)
    if (ret) {
      format = format.replace(ret[1], (ret[1].length === 1) ? (option[key]) : (option[key].padStart(ret[1].length, '0')))
    }
  }
  return format
}

export const getAccessFn = function(btnName) {
  this.$route.meta.buttons.includes(btnName)
}

/**
 * array转为元素以 ',' 分隔的字符串
 */
export function  getArrayToStrByComma(ary) {
  if(ary != null){
    let str = ''
    //循环数组
    for ( let i = 0; i <ary.length; i++){
      if(i===0){
        str += ary[i]
      }else {
        str += ',' + ary[i]
      }
    }
    return str
  }
  return null
}

/**
 * 字符串转为数组以 ',' 为 数组分隔的元素
 */
export function  getStrToArrayByComma(str) {
  if(str != null && str != '') {
    let array = []
    array = str.split(',')
    return array
  }
  return []
}

/**
 * 树结构转化，例如级联中
 * @param params
 *  list: data,           // 将原始数组参数穿进去
 *  labelFiled: 'catname',// 我们想要的 label 字段名为 catname
 *  valueFiled: 'catid'   // 我们想要的 value 字段名为 catid
 *  children: 'children'   // 我们想要的 value 字段名为 children
 *
 * @returns makeTree(pid, list)
 */
export function makeElementTree(params) {
  // 将参数拿出来，不喜欢 params.xxx 的调用方式
  const { list, labelFiled, valueFiled, children } = params
  const treeList = []
  if(!list){
    return treeList
  }
  list.map(item=>{
    const treeItem = {
      label: item[labelFiled],
      value: item[valueFiled]
    }
    if(item[children] && item[children].length > 0){
      treeItem.children = makeElementTree({
        list: item[children],       // 将原始数组参数穿进去
        labelFiled: labelFiled,   // 我们想要的 label 字段名为 name
        valueFiled: valueFiled,     // 我们想要的 value 字段名为 id
        children: children // 我们想要的 children 字段名为 childList
       })
    }
    treeList.push(treeItem)
  })
  return treeList
}
