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
    [key: string]: any
  }
}

export type { UserLoginParams, UserReturns }
