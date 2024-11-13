import { MockMethod } from "vite-plugin-mock"

const timeout = 500

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

let roleList = [
  {
    roleId: 0,
    role: "admin",
    remark: "管理员,拥有一系列权限",
    createTime: "2024-03-29",
    roleName: "管理员"
  },
  {
    roleId: 1,
    role: "test",
    remark: "测试用户,拥有一系列权限",
    createTime: "2024-03-29",
    roleName: "测试用户"
  },
  {
    roleId: 2,
    role: "user",
    remark: "普通用户,拥有一系列权限",
    createTime: "2024-03-29",
    roleName: "普通用户"
  },
  {
    roleId: 3,
    role: "manager",
    remark: "项目经理,拥有项目管理权限",
    createTime: "2024-04-01",
    roleName: "项目经理"
  },
  {
    roleId: 4,
    role: "editor",
    remark: "编辑,拥有内容编辑权限",
    createTime: "2024-04-05",
    roleName: "编辑"
  },
  {
    roleId: 5,
    role: "viewer",
    remark: "查看者,只能查看数据",
    createTime: "2024-04-10",
    roleName: "查看者"
  },
  {
    roleId: 6,
    role: "developer",
    remark: "开发者,拥有开发权限",
    createTime: "2024-04-12",
    roleName: "开发者"
  },
  {
    roleId: 7,
    role: "designer",
    remark: "设计师,负责界面设计",
    createTime: "2024-04-14",
    roleName: "设计师"
  },
  {
    roleId: 8,
    role: "hr",
    remark: "人力资源,负责员工管理",
    createTime: "2024-04-16",
    roleName: "人力资源"
  },
  {
    roleId: 9,
    role: "support",
    remark: "技术支持,为用户提供帮助",
    createTime: "2024-04-18",
    roleName: "技术支持"
  },
  {
    roleId: 10,
    role: "sales",
    remark: "销售,负责公司产品销售",
    createTime: "2024-04-20",
    roleName: "销售"
  },
  {
    roleId: 11,
    role: "analyst",
    remark: "数据分析师,负责数据分析",
    createTime: "2024-04-22",
    roleName: "数据分析师"
  },
  {
    roleId: 12,
    role: "marketing",
    remark: "市场营销,负责市场推广",
    createTime: "2024-04-24",
    roleName: "市场营销"
  },
  {
    roleId: 13,
    role: "accountant",
    remark: "会计,负责公司财务管理",
    createTime: "2024-04-26",
    roleName: "会计"
  },
  {
    roleId: 14,
    role: "quality",
    remark: "质量检查员,负责产品质量控制",
    createTime: "2024-04-28",
    roleName: "质量检查员"
  },
  {
    roleId: 15,
    role: "security",
    remark: "安全管理员,负责系统安全",
    createTime: "2024-04-30",
    roleName: "安全管理员"
  },
  {
    roleId: 16,
    role: "moderator",
    remark: "版主,负责社区内容审核",
    createTime: "2024-05-02",
    roleName: "版主"
  },
  {
    roleId: 17,
    role: "customer_service",
    remark: "客服,为客户提供服务",
    createTime: "2024-05-04",
    roleName: "客服"
  },
  {
    roleId: 18,
    role: "consultant",
    remark: "顾问,提供专业咨询服务",
    createTime: "2024-05-06",
    roleName: "顾问"
  },
  {
    roleId: 19,
    role: "coordinator",
    remark: "协调员,负责团队协调工作",
    createTime: "2024-05-08",
    roleName: "协调员"
  },
  {
    roleId: 20,
    role: "administrator",
    remark: "系统管理员,管理系统和服务器",
    createTime: "2024-05-10",
    roleName: "系统管理员"
  },
  {
    roleId: 21,
    role: "executive",
    remark: "高管,负责决策和领导工作",
    createTime: "2024-05-12",
    roleName: "高管"
  },
  {
    roleId: 22,
    role: "trainer",
    remark: "培训师,负责员工培训工作",
    createTime: "2024-05-14",
    roleName: "培训师"
  },
  {
    roleId: 23,
    role: "researcher",
    remark: "研究员,负责科研工作",
    createTime: "2024-05-16",
    roleName: "研究员"
  }
]

const arr: any = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: "layout",
    redirect: "/dashboard/workplace",
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
    redirect: "/component/table/default-table",
    meta: {
      title: "routes.component",
      icon: "mingcute:components-fill"
    },
    children: [
      {
        path: "table",
        name: "Table",
        component: "secLayout",
        redirect: "/component/table/default-table",
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
        redirect: "/component/form/default-form",
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
              title: "routes.defaultForm",
              keepAlive: true
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
      },
      {
        path: "qrcode",
        name: "Qrcode",
        component: "/views/Component/Qrcode/Qrcode",
        meta: {
          title: "routes.qrcode",
          icon: "fa-solid:qrcode"
        }
      }
    ]
  },
  {
    path: "/authority",
    name: "Authority",
    component: "layout",
    redirect: "/authority/buttonPermissions",
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
    path: "/workflow",
    name: "Workflow",
    redirect: "/workflow/antvX6",
    component: "layout",
    meta: {
      title: "routes.workflow",
      icon: "mdi:workflow"
    },
    children: [
      {
        path: "antvX6",
        name: "AntvX6",
        component: "/views/Workflow/useAntvX6",
        meta: {
          title: "routes.useX6"
        }
      }
    ]
  },
  {
    path: "/system",
    name: "System",
    component: "layout",
    redirect: "/system/user",
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
  // 权限列表接口
  {
    url: "/user/role",
    method: "post",
    timeout,
    response: ({ body }) => {
      let pageList = roleList
      const { page, pageSize, roleName, role, createTime, remark } = body

      if (roleName) {
        pageList = pageList.filter(item => item.roleName === roleName)
      }
      if (role) {
        pageList = pageList.filter(item => item.role === role)
      }
      if (createTime) {
        pageList = pageList.filter(item => item.createTime === createTime)
      }
      if (remark) {
        pageList = pageList.filter(item => item.remark === remark)
      }
      if (page && pageSize) {
        pageList = pageList.filter((_, index) => index < pageSize * page && index >= pageSize * (page - 1))
      }
      return {
        data: {
          code: 200,
          data: {
            total: roleList.length,
            list: pageList
          }
        }
      }
    }
  },
  //删除权限
  {
    url: "/user/deleteRoleById",
    method: "post",
    timeout,
    response: ({ body }) => {
      const { roleId } = body
      roleList = roleList.filter(item => item.roleId !== roleId)
      return {
        data: {
          code: 200,
          data: "删除成功"
        }
      }
    }
  },
  //更新权限列表
  {
    url: "/user/updateRole",
    method: "post",
    timeout,
    response: ({ body }) => {
      const { roleId, createTime, roleName, remark, role } = body
      for (let dataChange of roleList) {
        if (dataChange.roleId === roleId) {
          dataChange = {
            roleId,
            createTime: createTime || dataChange.createTime,
            roleName: roleName || dataChange.roleName,
            remark: remark || dataChange.remark,
            role: role || dataChange.role
          }
        }
      }
      return {
        data: {
          code: 200,
          data: "更新成功"
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
  // 获取table
  {
    url: "/user/routerList",
    method: "post",
    timeout,
    response: ({ body }) => {
      const { page, pageSize } = body
      const pageList = arr.filter((_, index) => index < pageSize * page && index >= pageSize * (page - 1))

      return {
        data: {
          code: 200,
          data: {
            total: pageList.length,
            list: pageList
          }
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
