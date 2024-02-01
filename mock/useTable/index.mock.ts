import { MockMethod } from "vite-plugin-mock"
import Mock from "mockjs"
Mock.setup({
  timeout: "1500-3000"
})
export default [
  // useTable list数据
  {
    url: "/userTable/list",
    method: "post",
    response: () => {
      // 使用 Mock.js 生成虚拟数据
      const data = Mock.mock({
        "list|50": [
          {
            "id|+1": 10000,
            name: () => Mock.Random.cname(),
            "role|1": ["Develop", "Test", "PM"],
            "sex|1": ["Man", "Women"],
            "age|20-40": 1,
            address: () => Mock.Random.county(true)
          }
        ]
      })

      return {
        data: {
          code: 200,
          data: {
            total: data.list.length,
            list: data.list
          }
        }
      }
    }
  }
] as MockMethod[]
