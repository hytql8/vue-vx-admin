import { MockMethod } from "vite-plugin-mock"
import Mock from "mockjs"
import { resultPageSuccess } from "../utils"

const demoList = (() => {
  const result: any[] = []
  for (let index = 0; index < 60; index++) {
    result.push({
      id: index + 1,
      name: () => Mock.Random.cname(),
      "role|1": ["Develop", "Test", "PM"],
      "sex|1": ["Man", "Women"],
      "age|20-40": 1,
      address: () => Mock.Random.county(true)
    })
  }
  return result
})()

export default [
  {
    url: "/useTable/list",
    timeout: 2000,
    method: "post",
    response: ({ body }) => {
      const { page = 1, pageSize = 10 } = body

      return resultPageSuccess(page, pageSize, demoList)
    }
  }
] as MockMethod[]
