import { useStorage } from "@/hooks/useStorage"
import { isArray, isString } from "@/utils/is"

const { getStorage } = useStorage("localStorage")

const { auths } = getStorage("user")
console.log(auths, "当前用户的权限")
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
