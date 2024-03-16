import { cloneDeep, remove } from "lodash-es"
import type { RouteRecordRaw } from "vue-router"
import { isUrl } from "./is"
import { t } from "@/hooks/useLocale"
import { staticRouter } from "@/router"

const Layout = () => import("@/layout/src/index.vue")
const modules = import.meta.glob("../views/**/*.{vue,tsx}")

// 处理静态路由，降级，keepalive最多只支持缓存二级, 此方法直接使用forEach直接改变传入的routes
/**  
@param routes 传入的原始路由
@param level 原始level（不建议改变，如果要改，请注意expectedLevel需要＞level的值）
@param parentRoute 临时暂存的parent节点，用于赋值
@param expectedLevel 需要降级为最多几级，比如level === 1 ，expectedLevel === 2时，此时最多有（expectedLevel - level + 1） = 2级路由 
**/
const toLowerRoutes = (
  routes: RouteRecordRaw[],
  level: number = 1,
  parentRoute: Nullable<RouteRecordRaw> = null,
  expectedLevel: number = 2
) => {
  routes.forEach((route, index) => {
    if (route?.children?.length) {
      if (level === expectedLevel) {
        let routeEntity: RouteRecordRaw = {
          path: route.path,
          name: route.name,
          component: route.component,
          meta: route.meta,
          children: []
        }
        // 将level > expectedLevel的路由项移动到对应的level === expectedLevel的父级路由下
        routes[index] = routeEntity
        parentRoute = routeEntity
      }
      if (level > expectedLevel && parentRoute !== null) {
        let routeEntity: RouteRecordRaw = {
          path: route.path,
          name: route.name,
          component: route.component,
          meta: route.meta,
          children: []
        }
        // 将level > 2的路由项移动到对应的level === 2的父级路由的children数组中
        parentRoute.children.push(routeEntity)
      }
      toLowerRoutes(route.children, level + 1, parentRoute) // 递归调用修改子路由
    } else {
      // 当level > expectedLevel且 route?.children?.length === false时说明此节点是最底层子节点
      if (level > expectedLevel) {
        let routeEntity: RouteRecordRaw = {
          path: route.path,
          name: route.name,
          component: route.component,
          meta: route.meta,
          children: []
        }
        // 将level > 2的路由项移动到对应的level === 2的父级路由的children数组中
        parentRoute.children.push(routeEntity)
      }
    }
  })
}

// 处理静态路由，降级，keepalive最多只支持缓存二级, 此方法使用deepClone处理，返回一个新的路由，不改变原始router
/**  
@param routes 传入的原始路由
@param level 原始level（不建议改变，如果要改，请注意expectedLevel需要＞level的值）
@param parentRoute 临时暂存的parent节点，用于赋值
@param expectedLevel 需要降级为最多几级，比如level === 1 ，expectedLevel === 2时，此时最多有（expectedLevel - level + 1） = 2级路由 
**/

const generateLowerRoutes = (
  routes: RouteRecordRaw[],
  level: number = 1,
  parentRoute: Nullable<RouteRecordRaw> = null,
  expectedLevel: number = 2
): Nullable<RouteRecordRaw[]> => {
  if (!routes?.length) {
    return null
  }
  let cloneRoutes: RouteRecordRaw[] = cloneDeep(routes)
  if (!cloneRoutes?.length) {
    return null
  }
  toLowerRoutes(cloneRoutes, level, parentRoute, expectedLevel)
  return cloneRoutes
}

// 生成菜单渲染的expectedLevel级的路由 ,当前加载的路由需要去掉根目录， login和错误页面路由
/**  
@param staticRouter 传入的原始路由
**/
const createMenuRoutes = (staticRouter: RouteRecordRaw[]): RouteRecordRaw[] => {
  const localRoutes: RouteRecordRaw[] = cloneDeep(staticRouter)
  remove(localRoutes, route => route.path === "/" || route.name === "404" || route.name === "Login" || route.name === "Redirect")
  toLowerRoutes(localRoutes)
  return localRoutes
}

