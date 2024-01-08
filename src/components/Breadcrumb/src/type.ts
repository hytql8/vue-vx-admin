import { RouteRecordRaw } from "vue-router"

type BreadcrumbList = {
  currentTarget: string
  route: RouteRecordRaw[]
}

export type { BreadcrumbList }
