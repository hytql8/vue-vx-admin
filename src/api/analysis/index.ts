import { http } from "@/axios"

// analysis信息
const getAnalysisData = async (): Promise<any> => {
  return http.get("/analysis/data")
}

export { getAnalysisData }