// 处理路由：全部打平为一级
/**  
@param staticRouter 传入的原始路由
**/
const flattenRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  let flattenedRoutes: RouteRecordRaw[] = []

  routes.forEach(route => {
    const { children, ...args } = route

    flattenedRoutes.push(args as RouteRecordRaw) // 将当前路由项加入结果数组

    if (children && children.length > 0) {
      const childRoutes = flattenRoutes(children) // 递归处理子路由
      flattenedRoutes.push(...childRoutes) // 将子路由项加入结果数组
    }
  })
  return flattenedRoutes
}

// 根据传入路由找到父级路由
/**
@param routes 原始路由
@param path 需要获取当前路由的path 默认为空
 */
const findRoutePath = (routes: RouteRecordRaw[], path: string) => {
  for (const route of routes) {
    let findPath = route.path.split("/")
    if (findPath[findPath.length - 1] === path) {
      return route.path
    }
    if (route.children?.length) {
      findRoutePath(route.children, path)
    }
  }
}

// 根据传入父级path和当前的path找到当前应指向并跳转的路由
/**
@param parentPath 父级path
@param path 当前path
 */
const pathResolve = (parentPath: string, path: string) => {
  if (isUrl(path)) return path
  const childPath = path.startsWith("/") || !path ? path : `/${path}`
  return `${parentPath}${childPath}`.replace(/\/\//g, "/")
}

/**
 * @description 处理静态/异步/动态路由
 * @param routers 异步/动态路由
 * @param mode 路由模式
 * @param user user信息
 */
const generateDynamicRouters = (routers: RouteRecordRaw[], mode: RouterMode, user: any) => {
  let returnRouters = [] as RouteRecordRaw[]
  let backupRouters = cloneDeep(routers) as RouteRecordRaw[]

  // 静态路由，直接拿router/index.ts 的staticRouter
  if (mode === "static") {
    return staticRouter
  }
  // 异步/动态路由
  else {
    returnRouters = mode === "async" ? traverseRoleRouting(backupRouters, user.roles) : traverseRouting(backupRouters)
    returnRouters.unshift(
      {
        path: "/",
        redirect: "/dashboard/welcome",
        name: "Root"
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login/Login.vue"),
        meta: {
          title: t("routes.login")
        }
      },
      {
        path: "/redirect/:path(.*)*/:type(.*)*",
        name: "Redirect",
        component: () => import("@/views/Redirect/Redirect.vue"),
        meta: {
          hidden: true
        }
      }
    )
    returnRouters.push({
      name: "404",
      path: "/:catchAll(.*)",
      component: () => import("@/views/Error/404.vue"),
      meta: {
        title: t("routes.notfound"),
        icon: "mdi:arrow-up-bold"
      }
    })
    return returnRouters
  }
}
// 前端不筛选权限
const traverseRouting = (routers: RouteRecordRaw[]): RouteRecordRaw[] => {
  for (let v of routers) {
    let component = v.component as any
    if (!modules && !component.includes("layout")) {
      console.error(`未找到${component}.vue文件或${component}.tsx文件，请创建`)
    }
    const module = modules[`${component.replace("/", "../")}.vue`] || modules[`${component.replace("/", "../")}.tsx`]
    v.component = component === "layout" ? Layout : module
    if (v.children && v.children.length) {
      traverseRouting(v.children)
    }
  }
  return routers
}
// 前端筛选权限
const traverseRoleRouting = (routers: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] => {
  const toolArray = [] as RouteRecordRaw[]
  for (let v of routers) {
    let component = v.component as any
    if (!modules && !component.includes("layout")) {
      console.error(`未找到${component}.vue文件或${component}.tsx文件，请创建`)
    }
    // 如果有权限说明要筛选，没有的就跳过
    if (v.meta?.role?.length) {
      const hasRequiredPermissions = v.meta?.role.every(permission => roles.includes(permission))
      if (hasRequiredPermissions) {
        toolArray.push(v)
      }
    }
    const module = modules[`${component.replace("/", "../")}.vue`] || modules[`${component.replace("/", "../")}.tsx`]
    v.component = component === "layout" ? Layout : module
    if (v.children && v.children.length) {
      traverseRouting(v.children)
    }
    // 其他情况正常返回
    if (!v.meta?.role && !v.meta?.role?.length) {
      toolArray.push(v)
    }
  }
  return toolArray
}

export { toLowerRoutes, generateLowerRoutes, createMenuRoutes, flattenRoutes, findRoutePath, pathResolve, generateDynamicRouters }
