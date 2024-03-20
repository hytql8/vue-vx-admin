import { MockMethod } from "vite-plugin-mock"

const timeout = 500

const List: any = {
  jingangDistrict: [
    {
      name: "Project",
      num: "932",
      icon: "ant-design:project-filled",
      color: "#F07758"
    },
    {
      name: "Inquiries",
      num: "1032",
      icon: "icon-park-outline:history-query",
      color: "#3CC2E0"
    },
    {
      name: "Invesment",
      num: "102K",
      icon: "octicon:project-symlink-16",
      color: "#7D6AEB"
    },
    {
      name: "Assets",
      num: "32K",
      icon: "fa-solid:project-diagram",
      color: "#FF626D"
    }
  ],
  projectStatistic: {
    xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    yAxis1: [20, 39, 18, 70, 62, 58, 69],
    yAxis2: [40, 50, 62, 52, 21, 18, 69]
  },
  email: [
    {
      value: 763,
      name: "Primary"
    },
    {
      value: 321,
      name: "Promotion"
    },
    {
      value: 69,
      name: "Forum"
    },
    {
      value: 154,
      name: "Socias"
    }
  ],
  statistic: {
    xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    yAxis1: [312, 589, 438, 721, 654, 876, 543],
    yAxis2: [187, 496, 843, 519, 624, 357, 962]
  },
  serverStatus: {
    progress: [
      {
        id: 2,
        color: "#fe606b",
        title: "Mon",
        percentage: 63
      },
      {
        id: 3,
        color: "#4cbb9a",
        title: "Tue",
        percentage: 37
      },
      {
        id: 4,
        color: "#4cbb9a",
        title: "Wed",
        percentage: 55
      },
      {
        id: 5,
        color: "#ecc567",
        title: "Thu",
        percentage: 99
      },
      {
        id: 6,
        color: "#fd606b",
        title: "Fri",
        percentage: 80
      }
    ],
    statistics: [
      {
        title: "Active Users",
        value: 15
      },
      {
        title: "Active Group",
        value: 23
      },
      {
        title: "Active Member",
        value: 50
      }
    ]
  },
  marketPreviews: [
    { title: "LTC/USD", color: "#f0c868", time: "March", increase: 1.24, num: 120.45 },
    { title: "BTC/USD", color: "#ef6e4d", time: "January", increase: -1.27, num: 149.45 },
    { title: "ETH/USD", color: "#ff606b", time: "January", increase: 1.43, num: 185.5 },
    { title: "RPL/USD", color: "#ff606b", time: "January", increase: -2.32, num: 114.35 }
  ],
  project: {
    progress: [
      {
        color: "#7d6aea",
        title: "Mon",
        percentage: 33,
        times: 17
      },
      {
        color: "#ee6e4e",
        title: "Tue",
        percentage: 65,
        times: 32
      },
      {
        color: "#3dc1df",
        title: "Wed",
        percentage: 55,
        times: 67
      },
      {
        color: "#ecc567",
        title: "Thu",
        percentage: 99,
        times: 55
      },
      {
        color: "#fd606b",
        title: "Fri",
        percentage: 37,
        times: 89
      }
    ],
    tags: [
      { type: "", value: "#JavaScript" },
      { type: "success", value: "#Vue" },
      { type: "", value: "#React" },
      { type: "", value: "#TypeScript" },
      { type: "", value: "#Vueuse" }
    ]
  }
}

export default [
  // worksplace数据接口
  {
    url: "/analysis/data",
    method: "get",
    timeout,
    response: () => {
      return {
        data: {
          code: 200,
          data: {
            list: List
          }
        }
      }
    }
  }
] as MockMethod[]
