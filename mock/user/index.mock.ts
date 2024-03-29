import { MockMethod } from "vite-plugin-mock"

const timeout = 1000

const List: any = [
  {
    userId: 0,
    username: "admin",
    password: "admin",
    roleId: 0,
    // 角色
    roles: ["admin"],
    // 权限
    auths: ["create", "read", "update", "delete"],
    sex: 0,
    age: 23,
    nickname: "花子丶"
  },
  {
    userId: 1,
    username: "test",
    password: "test",
    roleId: 1,
    roles: ["user", "test"],
    auths: ["read"],
    sex: 1,
    age: 24,
    nickname: "测试用户"
  }
]

const arr: any = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: "layout",
    meta: {
      title: "routes.dashboard",
      icon: "ri:dashboard-line"
    },
    children: [
      {
        path: "workplace",
        name: "Workplace",
        component: "/views/Dashboard/Workplace",
        meta: {
          title: "routes.workplace",
          icon: "bx:bxs-briefcase-alt-2"
        }
      },
      {
        path: "analysis",
        name: "Analysis",
        component: "/views/Dashboard/Analysis",
        meta: {
          title: "routes.analysis",
          icon: "ri:line-chart-line"
        }
      }
    ]
  },
  {
    path: "/component",
    name: "Component",
    component: "layout",
    meta: {
      title: "routes.component",
      icon: "mingcute:components-fill"
    },
    children: [
      {
        path: "table",
        name: "Table",
        component: "secLayout",
        meta: {
          title: "routes.table",
          icon: "mdi:table-edit"
        },
        children: [
          {
            path: "default-table",
            name: "DefaultTable",
            component: "/views/Component/Table/DefaultTable",
            meta: {
              title: "routes.defaultTable"
            }
          },
          {
            path: "use-table",
            name: "UseTable",
            component: "/views/Component/Table/UseTable",
            meta: {
              title: "routes.useTable"
            }
          },
          {
            path: "vxe-table",
            name: "VxeTable",
            component: "/views/Component/Table/VxeTable",
            meta: {
              title: "routes.VxeTable"
            }
          }
        ]
      },
      {
        path: "form",
        name: "Form",
        component: "secLayout",
        meta: {
          title: "routes.form",
          icon: "clarity:form-line"
        },
        children: [
          {
            path: "default-form",
            name: "DefaultForm",
            component: "/views/Component/Form/DefaultForm",
            meta: {
              title: "routes.defaultForm"
            }
          },
          {
            path: "use-form",
            name: "UseForm",
            component: "/views/Component/Form/UseForm",
            meta: {
              title: "routes.useForm"
            }
          }
        ]
      },
      {
        path: "charts",
        name: "Charts",
        component: "/views/Component/Echarts/Echarts",
        meta: {
          title: "routes.chart",
          icon: "solar:chart-2-bold-duotone"
        }
      }
    ]
  },
  {
    path: "/authority",
    name: "Authority",
    component: "layout",
    meta: {
      title: "routes.authority",
      icon: "material-symbols-light:lock-person"
    },
    children: [
      {
        path: "buttonPermissions",
        name: "ButtonPermissions",
        component: "/views/Authority/ButtonPermissions",
        meta: {
          title: "routes.btnPerm"
        }
      }
    ]
  },
  {
    path: "/system",
    name: "System",
    component: "layout",
    meta: {
      title: "routes.system",
      icon: "ri:settings-3-line",
      role: ["admin"]
    },
    children: [
      {
        path: "user",
        name: "User",
        component: "/views/System/User",
        meta: {
          title: "routes.user",
          icon: "mdi:account"
        }
      },
      {
        path: "role",
        name: "Role",
        component: "/views/System/Role",
        meta: {
          title: "routes.role",
          icon: "mdi:account-group"
        }
      },
      {
        path: "menu",
        name: "Menu",
        component: "/views/System/Menu",
        meta: {
          title: "routes.menu",
          icon: "mdi:menu"
        }
      }
    ]
  }
]

export default [
  // 列表接口
  {
    url: "/user/list",
    method: "get",
    response: ({ query }) => {
      const { username, page, pageSize } = query
      const mockList = List.filter(item => {
        if (username && item.username.indexOf(username) < 0) return false
        return true
      })
      const pageList = mockList.filter((_, index) => index < pageSize * page && index >= pageSize * (page - 1))

      return {
        data: {
          code: 200,
          data: {
            total: mockList.length,
            list: pageList
          }
        }
      }
    }
  },
  // 登录接口
  {
    url: "/user/login",
    method: "post",
    timeout,
    response: ({ body }) => {
      const data = body
      let hasUser = false
      for (const user of List) {
        if (user.username === data.username && user.password === data.password) {
          hasUser = true
          user.routers = arr
          return {
            data: {
              code: 200,
              data: user
            }
          }
        }
      }
      if (!hasUser) {
        return {
          code: 500,
          message: "账号或密码错误"
        }
      }
    }
  },
  // 退出接口
  {
    url: "/user/loginOut",
    method: "get",
    timeout,
    response: () => {
      return {
        data: {
          code: 200,
          data: null
        }
      }
    }
  }
] as MockMethod[]
