<script lang="ts" setup>
import { ref, unref, watch } from "vue"
import { useRouter, RouteRecordRaw, RouteLocationNormalizedLoaded } from "vue-router"
import { staticRouter } from "@/router"
import { findParentRoute } from "@/utils/routerUtils"
import { useI18n } from "vue-i18n"
import { BreadcrumbList } from "./type"
import { cloneDeep } from "lodash-es"

defineOptions({
  name: "Breadcrumb"
})

const { getRoutes, currentRoute } = useRouter()
const { t } = useI18n()
const routerList = getRoutes()

/**
 * @param routerPath 当前点击父级的路由
 * @param level 获取倒数第几层的路由 默认2
 */
const findFirstRoute = (routerPath: string[], level = 2) => {
  const res = findParentRoute(staticRouter, routerPath[routerPath.length - level])
  if (res && res.children.length) {
    routerPath[routerPath.length - 1] = res.children[0].path
    return routerPath
  }
  return null
}

const breadcrumbList = ref<BreadcrumbList[]>([])

const createBreadList = (curRoute: RouteLocationNormalizedLoaded) => {
  const curRouteList = curRoute.path.split("/").filter((v: string) => v !== "")
  const constantList = findFirstRoute(cloneDeep(curRouteList))
  let toolBreadcrumbList: BreadcrumbList[] = []
  for (let [i, v] of curRouteList.entries()) {
    let obj = Object.assign({}, { currentTarget: "/" + constantList.join("/"), route: findRoute(v) })
    toolBreadcrumbList[i] = obj
  }

  breadcrumbList.value = toolBreadcrumbList
  return toolBreadcrumbList
}

// 找到对应路由
const findRoute = (path: string) => {
  return routerList.filter((v: RouteRecordRaw) => v.path.endsWith(path))
}

watch(
  () => unref(currentRoute),
  val => {
    createBreadList(val)
  },
  {
    immediate: true
  }
)
</script>
<template>
  <ElBreadcrumb separator="/" class="vx-breadcrumb">
    <TransitionGroup enter-active-class="animate__animated animate__fadeInRight">
      <ElBreadcrumbItem v-for="bread in breadcrumbList" :key="bread.route[0].name" :to="{ path: bread.currentTarget }">
        {{ t(bread.route[0].meta.title) }}
      </ElBreadcrumbItem>
    </TransitionGroup>
  </ElBreadcrumb>
</template>
<style lang="scss" scoped>
@import "./Breadcrumb.scss";
</style>
