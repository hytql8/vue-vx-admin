<script lang="ts" setup>
import { computed, ref, unref, watch } from "vue"
import { useTagsStore } from "@/store/modules/tags"
import { useRouter, RouteRecordRaw } from "vue-router"
import { staticRouter } from "@/router"
import { findParentRoute } from "@/utils/routerUtils"
import { useI18n } from "vue-i18n"
import { BreadcrumbList } from "./type"
import { cloneDeep } from "lodash-es"

defineOptions({
  name: "Breadcrumb"
})

const { getRoutes } = useRouter()
const { t } = useI18n()
const routerList = getRoutes()
const tagsStore = useTagsStore()

const currentTag = computed(() => tagsStore.getCurrentTag)

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

const createBreadList = () => {
  const currentRouterPath = unref(currentTag)
    .path.split("/")
    .filter((v: string) => v !== "")

  const constantList = findFirstRoute(cloneDeep(unref(currentRouterPath)))
  breadcrumbList.value.splice(0, unref(breadcrumbList).length)
  for (let v of unref(currentRouterPath)) {
    let obj = Object.assign({}, { currentTarget: "/" + constantList.join("/"), route: findRoute(v) })
    breadcrumbList.value.push(obj)
  }
  return unref(breadcrumbList)
}

// 找到对应路由
const findRoute = (path: string) => {
  return routerList.filter((v: RouteRecordRaw) => v.path.endsWith(path))
}

watch(
  () => unref(currentTag),
  val => {
    console.log(val)
    createBreadList()
  },
  {
    immediate: true
  }
)
</script>
<template>
  <ElBreadcrumb separator="/" class="vx-breadcrumb">
    <ElBreadcrumbItem v-for="bread in breadcrumbList" :key="bread.route[0].name" :to="{ path: bread.currentTarget }">
      {{ t(bread.route[0].meta.title) }}
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
<style lang="scss" scoped>
@import "./Breadcrumb.scss";
</style>
