// 修改全局变量方法
export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}
// 将驼峰css变量转换为普通格式css变量 例如：elPrimaryColor --> --el-primary-color
export const toCssVariable = (variable: string): string => {
  return `--${variable.replace(/[A-Z]/g, "-$&").toLowerCase()}`
}
// 静态资源路径转换（生产环境不生效，暂时弃用）
export const getStaticSource = (sourceUrl: string): string | undefined => {
  // 当前import.meta.url是当前index.ts的路径，需要提取此url src及以前的部分
  const parseUrl = new URL(import.meta.url)

  const baseUrl = parseUrl.origin + parseUrl.pathname.split("/src")[0]

  // 正则表达式匹配规则
  const regex: RegExp = /^(@\/|\.{0,2}\/|[a-zA-Z]+:\/\/).+\.(jpg|jpeg|png|gif)$/

  if (regex.test(sourceUrl)) {
    return new URL(sourceUrl.replace("@/", "src/"), baseUrl).href
  }

  return void 0
}

// Map 数据结构转obj
export const transMapToObject = (map: Map<string, any>) => {
  const target = {} as Recordable
  map.forEach((value, key) => {
    target[key] = value
  })
  return target
}

// 刷新页面
export const reload = () => {
  window.location.reload()
}
// 驼峰转横杠
export const humpToDash = (str: string): string => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase()
}
// 首字母大写
export function firstUpperCase(str: string) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

/**
 * 查找数组对象的某个下标
 * @param {Array} ary 查找的数组
 * @param {Functon} fn 判断的方法
 */
export const findIndex = <T = Recordable>(ary: Array<T>, fn: Fn): number => {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  let index = -1
  ary.some((item: T, i: number, ary: Array<T>) => {
    const ret: T = fn(item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  return index
}
