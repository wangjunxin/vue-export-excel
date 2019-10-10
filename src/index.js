/**
 * 获取微信的初始化参数
 * @param {}
 *    tHeader     导出excel头部名称数组 如['标题','时间']
 *    filterVal   导出excel 对应数据 如['title','time]
 *    format,     字段处理中间件，传入每个item的jsondata
 *    list = [],  列表数据
 *    title       导出的文件名称
 *    merges      单元格合并配置
 */
function formatJson (filterVal, list, format) {
  return list.map(v => {
    if (format && format instanceof Function) {
      v = format(v)
    }
    return filterVal.map(j => {
      return v[j]
    })
  })
}

function formatMerge (list) {
  let merge = []
  list.forEach(item => {
    const mergeItem = {
      s: { c: item[0], r: item[1] },
      e: { c: item[2], r: item[2] }
    }
    merge.push(mergeItem)
  })
  return merge;
}

export function toExcel (params) {
  const {
    tHeader = [], // 导出excel头部名称数组
    filterVal = [], // 导出excel字段数组
    format, // 字段处理中间件，传入每个item的jsondata
    list = [], // 列表数组
    title = '列表',
    merges = []
  } = params
  return import('./Export2Excel').then(excel => {
    const data = formatJson(filterVal, list, format)
    const myDate = new Date()
    const merge = formatMerge(merges)
    excel.export_json_to_excel(
      tHeader,
      data,
      title + (myDate.toLocaleString()),
      merge
    )
  })
}

const install = Vue => {
  Vue.prototype.$toExcel = toExcel
}
export default {
  install
}

