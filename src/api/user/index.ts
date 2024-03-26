import { http } from "@/axios"
import type { UserLoginParams, UserReturns } from "./types"

// 登录
const login = async (data: UserLoginParams): Promise<UserReturns> => {
  return http.post("/user/login", { data })
}
// 退出登录
const outLogin = async (): Promise<any> => {
  return http.get("/user/loginOut")
}
export { login, outLogin }
