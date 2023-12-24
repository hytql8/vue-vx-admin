import type { RouteMeta } from "vue-router"

type CustomizeRouteMeta = {
  hidden?: boolean
  title?: string
  icon?: string
  role?: string[]
}

declare module "vue-router" {
  interface RouteMeta extends CustomizeRouteMeta {}
}
