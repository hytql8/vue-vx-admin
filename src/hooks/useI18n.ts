import { i18n } from "@/plugins/vueI18n"
//解决element plus内的rule国际化
const getKey = (namespace: string | undefined, key: string) => {
  if (!namespace) {
    return key
  }
  if (key.startsWith(namespace)) {
    return key
  }
  return `${namespace}.${key}`
}

/**
 * @param namespace 指定翻译哪一个模块的，比如common，就只翻译common对象内的字段
 */
export const useI18n = (namespace?: string) => {
  const normalFn = {
    t: (key: string) => {
      return getKey(namespace, key)
    }
  }

  if (!i18n) {
    return normalFn
  }

  const { t, ...methods } = i18n.global

  const tFn: any = (key: string, ...arg: any[]) => {
    if (!key) return ""
    if (!key.includes(".") && !namespace) return key
    return (t as any)(getKey(namespace, key), ...(arg as any))
  }
  return {
    ...methods,
    t: tFn
  }
}
