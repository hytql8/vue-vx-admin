import { http } from "@/axios"
import type { UserLoginParams, UserReturns, UserListParams, getRoleListParams, RoleReturns } from "./types"

// 登录
const login = async (data: UserLoginParams): Promise<UserReturns> => {
  return http.post("/user/login", { data })
}
// 获取用户列表
const userList = async (params: UserListParams): Promise<UserReturns> => {
  return http.get("/user/list", { params })
}
// 获取权限列表
const roleList = async (data: getRoleListParams): Promise<RoleReturns> => {
  return http.post("/user/role", { data })
}
// 退出登录
const outLogin = async (): Promise<any> => {
  return http.get("/user/loginOut")
}
export { login, userList, roleList, outLogin }
