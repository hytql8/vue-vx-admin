import { http } from "@/axios"
import type { UserLoginParams, UserReturns } from "./types"

// login
const getUseTableList = async (data: UserLoginParams): Promise<UserReturns> => {
  return http.post("/user/login", { data })
}

export { getUseTableList }
