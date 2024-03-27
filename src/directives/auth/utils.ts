import { useStorage } from "@/hooks/useStorage"
import { isArray, isString } from "@/utils/is"

const { getStorage } = useStorage("localStorage")
// 设置默认权限，默认仅有读的权限，实际应该更改
const { auths } = getStorage("user") ?? {
  auths: ["read"]
}
export const hasAuth = (auth: string[] | string) => {
  console.log(auth, "当前按钮需要的权限")
  if (isArray(auth)) {
    for (let v of auth) {
      return auths ? auths.includes(v) : false
    }
  } else if (isString(auth)) {
    return auths ? auths.includes[auth] : false
  }
  return false
}
