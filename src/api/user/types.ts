type UserLoginParams = {
  username?: string
  password?: string | number
}

type RouterMenusReturns = {
  result?: {
    path?: string
    redirect?: string
    name?: string
    component?: string
    meta?: {
      title?: string
      icon?: string
      role?: string[]
    }
    children?: RouterMenusReturns[]
  }
}
type UserReturns = {
  code: number
  data: {
    userId?: string | number
    username?: string
    password?: string
    roleId?: string | number
    // 角色
    roles?: string[]
    // 权限
    auths?: string[]
    routers?: RouterMenusReturns[]
    sex?: number
    age?: number
    nickname?: string
    [key: string]: any
  }
}

type RoleReturns = {
  code: number
  data: {
    roleId: number
    role: string
    remark: string
    createTime: string
    roleName: string
    [key: string]: any
  }
}

type getRoleListParams = {
  page?: number
  pageSize?: number
  role?: string
  roleName?: string
  creatTime?: string | number
  remark?: string
}

type UserListParams = {
  username: string
  page: number
  pageSize: number
}

type deleteRoleListParams = {
  roleId: string
}
export type { UserLoginParams, UserReturns, UserListParams, getRoleListParams, RoleReturns, deleteRoleListParams }
