import { RouteComponent, RouteRecordName, RouteRecordRedirectOption } from "vue-router"
// 目的，利用ts约束路由的每一项的类型，降低出错概率
// 这里暂且将路由分为一级和其他级别（原因是希望一级路由允许有redirect，其他级别不允许有）

declare global {
  /** 自定义 meta 类型 */
  type CustomizeRouteMeta = {
    title?: string
    icon?: string
    keepAlive?: boolean
    hidden?: boolean
    role?: string[]
  }
  /** App Router详情 */
  type VxRouteRecordRaw = {
    path: string
    name?: RouteRecordName
    redirect?: RouteRecordRedirectOption
    component?: RouteComponent
    children?: OtherLevelRouterRecord[]
    meta?: CustomizeRouteMeta
  }
  /**  Router其他路由 */
  type OtherLevelRouterRecord = Omit<VxRouteRecordRaw, "redirect">
  /**
   * @description 路由模式
   * @param static 读取静态路由，此模式下用户需要在前端静态路由上定义权限，然后根据后端返回的角色权限，前端判断路由显隐
   * @param async 异步路由，此模式下框架默认不加载本地静态路由，而是改为直接获取后端返回的路由，后端默认返回全部路由，前端根据权限或者部分其他特殊情况过滤出应该显示的路由
   * @param dynamic 动态路由，此模式下框架默认不加载本地静态路由，后端在登录之后返回角色对应的应该渲染的路由，前端展示拿到的路由
   */
  type RouterMode = "static" | "async" | "dynamic"
}
// 想约束router meta 暂时不行，只能拓展，ts给个语法提示
declare module "vue-router" {
  interface RouteMeta extends CustomizeRouteMeta {}
  // interface RouteRecordRaw extends VxRouteRecordRaw {}
}
