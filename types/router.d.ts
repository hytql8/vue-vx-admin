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
    roles?: string[]
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
}
// 想约束router meta 暂时不行，只能拓展，ts给个语法提示
declare module "vue-router" {
  interface RouteMeta extends CustomizeRouteMeta {}
  // interface RouteRecordRaw extends VxRouteRecordRaw {}
}
