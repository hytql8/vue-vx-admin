import { http } from "@/axios"
import type { getUseTableListParams, getUseTableListReturns } from "./types"

// 获取useTable list
const getUseTableList = async (data: getUseTableListParams): Promise<getUseTableListReturns> => {
  return http.post("/useTable/list", { data })
}

export { getUseTableList }
